# Base44 Dev Environment

Static **multi-page** site (no build step, no backend, no package manager, no secrets):

| file | what it is |
| --- | --- |
| `index.html`, `about.html`, `music.html`, `news.html`, `stats.html`, `links.html` | the six pages |
| `news-data.js` | the news feed — **the only file to edit to post news** (see News below) |
| `app.js` | i18n, themes, font dialog, window drag/resize + drag ghosts, taskbar tray (plaque + Kyiv clock), CRT shader, menus, Clippy |
| `sfx.js` | synthesised UI sounds (click / window blip / scroll tick) — no audio files |
| `style.css` | layout + component styles, driven by CSS custom properties |
| `themes.css` | one `body[data-theme="…"]` palette block per theme (22 total) |
| `bg.js` | themed background particles canvas (petals / ash / matrix / snow / leaves / sparks / stars) |
| `cursor.js` | pointer trail canvas (disabled on touch devices) |
| `serve.py` | `python:3.12-slim` static server with no-cache headers |

## Running

```
docker compose -f docker-compose.base44.yml up -d
```

Serves the repo root (bind-mounted read-only) on host port 3000. **No live-reload dev
server** — after editing anything, call `reload_preview` so the iframe picks up the change.

## Cache busting

All six pages load styles/scripts with a `?v=N` query. When you change `style.css`,
`themes.css`, `app.js`, `news-data.js`, `bg.js` or `cursor.js`, bump `N` in every page
(`sed -i 's/?v=13/?v=14/g' *.html`) or the iframe may keep serving the old asset. `sfx.js` counts too.

## News (`news.html` + `news-data.js`)

Posts live in the `NEWS` array in `news-data.js`; `app.js`'s `renderNews()` paints them into
`#news-list` on every `applyLanguage()` call.
* Each entry: `date` (free text, shown as-is), optional `link`, and a block per language
  (`en` required, `ua`/`ru`/`pl`/`it`/`es` optional with fallback to `en`), each
  `{ tag?, title, text }`. Add new entries at the TOP of the array.
* Localizable page/nav labels are ordinary i18n keys: `nav-news`, `label-news`,
  `label-news-sub`, `news-open` — add them to **all six** language dicts in `app.js`.
* `renderNews` bails out when `#news-list` or the `NEWS` global is missing, so `app.js`
  stays safe on the other pages.

## Taskbar tray (plaque + Kyiv clock)

* There is **no page footer any more**. Its plaque (`footer-left` / `footer-right-*`
  i18n keys) is rendered by `renderTray()` into `.taskbar-tray` in the taskbar, which
  `initWindows()` builds on every page — that is what makes the line site-wide.
* The tray holds the plaque and the clock (`Intl.DateTimeFormat` pinned to
  `Europe/Kyiv`, ticked every second). The background-music embed was removed —
  the only audio on the site is `sfx.js`.
* `renderTray()` rewrites the plaque markup, so the rick-roll `.meme-target` click is
  bound by **delegation on the tray**, not on the element.
* View → **Taskbar Info** toggles the whole tray (`localStorage['nxttu-tray']`,
  `'off'` hides it). Styles: the `SYSTEM TRAY` block in `style.css`; it uses the pixel
  face `--pixel-font` (Pixelify Sans, injected as a `<link>` from `app.js` because it
  needs the Cyrillic subset for the ua/ru plaques).
* `.tray-plaque--deals` and `.tray-dot` are hidden under 720px; the clock never is.

## UI sounds (`sfx.js`)

* Everything is synthesised with WebAudio — no audio files, nothing to license or
  download. A short square "click" on any link/button/menu item/window control, a
  triangle blip when a window is closed, and a soft band-passed noise tick while
  scrolling (throttled to ~55 ms).
* `sfx.js` **must load before `app.js`** (its View item calls `window.nxttuSfx`).
* View → **Sound FX** toggles it (`localStorage['nxttu-sfx']`).
* The AudioContext is created lazily inside the first user gesture, as browsers
  require. **Sound itself cannot be verified automatically** — the only automated
  check is that `window.nxttuSfx.state().ctx === 'running'` after a real click.

