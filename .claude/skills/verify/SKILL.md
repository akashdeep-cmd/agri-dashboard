---
name: verify
description: Build, launch, and drive this Next.js app to verify UI changes end-to-end.
---

# Verifying changes in this app

Next.js 16 (Turbopack, Tailwind v4, no tailwind.config — tokens live in `src/app/globals.css` `@theme`). All routes are statically prerendered, so `curl` returns the full markup of client components — no headless browser is installed in this project.

## Launch

```bash
rm -rf .next                 # required after moving files between route groups
npm run dev                  # serves on http://localhost:3001 (port set in package.json)
```

## Drive

Routes: `/` (dashboard), `/schemes`, `/login` (standalone, no shell). Fetch and grep the prerendered HTML for class/content markers:

```bash
curl -s http://localhost:3001/ -o /tmp/home.html
grep -o 'sticky top-0 z-40[^"]*' /tmp/home.html       # e.g. check the top bar
```

Gotchas:
- The HTML embeds the RSC flight payload and image `srcset`s, so `grep -c`/occurrence counts overcount; to assert what's inside a specific element, extract it first (e.g. `re.search(r'<aside.*?</aside>', html, re.S)` in python3).
- Language switching (`?lang=mr`) is client-side (localStorage + effect) — the SSR HTML is always English; curl can't verify Marathi rendering.
- `npm run lint` runs eslint with the React Compiler rules — `const Icon = fn()` rendered as `<Icon/>` is rejected (`react-hooks/static-components`); pass components via props instead.

## Shut down

```bash
lsof -ti :3001 | xargs kill
```
