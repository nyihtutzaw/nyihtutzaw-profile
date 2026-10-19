// Mobile apps: build a showcase from public Google Play / App Store listings instead of logging in.
// Usage (NODE_PATH must point at a node_modules with playwright-core):
//   node store.cjs fetch <outdir> [--play <play.google.com URL>] [--ios <apps.apple.com URL | numeric id>] [--bundle <bundle id>]
//       Saves <outdir>/store.json (title, developer, description, version, links) and the listing screenshots
//       at full size: play-1.png ... (phones first, then tablets as Play lists them) and ios-1.jpg ...
//       With only --play, the App Store is looked up by the same package id as bundle id.
//   node store.cjs blur <in> <out> x,y,w,h [x,y,w,h ...]
//       Blurs rectangles (image pixels) to hide personal data (names, phone numbers, emails, avatars).
//   node store.cjs cover <in> <out> x,y,w,h '<lines json>'
//       Paints the rectangle with the colour at its top-left corner and writes fake text centred in it,
//       e.g. '[{"text":"Demo User","size":54,"color":"#3d0a6b","bold":true},{"text":"09-123-456789","size":40,"color":"#777"}]'.
//       Prefer this over blur on flat backgrounds: it reads as real data instead of a smudge.
//   node store.cjs thumb <out.jpg> <img> <img> [<img> ...] [--raw]
//       16:10 card thumbnail (1600x1000): 2-4 phone screenshots side by side on their own background colour.
//       --raw for plain screen captures (no device frame): adds a dark bezel, rounded corners and a shadow.
// Read-only: only downloads public listing pages and images.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const [mode, ...args] = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const dataUrl = (file) => `data:image/${path.extname(file).slice(1).replace('jpg', 'jpeg')};base64,${fs.readFileSync(file).toString('base64')}`;
const download = async (url, file) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
};

async function fetchStores(out) {
  fs.mkdirSync(out, { recursive: true });
  const info = { play: null, ios: null };
  const playUrl = flag('--play');
  let bundle = flag('--bundle');

  if (playUrl) {
    const id = new URL(playUrl).searchParams.get('id');
    bundle = bundle || id;
    const url = `https://play.google.com/store/apps/details?id=${id}&hl=en&gl=US`;
    const browser = await chromium.launch();
    const page = await (await browser.newContext({ locale: 'en-US' })).newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const meta = await page.evaluate(() => ({
      title: document.querySelector('h1')?.textContent.trim(),
      developer: document.querySelector('a[href*="/store/apps/dev"]')?.textContent.trim(),
      shots: [...new Set([...document.querySelectorAll('img[alt="Screenshot image"]')].map((i) => i.src.split('=')[0]))],
    }));
    const about = page.locator('button[aria-label*="About this app"]').first();
    if (await about.count()) {
      await about.click();
      await page.waitForTimeout(1200);
      meta.about = await page.locator('[role=dialog]').first().innerText();
    }
    await browser.close();
    for (const [i, src] of meta.shots.entries()) await download(`${src}=w1080`, path.join(out, `play-${i + 1}.png`));
    info.play = { url: `https://play.google.com/store/apps/details?id=${id}`, title: meta.title, developer: meta.developer, about: meta.about, screenshots: meta.shots.length };
  }

  const ios = flag('--ios');
  const iosId = ios && (ios.match(/id(\d+)/)?.[1] || (/^\d+$/.test(ios) ? ios : null));
  const lookup = iosId ? `id=${iosId}` : bundle ? `bundleId=${bundle}` : null;
  if (lookup) {
    const res = await (await fetch(`https://itunes.apple.com/lookup?${lookup}&country=us`)).json();
    const r = res.results?.[0];
    if (r) {
      // listing gives small thumbs; the same asset path serves the full-size image
      const shots = r.screenshotUrls || [];
      for (const [i, src] of shots.entries()) await download(src.replace(/\/[^/]+$/, '/1290x2796bb.jpg'), path.join(out, `ios-${i + 1}.jpg`));
      info.ios = { url: r.trackViewUrl.split('?')[0], title: r.trackName, developer: r.sellerName, genre: r.primaryGenreName, version: r.version, description: r.description, screenshots: shots.length };
    } else console.error('No App Store listing found for', lookup);
  }
  fs.writeFileSync(path.join(out, 'store.json'), JSON.stringify(info, null, 1));
  console.log(JSON.stringify({ play: info.play && { ...info.play, about: undefined }, ios: info.ios && { ...info.ios, description: undefined } }, null, 1));
}