## CRT shader (View → CRT Shader)

* `initCrt()` appends two things to `body`: the `.crt-defs` SVG holding the
  `#crt-pixelate` filter (`feFlood` + `feTile` + `feMorphology` ≈ 4 px blocks) and the
  fixed `.crt-overlay` (scanlines, RGB aperture grille, vignette, rolling band).
* `body.crt-on` is the switch (`localStorage['nxttu-crt']`, **on by default**). Only
  `.crt-overlay` is display-gated. The `#crt-pixelate` filter is applied to
  `.drag-ghost` only — **never to text-bearing chrome or `.win`/`.win-body`**: the
  filter plus dense scanlines made the header, taskbar and window text unreadable.
  Keep scanline opacity low (`0.05`); raise it only if you also re-check legibility.
* Do not put the filter on `main` or `body`: a filtered ancestor becomes the
  containing block for `position: fixed`, which would break `.win.maximized`,
  the taskbar and the starfield.

## Drag ghosts (old-solitaire smear)

`makeDraggable()` stamps a `.drag-ghost` (titlebar + face + the window's hard shadow,
no content) behind the window for every 14px of travel, max 18, and removes them on
drop. Ghosts are inserted with `insertBefore(g, win)`, which is why
`detachWindow()` keeps `win._ph` and `dropPlaceholder()` prefers it over
`previousElementSibling` — otherwise a ghost would be mistaken for the placeholder.

The trail must never survive the drag: `mouseup` is not fired inside the document when
the button is released outside it or the tab loses focus, so the drag also ends on
`window blur` and `document mouseleave`, and every new drag first deletes any stale
`.drag-ghost`. A leftover ghost is what reads on screen as a window "cut off with a
detached shadow".

`clampIntoView()` keeps a dragged window inside the viewport (body clips its overflow,
so a window pulled past the edge used to be cut off with its shadow left behind).

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
* Dragging/resizing switches a window to `position: absolute` **in document
  coordinates** via `detachWindow()` (offset against `main`'s padding box, the window's
  containing block), and inserts a `.win-placeholder` (copying the window's height +
  vertical margins) so the page keeps the space. Without the placeholder the footer and
  other windows jump.
* Never go back to `position: fixed` for a moved window: a fixed window stays glued to
  the viewport, so scrolling the page slides it over the other windows. Absolute
  document coordinates keep a moved window where the user put it — it scrolls with the
  content. `.win.maximized` is the one intentional exception (`fixed !important`).

## Responsive window content

* `.win` is a CSS query container (`container-type: inline-size`). Layout/typography
  inside a window is written against the **window's** width, not the viewport:
  the `RESPONSIVE WINDOWS` block at the end of `style.css` stacks `.about-grid`, drops
  `.stats-row` to 3/2 columns, shrinks `.win-body` padding and scales headings with
  `cqw`. That is what keeps text readable when the user drags a window narrow.
* A resized window (`[data-floating="1"]`) becomes a flex column and its `.win-body`
  scrolls, so content never spills outside the frame. Do not add `overflow: hidden` to
  `.win` itself — it would clip the resize handles and the menu dropdowns.

## Verifying

```
curl -sf http://localhost:3000/ -o /dev/null -w '%{http_code}\n'   # 200
curl -sf http://localhost:3000/themes.css -o /dev/null -w '%{http_code}\n'
```

* Background: `canvas.bg-fx`, fixed, `z-index: -1` (behind all content). The particle
  mode follows the theme (`THEME_MODE` in `bg.js`): sakura/candy → petals, lava/blood →
  ash + embers, terminal → matrix rain, ice/ocean → snow, forest → leaves,
  neon/vaporwave/sunset/gold → sparks, anything else → falling stars. `applyTheme()`
  calls `window.nxttuBg.setTheme(key)`, so switching theme swaps the particles live.
  Everything always moves — the OS "reduce motion" preference only halves the speed.
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
