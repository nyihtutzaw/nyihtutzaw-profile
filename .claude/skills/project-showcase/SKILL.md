---
name: project-showcase
description: Turn a running web app, or a mobile app's Google Play / App Store listing, into a project-showcase entry on this portfolio. Given a URL with username and password (web), or a store link (mobile), capture screenshots, draft a vertical-scroll walkthrough for approval, then add it to the Projects page with a detail page. Use when the user says "add a project", "make a showcase for this app", or gives an app URL plus credentials, or a play.google.com / apps.apple.com link.
---

# Project showcase

Input from the user: **URL**, **username**, **password**, plus free-text instructions (what the app is, role, stack, which parts to show or skip). Ask only for what you can't discover: role, stack and period are usually not visible in the UI. Never guess them for a public page; list what you verified and ask for the rest.

For a **mobile app with a store listing** (a play.google.com or apps.apple.com link), skip the login flow and follow [Mobile apps from store listings](#mobile-apps-from-store-listings) instead.

## Rules
- **Read-only.** Log in and view pages. Never submit forms, create/edit/delete records or click destructive buttons.
- **Credentials and the live URL never go on the site or in a file.** Pass them as env vars to the scripts. The page must not link to the app or print the URL or login. Do not write them to memory or to the repo.
- **Anonymise: never show the client's name or logo.** Describe the work generically (title like "Logistics Management System" or "Retail Point of Sale", org "Client project", slug and image folder generic too). This applies to the title, summary, bullets, alt text, slug, file names and the screenshots themselves. Hide logos and replace brand text in the screenshots with the capture script's masks (step 3), then look at every image to confirm nothing identifying is left (sidebar logo, header brand, user email/name, avatar initials, page titles, ID prefixes). The user's own product name is fine only if they say so; ask when unsure.
- **Skip** login/sign-in screens, and pages with personal data (customer/user lists, emails, phone numbers). Prefer screens that show a feature at work.
- **Draft first.** Show the user an HTML draft and wait for approval before touching the site.
- Keep copy short and concrete: one idea per step, a one-sentence description, 2-3 bullets. Only claim what you saw.

## Workflow
1. **Set up a scratch dir** (use the session scratchpad): `mkdir work && cd work && npm i playwright-core`. Chromium is usually cached in `~/Library/Caches/ms-playwright`; if not, `npx playwright-core install chromium`.
2. **Explore:** `APP_URL=… APP_USER=… APP_PASS=… NODE_PATH=$PWD/node_modules node <skill>/scripts/capture.cjs explore out` (add `APP_LOGIN_PATH=/auth/login` if it isn't `/login`). It logs in, saves `out/landing.png` and prints the sidebar/nav links. Look at the screenshot with Read. If login fails, say so and ask the user to confirm the password; do not try guesses. To find what to mask, inspect the DOM once (logo `img` src/alt, elements whose text contains the client name, user name/email, avatar initials).
3. **Choose 4-10 steps** that tell the story in the order a user would meet the app (overview, setup/rules, core action, data, finance, reports...). More pages are fine when each shows something different. Capture them: `... capture.cjs shoot out dashboard=/ sale=/orders/new ...` (2x PNGs, 1440x900), always with masks:
   - `MASK_SELECTORS='img[src*="logo"]'` hides logos (CSS list).
   - `MASK_TEXT='{"Client Ltd":"Your Business","admin@client.com":"admin@example.com","=TL":"A"}'` rewrites text; a key starting with `=` matches whole text only (avatar initials).
   - `FRESH=1` logs in per shot, for apps that remember open tabs; `CLIP_HEIGHT=470` crops to the top part.
   - Charts/lists that look empty usually just have no data in the default period: use `name=/path|click=SELECTOR@INDEX*COUNT` to click date arrows (e.g. `dash=/|click=.fa-angle-left@0*2`) and screenshot real data. **Never invent or inject fake data.**
   Read each image; drop empty/uninformative ones and any page showing phone numbers, emails or customer lists.
4. **Draft:** write `out/project.json` (shape below, generic title and copy), then `node <skill>/scripts/build-draft.cjs out`. It writes `out/index.html`; `open` it and ask for corrections. Mention anything unverified (stack, role, claims), anything identifying that remains (staff/customer names, ID prefixes), and ask whether the client has agreed to the work being shown.
5. **After approval, add to the site** (repo root):
   - Pick a generic `<slug>` (never the client's name). Convert images to JPEG 80 into `public/projects/<slug>/` (`sips -s format jpeg -s formatOptions 80 in.png --out out.jpg`) and make `thumbnail.jpg`: a 16:10 crop of the best screen (`clip` in a Playwright screenshot of the dashboard, e.g. 1192x745 from x=248).
   - Add an entry to `src/data/projects.ts` using `standalone: { org, role, skills, period? }`, `thumbnail`, `summary`, `highlights`, and `steps[]` (title, description, bullets, image, imageAlt). Use `company` instead of `standalone` only for work-experience projects. `featured: true` makes the card full width.
   - The `/projects` card and `/projects/<slug>` detail page (vertical-scroll walkthrough via `ProjectWalkthrough`) pick it up automatically.
6. **Verify:** `npx tsc --noEmit`, run `npx next dev -p 3111`, check `/projects` and `/projects/<slug>` return 200 and screenshot them. Confirm the live URL, host and client name appear nowhere: `curl … | grep -c -i '<host>\|<client name>'` must be 0 for the pages, and `grep -rniE '<client name>|<host>' src public` must find nothing. Then stop the server. Don't commit unless asked. Update the `/projects` intro text and home-page link description if they no longer fit the project list.

## Mobile apps from store listings
Store listings are public, so there is no login: the screenshots and description come from the listing.
1. **Fetch:** `NODE_PATH=$PWD/node_modules node <skill>/scripts/store.cjs fetch out --play '<play URL>'` (add `--ios <apps.apple.com URL or id>` if the iOS app has a different bundle id; with only `--play` it looks the App Store up by the same package id). It saves `out/store.json` (title, developer, description, version, store links) and full-size screenshots `play-N.png` and `ios-N.jpg`. Play lists phone shots first, then tablet shots of the same screens.
2. **Review:** build a contact sheet or Read the images. Pick 4-6 phone screens from **one** store so the frames match (App Store mockups usually sit on near-white, Play ones may sit on grey). Skip login/sign-up screens.
3. **Personal data:** store screenshots often show a real test account (profile name, phone, email). Replace it: `store.cjs cover in.jpg out.jpg x,y,w,h '[{"text":"Thiri Khaing","size":50,"color":"#3d0a6b","bold":true},{"text":"09-478-667914","size":36,"color":"#777"}]'` paints the box in its own background colour and writes fake text (find x,y,w,h by Reading the image; displayed coordinates times the scale factor). Use `store.cjs blur in out x,y,w,h` on photos or busy backgrounds. Read the result.
4. **Thumbnail:** `store.cjs thumb out/thumbnail.jpg a.jpg b.jpg c.jpg` lays 2-4 phones side by side on a 16:10 card. Add `--raw` when the listing has plain screen captures without a device frame. Check the App Store by name too (`itunes.apple.com/search?term=…`) when the bundle-id lookup finds nothing; many Android apps simply aren't on iOS.
5. **Copy:** claims may come from the screenshots and the listing description (features like push notifications or favourites). Ask for what neither shows: stack (Flutter, React Native, native…), role and period. Store developer/seller names are not proof of authorship; the user says what they built.
6. **Naming:** a published app usually shows its brand in every screenshot, so it can't be anonymised. Use the app's real name and store links only when the user confirms it's theirs to show; otherwise treat it as a client project and ask.
7. **Draft** with `"device": "mobile"` in project.json (phones shown unframed and narrower), then continue at workflow step 5. On the site, set `device: 'mobile'` and `stores: { play, appStore }` (public listing URLs from `store.json`, without tracking params) on the project entry; the walkthrough shows phone-sized images and the detail page links to the stores.

## project.json
```json
{
  "title": "Retail Point of Sale",
  "device": "web",
  "summary": "One or two sentences on what it is and who it's for. No client name.",
  "tags": ["Point of sale", "Multi-tenant"],
  "thumbnail": "thumbnail.png",
  "steps": [
    { "title": "Make a sale", "description": "One sentence.", "bullets": ["…", "…"], "image": "sale.png" }
  ]
}
```
Image paths are relative to the out dir. `build-draft.cjs` copies nothing; it references the files in place, so keep `index.html` beside the images.
