# Base44 Dev Environment

Static single-page site — **no build step, no package manager, no backend, no secrets**.

| file | what it is |
| --- | --- |
| `index.html` | the whole site: inline `<style>` (all CSS), inline `<script>` (i18n dict, timeline render, theme toggle, modal), markup for hero / about / music / stats / links |
| `cursor.js` | pointer trail canvas (self-disables on touch devices) |
| `favicon.ico` / `favicon.png` / `favicon.jpg` | icons; `index.html` only references `/favicon.ico` |
| `serve.py` | `python:3.12-slim` static server with no-cache headers |

## Running

```
docker compose -f docker-compose.base44.yml up -d
```

Serves the repository root (bind-mounted read-only) on host port 3000, so edits show up
on the next request. There is **no live-reload server** — after editing anything, call
`reload_preview` so the iframe picks the change up.

## Things to know when verifying

* This is **not an SPA**: there is no router and no client-side navigation. The preview
  helpers' `navigate()`/`path` arguments try a pushState navigation and fail with
  `navigation_failed` because the document never re-renders. Load the page plainly and
  drive it with `click`/`fill`/`scrollIntoView` instead.
* All section navigation is in-page anchors (`#about`, `#music`, `#stats`, `#links`);
  every one of those sections exists in `index.html`.
* Language switching (`#lang-selector`, values `en|ua|ru|pl|it|es`) rewrites `[data-i18n]`
  text and re-renders the timeline; `#theme-btn` toggles `body.light-theme`.
  `#tbc-trigger` opens `#modal-container` (`.active`), `#modal-close-btn` closes it.
* Fonts come from Google Fonts over the network; if they are unavailable the page falls
  back to `monospace`/`sans-serif` but still renders.
* Verify a healthy stack with `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/`
  (expects `200`) and the compose healthcheck (`docker compose ps`).