// Renders an HTML snippet in a headless page and screenshots it (no image library needed).
async function render(html, size, file, quality = 85) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: size });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  await page.screenshot({ path: file, type: file.endsWith('.png') ? 'png' : 'jpeg', ...(file.endsWith('.png') ? {} : { quality }) });
  await browser.close();
}

async function blur(input, output, rects) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const b64 = await page.evaluate(async ({ src, rects }) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    for (const [x, y, w, h] of rects) {
      g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
      g.filter = `blur(${Math.max(8, Math.round(h / 3))}px)`;
      for (let k = 0; k < 3; k++) g.drawImage(c, 0, 0);
      g.restore();
    }
    return c.toDataURL('image/jpeg', 0.9).split(',')[1];
  }, { src: dataUrl(input), rects });
  fs.writeFileSync(output, Buffer.from(b64, 'base64'));
  await browser.close();
}

async function cover(input, output, [x, y, w, h], lines) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const b64 = await page.evaluate(async ({ src, x, y, w, h, lines }) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    const [r, gg, b] = g.getImageData(x, y, 1, 1).data;
    g.fillStyle = `rgb(${r},${gg},${b})`;
    g.fillRect(x, y, w, h);
    const total = lines.reduce((s, l) => s + l.size * 1.35, 0);
    let cy = y + (h - total) / 2;
    g.textAlign = 'center';
    g.textBaseline = 'top';
    for (const l of lines) {
      g.font = `${l.bold ? '700' : '400'} ${l.size}px Roboto, "Helvetica Neue", Arial, sans-serif`;
      g.fillStyle = l.color || '#222';
      g.fillText(l.text, x + w / 2, cy + l.size * 0.1);
      cy += l.size * 1.35;
    }
    return c.toDataURL('image/jpeg', 0.92).split(',')[1];
  }, { src: dataUrl(input), x, y, w, h, lines });
  fs.writeFileSync(output, Buffer.from(b64, 'base64'));
  await browser.close();
}

async function thumb(output, images, raw) {
  const imgs = images.map((f) => `<img src="${dataUrl(f)}">`).join('');
  const gap = raw ? 48 : 24;
  // fit n images into the width as well as the height
  const fit = (h) => `max-height:${h}px;max-width:${Math.floor((1600 - gap * (images.length + 1)) / images.length)}px;width:auto;height:auto`;
  // store mockups sit on their own canvas: use its corner colour so the image edges disappear.
  // --raw: plain app screenshots without a device frame get rounded corners and a shadow on a soft background.
  const html = raw
    ? `<style>body{margin:0;width:1600px;height:1000px;display:flex;align-items:center;justify-content:center;gap:${gap}px;overflow:hidden;
        background:radial-gradient(circle at 30% 20%,#ffffff,#ece9f3 75%)}
        img{${fit(840)};border-radius:36px;box-shadow:0 30px 60px -20px rgba(30,20,60,.35);border:8px solid #1f1d24}</style>${imgs}`
    : `<style>body{margin:0;width:1600px;height:1000px;display:flex;align-items:center;justify-content:center;gap:${gap}px;overflow:hidden}
        img{${fit(980)}}</style>${imgs}
        <script>const i=document.images[0];i.decode().then(()=>{const c=document.createElement('canvas');c.width=c.height=1;
        c.getContext('2d').drawImage(i,2,2,1,1,0,0,1,1);const d=c.getContext('2d').getImageData(0,0,1,1).data;
        document.body.style.background='rgb('+d[0]+','+d[1]+','+d[2]+')'})</script>`;
  await render(html, { width: 1600, height: 1000 }, output);
}

(async () => {
  if (mode === 'fetch') await fetchStores(args[0]);
  else if (mode === 'blur') await blur(args[0], args[1], args.slice(2).map((r) => r.split(',').map(Number)));
  else if (mode === 'cover') await cover(args[0], args[1], args[2].split(',').map(Number), JSON.parse(args[3]));
  else if (mode === 'thumb') await thumb(args[0], args.slice(1).filter((a) => a !== '--raw'), args.includes('--raw'));
  else { console.error('Usage: store.cjs fetch|blur|cover|thumb ... (see header)'); process.exit(1); }
  if (mode !== 'fetch') console.log('wrote', mode === 'thumb' ? args[0] : args[1]);
})();
