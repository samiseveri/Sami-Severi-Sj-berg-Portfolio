# Sami-Severi Sjöberg Portfolio

Vanilla HTML / CSS / JavaScript portfolio site. See `README.md` for structure and scripts.

## Cursor Cloud specific instructions

- This is a **static site** (no build step). Run `npm install` then `npm run dev` to serve on port **5173** via the `serve` package.
- ES modules (`type="module"` in `js/main.js`) require an HTTP server — do not open HTML files directly via `file://`.
- Run the dev server in a persistent **tmux** session (long-running process).
- Dark mode is the default (`data-theme="dark"` on `<html>`). Theme preference is stored in `localStorage` under the key `theme`.
- Active navigation is driven by `data-page` on `<body>` and populated dynamically in `js/navigation.js`.
- Inner pages (About, Experience, etc.) currently have placeholder content marked "Coming in Phase 2" — only the home hero is fully built in Phase 1.
