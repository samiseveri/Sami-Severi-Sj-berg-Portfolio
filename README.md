# Sami-Severi Sjöberg Portfolio

A premium, modern personal portfolio website built with **HTML5**, **CSS3**, and **vanilla JavaScript** — no frameworks.

## Stack

- Semantic HTML5
- CSS3 (custom properties, glassmorphism, animations)
- ES modules (vanilla JavaScript)
- Responsive, mobile-first design
- Dark mode default with light mode toggle

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

```
index.html              Home (hero + previews)
about.html              About Me
experience.html         Experience timeline
projects.html           Projects grid
project-details.html    Project case study
skills.html             Skills & charts
education.html          Education timeline
hobbies.html            Hobbies
contact.html            Contact form

css/
  style.css             Global styles & design system
  animations.css        Keyframes & scroll reveals
  responsive.css        Breakpoints & mobile nav

js/
  main.js               App bootstrap
  navigation.js         Nav, theme toggle, mobile menu
  animations.js         Typing, magnetic buttons, reveals
  contact.js            Form validation

assets/
  images/               Project & profile images
  icons/                SVG icons
  fonts/                Local fonts (optional)
```

## Build status

**Phase 1 (complete):** folder structure, base HTML pages, global CSS, navigation, hero section.

**Phase 2+ (upcoming):** About, Experience, Projects, Skills, Education, Hobbies, Contact — full content and interactions.
