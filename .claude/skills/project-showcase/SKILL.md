---
name: project-showcase
description: Turn a running web app into a project-showcase entry on this portfolio. Given a URL, username, password and optional instructions, log in, explore the app, capture screenshots, draft a vertical-scroll walkthrough for approval, then add it to the Projects page with a detail page. Use when the user says "add a project", "make a showcase for this app", or gives an app URL plus credentials.
---

# Project showcase

Input from the user: **URL**, **username**, **password**, plus free-text instructions (what the app is, role, stack, which parts to show or skip). Ask only for what you can't discover: role, stack and period are usually not visible in the UI. Never guess them for a public page; list what you verified and ask for the rest.

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

## project.json
```json
{
  "title": "Retail Point of Sale",
  "summary": "One or two sentences on what it is and who it's for. No client name.",
  "tags": ["Point of sale", "Multi-tenant"],
  "thumbnail": "thumbnail.png",
  "steps": [
    { "title": "Make a sale", "description": "One sentence.", "bullets": ["…", "…"], "image": "sale.png" }
  ]
}
```
Image paths are relative to the out dir. `build-draft.cjs` copies nothing; it references the files in place, so keep `index.html` beside the images.
