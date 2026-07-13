# Sami-Severi Sjöberg Portfolio

A premium personal portfolio website built with **HTML5**, **CSS3**, and **vanilla JavaScript** — no frameworks, no build step.

## Quick start (Live Server)

This project uses **ES modules**, so it must be served over HTTP. The recommended way to run it locally is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code / Cursor:

1. Clone this repository and open the folder in VS Code or Cursor.
2. Install the **Live Server** extension (recommended via `.vscode/extensions.json`).
3. Right-click `index.html` → **Open with Live Server**.
4. Your browser opens at `http://127.0.0.1:5500` (port configured in `.vscode/settings.json`).

> **Do not** open `index.html` directly from the file system (`file://`). JavaScript modules will not load.

### Alternative: live-server CLI

If you have Node.js installed:

```bash
npx live-server --port=5500
```

Then open http://127.0.0.1:5500

## Project structure

```
index.html              Home — hero, previews, CTAs
about.html              About Me — story, values, timeline
experience.html         Work history — expandable role cards
projects.html           Project grid with category filters
project-details.html    Individual project case study (?id=)
skills.html             Skills with animated progress bars
education.html          Education & certifications timeline
hobbies.html            Interactive hobby cards
contact.html            Contact form with validation

css/
  style.css             Design system & component styles
  animations.css        Keyframes & scroll reveals
  responsive.css        Breakpoints & mobile navigation

js/
  main.js               App bootstrap
  navigation.js         Nav, theme toggle, mobile menu
  animations.js         Typing, counters, tilt, reveals
  experience.js         Expandable experience cards
  projects.js           Project filtering
  projects-data.js      Shared project content
  project-details.js    Dynamic project detail page
  skills.js             Skill bar animations
  contact.js            Form validation

assets/
  images/               Project thumbnails (SVG)
  icons/                UI icons (SVG)
  fonts/                Optional local fonts
```

## Features

- Dark mode default with light/dark theme toggle (saved in `localStorage`)
- Responsive navigation with animated mobile drawer
- Scroll progress bar, scroll reveals, back-to-top button
- Typing animation on the home hero
- Animated stat counters and skill progress bars
- Project filtering by category
- Contact form with client-side validation

## Maintaining the site

### Update content

| What to change | Where |
|----------------|-------|
| Projects list | `js/projects-data.js` |
| Work experience | `experience.html` |
| About bio & timeline | `about.html` |
| Skills & levels | `skills.html` (`data-skill-bar="90"` = 90%) |
| Education entries | `education.html` |
| Contact details | `contact.html` |
| Colors & fonts | CSS variables in `css/style.css` (`:root`) |

### Add a new project

1. Add an SVG thumbnail to `assets/images/`.
2. Add an entry to the `PROJECTS` array in `js/projects-data.js`.
3. The project appears automatically on `projects.html` and at `project-details.html?id=your-id`.

### Navigation links

Nav items are defined once in `js/navigation.js` (`NAV_LINKS`). Active page highlighting uses the `data-page` attribute on each page's `<body>` tag.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge) with ES module support.

## License

Private — © Sami-Severi Sjöberg
