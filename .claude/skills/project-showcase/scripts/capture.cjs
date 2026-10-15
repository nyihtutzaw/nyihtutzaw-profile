// Usage: APP_URL=https://app APP_USER=u APP_PASS=p NODE_PATH=$PWD/node_modules node capture.cjs explore <outdir>
//        ... node capture.cjs shoot <outdir> name=/path name2=/path2
// Optional env: APP_LOGIN_PATH (default /login), FRESH=1 (new login per screenshot, for apps that
// remember open tabs/state), CLIP_HEIGHT=450 (crop each shot to the top N CSS px).
// Anonymising (do this for every client project):
//   MASK_SELECTORS='img[src*="logo"],.brand'   CSS list; matching elements are hidden (logos, avatars)
//   MASK_TEXT='{"Acme Ltd":"Your Business","admin@acme.com":"admin@example.com"}'   text replaced everywhere
//                                              (page text and alt/title/placeholder attrs; never input values).
//                                              Prefix a key with "=" to match whole text only: {"=TL":"A"} for initials
// Per-shot actions: name=/path|click=SELECTOR@INDEX*COUNT  (click the INDEX-th match COUNT times before the
//   screenshot, e.g. to move a chart's date range): dash=/|click=.fa-angle-left@0*2|click=.fa-angle-left@1*2
// Read-only: logs in, navigates and screenshots. Credentials come from env only.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const [mode, out, ...pairs] = process.argv.slice(2);
const { APP_URL, APP_USER, APP_PASS, APP_LOGIN_PATH = '/login', FRESH, CLIP_HEIGHT, MASK_SELECTORS = '', MASK_TEXT = '{}' } = process.env;
if (!mode || !out || !APP_URL || !APP_USER || !APP_PASS) {
  console.error('Need mode, outdir and APP_URL/APP_USER/APP_PASS env vars');
  process.exit(1);
}
const origin = new URL(APP_URL).origin;
// Some apps keep a connection open, so 'networkidle' may never fire: fall back to a short wait.
const open = async (page, url) => {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
};
fs.mkdirSync(out, { recursive: true });

// Runs inside every page: hides masked elements and rewrites masked text, and keeps doing so as the app re-renders.
function maskInPage({ selectors, map }) {
  const pairs = Object.entries(map);
  const apply = () => {
    if (selectors) document.querySelectorAll(selectors).forEach((el) => { if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden'; });
    if (!pairs.length || !document.body) return;
    // a key starting with "=" only matches a text node that is exactly that (e.g. avatar initials "=TL")
    const swap = (t) =>
      pairs.reduce((acc, [from, to]) => (from.startsWith('=') ? (acc.trim() === from.slice(1) ? acc.replace(from.slice(1), to) : acc) : acc.split(from).join(to)), t);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const v = swap(n.nodeValue);
      if (v !== n.nodeValue) n.nodeValue = v;
    }
    // attributes only: never touch input values, or the login form would be rewritten while typing
    document.querySelectorAll('[alt],[title],[placeholder]').forEach((el) => {
      for (const a of ['alt', 'title', 'placeholder']) {
        const cur = el.getAttribute(a);
        if (cur !== null && swap(cur) !== cur) el.setAttribute(a, swap(cur));
      }
    });
    // write only on change: an unconditional write is itself a mutation and would loop forever
    if (swap(document.title) !== document.title) document.title = swap(document.title);
  };
  new MutationObserver(apply).observe(document, { childList: true, subtree: true, characterData: true });
  document.addEventListener('DOMContentLoaded', apply);
  apply();
}

async function session(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(maskInPage, { selectors: MASK_SELECTORS, map: JSON.parse(MASK_TEXT) });
  const page = await ctx.newPage();
  await open(page, origin + APP_LOGIN_PATH);
  await page.fill('input[type=email],input[name=email],input[name=username],input[type=tel],input[type=text]', APP_USER);
  await page.fill('input[type=password]', APP_PASS);
  await page.click('button[type=submit], button:has-text("Sign in"), button:has-text("Log in"), button:has-text("Login")');
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(2000);
  if (page.url().includes(APP_LOGIN_PATH)) { console.error('Login seems to have failed'); process.exit(2); }
  return page;
}

(async () => {
  const browser = await chromium.launch();
  let page = await session(browser);

  if (mode === 'explore') {
    await page.screenshot({ path: path.join(out, 'landing.png') });
    const links = await page.$$eval('a[href^="/"]', (as) =>
      [...new Map(as.map((a) => [a.getAttribute('href'), a.textContent.trim().slice(0, 40)])).entries()]
    );
    console.log('Landing URL path:', new URL(page.url()).pathname);
    for (const [href, text] of links) if (!/logout|sign-?out/i.test(href + text)) console.log(`${href}\t${text}`);
  } else if (mode === 'shoot') {
    for (const pair of pairs) {
      const [head, ...actions] = pair.split('|');
      const [name, p] = head.split('=');
      if (FRESH) page = await session(browser);
      await open(page, origin + p);
      await page.waitForTimeout(1500);
      for (const act of actions) {
        const m = act.match(/^click=(.+)@(\d+)\*(\d+)$/);
        if (!m) { console.error('Bad action', act); process.exit(3); }
        for (let i = 0; i < Number(m[3]); i++) { await page.locator(m[1]).nth(Number(m[2])).click(); await page.waitForTimeout(900); }
      }
      await page.waitForTimeout(800);
      const clip = CLIP_HEIGHT ? { x: 0, y: 0, width: 1440, height: Number(CLIP_HEIGHT) } : undefined;
      await page.screenshot({ path: path.join(out, `${name}.png`), clip });
      console.log('saved', name);
    }
  }
  await browser.close();
})();
