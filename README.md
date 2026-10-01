# Sami-Severi Sjöberg Portfolio

A personal portfolio website built with **HTML5**, **CSS3**, and **vanilla JavaScript** (ES modules) — no frameworks and no build step required for the site itself.

## Quick start

This project uses ES modules, so it must be served over HTTP (not opened as `file://`).

### Option A — npm static server

```bash
npm install
npm start
```

Then open http://127.0.0.1:5500

### Option B — any static file server

```bash
npx serve . -p 5500
```

## Project structure

```
index.html              Entry redirect → pages/index.html
404.html                Not-found page
google*.html            Search Console verification (must stay at root)

pages/                  All site pages (edit these)
  index.html            Home
  about.html            About
  experience.html       Work history
  projects.html         Project list
  project-details.html  Project case study (?id=)
  skills.html           Skills
  education.html        Education
  hobbies.html          Hobbies
  hobby-details.html    Hobby detail (?id=)
  contact.html          Contact

css/                    Styles
js/                     Scripts & page data
assets/                 Images, icons, documents
scripts/                Local tooling (link checks, crawls)

serve.json              Local redirects for old root URLs
robots.txt / sitemap.xml
```

Root stays thin on purpose: content lives in `pages/`, styles in `css/`, logic in `js/`, media in `assets/`.
## Features

- Dark mode default with light/dark theme toggle (saved in `localStorage`)
- Responsive navigation with animated mobile drawer
- Scroll progress bar with `aria-valuenow` updates
- Typing animation on the home hero (respects `prefers-reduced-motion`)
- Animated stat counters and skill progress bars
- Project filtering with accessible pressed-state buttons
- Hobby cards with themed hover scenes
- Contact page with email, phone, social links, and resume download

## Maintaining the site

| What to change                                 | Where                                                         |
| ---------------------------------------------- | ------------------------------------------------------------- |
| Name, email, phone, socials, CV, profile image | `js/site-data.js`                                             |
| Projects list / links                          | `js/projects-data.js`                                         |
| Hobbies list / galleries                       | `js/hobbies-data.js` + `assets/images/hobbies/*-gallery.json` |
| Work experience                                | `pages/experience.html`                                       |
| About bio & timeline                           | `pages/about.html`                                            |
| Skills & levels                                | `pages/skills.html` (`data-skill-bar="90"` = 90%)             |
| Education entries                              | `pages/education.html`                                        |
| Colors & fonts                                 | CSS variables in `css/style.css` (`:root`)                    |
| Deployed site URL for sitemap/OG               | `js/site-data.js` (`siteUrl`) and `sitemap.xml`               |

### Add a new project

1. Add a thumbnail under `assets/images/`.
2. Add an entry to `PROJECTS` in `js/projects-data.js`.
3. Set real `github` / `demo` URLs, or leave them `null` when unavailable.
4. The project appears on `pages/projects.html` and at `pages/project-details.html?id=your-id`.

### Navigation links

Nav items are defined once in `js/navigation.js` (`NAV_LINKS`). Active page highlighting uses the `data-page` attribute on each page's `<body>` tag.

## Validation

```bash
npm install
npm run validate
```

This runs ESLint, HTML-Validate, Stylelint, Prettier check, and the local link checker. GitHub Actions runs the same checks on push/PR.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge) with ES module support.

## License

Private — © Sami-Severi Sjöberg
