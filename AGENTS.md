# Base44 Dev Environment

Static **multi-page** site (no build step, no backend, no package manager, no secrets):

| file | what it is |
| --- | --- |
| `index.html`, `about.html`, `music.html`, `stats.html`, `links.html` | the five pages |
| `app.js` | i18n, themes, font dialog, window drag/resize, taskbar, menus, Clippy |
| `style.css` | layout + component styles, driven by CSS custom properties |
| `themes.css` | one `body[data-theme="…"]` palette block per theme (22 total) |
| `stars.js` | falling-star background canvas |
| `cursor.js` | pointer trail canvas (disabled on touch devices) |
| `serve.py` | `python:3.12-slim` static server with no-cache headers |

## Running

```
docker compose -f docker-compose.base44.yml up -d
```

Serves the repo root (bind-mounted read-only) on host port 3000. **No live-reload dev
server** — after editing anything, call `reload_preview` so the iframe picks up the change.

## Cache busting

All five pages load styles/scripts with a `?v=N` query. When you change `style.css`,
`themes.css`, `app.js`, `stars.js` or `cursor.js`, bump `N` in every page
(`sed -i 's/?v=10/?v=11/g' *.html`) or the iframe may keep serving the old asset.

## Themes ("climax")

* Palette = a `body[data-theme="key"]` block in `themes.css` (custom properties only).
* `app.js` holds the `THEMES` list (`key`, `label`, `dark`); `applyTheme()` sets
  `body[data-theme]` + adds `theme-dark` for dark palettes, and remembers it in
  `localStorage['nxttu-theme']`.
* Dark palettes switch the inverted chrome rules in `style.css`, which are written as
  `body.theme-dark …`. Hardcoded dark values there use `var(--dark-*, fallback)` so a new
  dark palette can tune them; the black theme relies on the fallbacks.
* The header button `#theme-btn` (label "climax") opens the picker; Edit → Themes… does too.

## Window dragging — do not undo these two things

* `main` must keep `width: 100%`. `body` is a column flex container and `main` has
  `margin: 0 auto`, so it is **not** stretched: with `width: auto` its width shrinks to fit
  its content, and a window leaving the flow reflows (compresses) the whole page.
* Dragging/resizing switches a window to `position: fixed` via `detachWindow()`, which
  inserts a `.win-placeholder` (copying the window's height + vertical margins) so the
  page keeps the space. Without the placeholder the footer and other windows jump.

## Verifying

```
curl -sf http://localhost:3000/ -o /dev/null -w '%{http_code}\n'   # 200
curl -sf http://localhost:3000/themes.css -o /dev/null -w '%{http_code}\n'
```

* Star field: `canvas.bg-stars`, fixed, `z-index: -1` (behind all content); stars fall
  diagonally down-left at 45° and always move — the OS "reduce motion" preference only
  halves their speed.
* Cursor trail: a second fixed canvas at `z-index: 999999`; it follows *behind* the pointer
  and fades to nothing ~350 ms after the pointer stops (it must never pile into a white blob).
* Browser note: the preview browser paints only a few frames per second, so canvas effects
  can look frozen in a screenshot — sample the canvases over time instead.

## Why python serve.py (not nginx)

The host repo directory is mode `700`, so nginx's non-root worker cannot traverse it.
`python:3.12-slim` runs as root and reads the bind mount fine. `serve.py` also sends
no-store headers.

## Secrets

None required.
