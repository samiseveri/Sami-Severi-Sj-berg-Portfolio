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
index.html              Home — hero, previews, CTAs, references
about.html              About Me — story, values, timeline
experience.html         Work history — expandable role cards
projects.html           Project list with category filters
project-details.html    Individual project case study (?id=)
skills.html             Skills with animated progress bars
education.html          Education & certifications timeline
hobbies.html            Hobby cards with hover scenes
hobby-details.html      Individual hobby detail (?id=)
contact.html            Contact details and resume download
404.html                Not-found page

css/
  style.css             Design system & component styles
  animations.css        Keyframes & scroll reveals
  responsive.css        Breakpoints & mobile navigation

js/
  main.js               App bootstrap (loader, progress, modules)
  site-data.js          Single source of truth for profile/contact
  site-content.js       Hydrates contact/CV/profile/year from site-data
  social-links.js       Shared social icons
  navigation.js         Nav, theme toggle, mobile menu
  animations.js         Typing, counters, tilt, reveals
  experience.js         Expandable experience cards
  projects.js           Accessible project filtering
  projects-data.js      Shared project content
  project-details.js    Dynamic project detail page
  skills.js             Skill bar animations
  hobbies-data.js       Shared hobby content
  hobbies.js            Hobby card grid + hover scenes
  hobby-details.js      Hobby detail page + galleries

assets/
  images/               Photos, project art, hobby galleries
  icons/                UI icons + favicon
  documents/            Resume PDF

robots.txt              Crawler rules
sitemap.xml             Page list (set SITE_ORIGIN after deploy)
scripts/check-links.mjs Local link checker
```

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

| What to change                                 | Where                                                           |
| ---------------------------------------------- | --------------------------------------------------------------- |
| Name, email, phone, socials, CV, profile image | `js/site-data.js`                                               |
| Projects list / links                          | `js/projects-data.js`                                           |
| Hobbies list / galleries                       | `js/hobbies-data.js` + `assets/images/hobbies/*-gallery.json`   |
| Work experience                                | `experience.html`                                               |
| About bio & timeline                           | `about.html`                                                    |
| Skills, levels, years & project counts         | `skills.html` (`data-skill-bar="90"` = 90%; `.skill-bar__meta`) |
| Education entries                              | `education.html`                                                |
| Colors & fonts                                 | CSS variables in `css/style.css` (`:root`)                      |
| Deployed site URL for sitemap/OG               | `js/site-data.js` (`siteUrl`) and `sitemap.xml`                 |

### Add a new project

1. Add a thumbnail under `assets/images/`.
2. Add an entry to `PROJECTS` in `js/projects-data.js`.
3. Set real `github` / `demo` URLs, or leave them `null` when unavailable.
4. The project appears on `projects.html` and at `project-details.html?id=your-id`.

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
