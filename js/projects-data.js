/**
 * Shared project data — used by projects.html and project-details.html
 *
 * Curated from resume, LinkedIn experience, and public GitHub repos.
 * status: 'done' | 'ongoing' | 'left'
 * github / demo / website: set a real URL, or omit / set null when unavailable.
 * Prefer github when public; otherwise use website for a relevant external page.
 */
export const PROJECT_STATUS = {
  done: 'Done',
  ongoing: 'Ongoing',
  left: 'No longer participating',
}

export const PROJECTS = [
  {
    id: 'bittera-signage',
    title: 'Bittera Digital Signage',
    category: 'tools',
    status: 'ongoing',
    description:
      'Remote digital signage platform for Raspberry Pi screens — and the focus of my thesis on localized software and its importance.',
    image: 'assets/images/project-bittera.svg',
    tags: ['JavaScript', 'Node.js', 'Raspberry Pi', 'PostgreSQL', 'Linux'],
    github: null,
    website: 'https://www.bittera.fi/',
    websiteLabel: 'Visit Bittera',
    demo: null,
    features: [
      'Web platform for centralized advertising screen management',
      'Remote media uploads and playlist scheduling',
      'Device monitoring for distributed Raspberry Pi players',
      'Software maintenance features for remote devices',
      'Thesis work at Bittera on localized software and its importance',
    ],
    overview:
      'Built during my Full Stack Engineer internship at Bittera Oy, and continued as ongoing work where I am completing my thesis on localized software and its importance. The system lets operators manage advertising screens at shops, offices, and lobbies from one website, while Raspberry Pi devices download content and play it fullscreen — even through short network drops.',
  },
  {
    id: 'market-monitor',
    title: 'Market Monitor',
    category: 'web',
    status: 'ongoing',
    description:
      'Personal financial monitoring and portfolio tracking app — NestJS API, React frontend, PostgreSQL, and Redis in a monorepo architecture.',
    image: 'assets/images/project-market-monitor.svg',
    tags: ['TypeScript', 'NestJS', 'React', 'Prisma', 'Docker'],
    github: 'https://github.com/samiseveri/financial-monitoring-plan-app',
    demo: null,
    features: [
      'Monorepo workspaces for API, web, shared types, and domain logic',
      'NestJS backend with Prisma, PostgreSQL, and Redis via Docker Compose',
      'React (Vite) frontend for the monitoring UI',
      'Phased roadmap from auth through markets, portfolio, alerts, and reports',
      'Personal full-stack product currently in active development',
    ],
    overview:
      'Market Monitor is my in-progress full-stack product: a personal market and portfolio monitor with a clear API/web split, Docker-based local infrastructure, and a phased roadmap from auth through alerts and reporting.',
  },
  {
    id: 'federated-learning-ui',
    title: 'Capstone',
    category: 'web',
    status: 'done',
    description:
      'Capstone Innovation Project at Turku UAS — further developing the user interface for a federated learning platform from an earlier proof of concept.',
    image: 'assets/images/project-federated-ui.svg',
    tags: ['React', 'TypeScript', 'Docker'],
    github: null,
    website: 'https://www.turkuamk.fi/',
    websiteLabel: 'Turku UAS',
    demo: null,
    features: [
      'UI for a federated learning platform, extended from an earlier proof of concept',
      'Team-owned delivery with high autonomy over solution design and execution',
      'React and TypeScript frontend with Vite and TanStack Query',
      'NiiVue integration for interactive 3D volumetric scans and segmentation overlays',
      'Capstone Innovation Project at Turku UAS (16 Jan – 28 Apr 2026), assessed at group level',
    ],
    overview:
      'As a member of the Capstone Innovation Project team at Turku University of Applied Sciences (16 January to 28 April 2026), I helped further develop a User Interface for a federated learning platform, building on an earlier proof-of-concept. The team organized its own roles and execution under broad objectives. The deliverable was assessed at group level and recognized for its professional look, functionality, and attention to detail — including NiiVue for browser-based 3D visualization of volumetric scans.',
  },
  {
    id: 'boardgame-site',
    title: 'Board Game Hobbyist Site',
    category: 'web',
    status: 'done',
    description:
      'Server-rendered Node.js + Express board-game community site with MongoDB, sessions, and modular MVC structure.',
    image: 'assets/images/project-boardgame.svg',
    tags: ['Node.js', 'Express', 'MongoDB', 'Handlebars', 'Jest'],
    github: 'https://github.com/samiseveri/backend-development-project-work',
    demo: null,
    features: [
      'Server-side Node.js + Express application with Handlebars views',
      'MongoDB data models and session-based authentication',
      'Modular layout: routes, controllers, models, views, and public assets',
      'Automated tests with Jest and Supertest',
      'Backend course team project focused on real server-side patterns',
    ],
    overview:
      'A hobbyist board-game website built as backend course teamwork. The stack stays intentionally server-centric — Express, MongoDB, and Handlebars — with a clear project structure and tests to practice production backend habits.',
  },
  {
    id: 'fullstack-course',
    title: 'Full Stack Course',
    category: 'web',
    status: 'ongoing',
    description:
      'Coursework repository covering modern full-stack web development — React frontends, Redux state management, and progressive part-based exercises.',
    image: 'assets/images/project-fullstack-course.svg',
    tags: ['JavaScript', 'React', 'Redux', 'HTML', 'CSS'],
    github: 'https://github.com/samiseveri/Fullstack-course',
    demo: null,
    features: [
      'Part-based full-stack coursework from fundamentals through advanced React',
      'React applications with Redux Toolkit for client-side state',
      'HTTP client work with Axios and JSON-backed exercise setups',
      'HTML, CSS, and JavaScript practice across multiple project parts',
      'Public GitHub repository documenting the full learning path',
    ],
    overview:
      'A dedicated repository for my full-stack course work. It is organized into numbered parts and includes React, Redux Toolkit, Axios, and classic web fundamentals — building practical experience across the modern JavaScript stack.',
  },
  {
    id: 'gamelib',
    title: 'GameLib',
    category: 'web',
    status: 'ongoing',
    description:
      'Full-stack game library aggregator — sync Steam, Epic, and GOG libraries into one place with Dockerized React and Node.js infrastructure.',
    image: 'assets/images/project-gamelib.svg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Prisma'],
    github: 'https://github.com/Artur-Nayman/GameLib',
    demo: null,
    features: [
      'Infrastructure engineering and full-stack development on a theFIRMA team project',
      'React (Vite) client with Zustand and Tailwind CSS',
      'Node.js + Express API with PostgreSQL, Prisma, and JWT auth',
      'Docker Compose setup for synchronized local development',
      'Planned multi-store sync, library comparison, and cross-platform inventory',
    ],
    overview:
      'GameLib is a team project at theFIRMA (Turku University of Applied Sciences) that aggregates game libraries from platforms like Steam, Epic Games, and GOG into one web app. I contribute as Infrastructure Engineer and Full-stack Developer — Dockerized client/server setup, PostgreSQL, and full-stack features — with the project in active development (Phase 1: Foundation & Sync).',
  },
  {
    id: 'studisco-games',
    title: 'Studisco Game Production',
    category: 'games',
    status: 'done',
    description:
      'Game production leadership and design work — production planning, creative direction, mini-games, and playtesting in a studio setting.',
    image: 'assets/images/project-studisco.svg',
    tags: ['Godot', 'Game Design', 'Project Management', 'PHP'],
    github: null,
    demo: null,
    features: [
      'Game Production Lead and Lead Designer responsibilities',
      'Creative direction across game and media production projects',
      'Game sections, mini-games, and gameplay flow design in Godot',
      'Playtesting and feedback reporting for the development team',
      'Production scheduling, meeting facilitation, and team coordination',
    ],
    overview:
      'At Studisco I worked as Game Designer and later Creative Director / Game Production Lead. The work combined Godot design and project management — shipping content under real production deadlines.',
  },
  {
    id: 'this-site',
    title: 'This Site',
    category: 'web',
    status: 'done',
    description:
      'Personal portfolio built with vanilla HTML, CSS, and JavaScript — dark/light themes, motion, and accessible multi-page structure.',
    image: 'assets/images/project-folio.svg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility'],
    github: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
    demo: null,
    features: [
      'Multi-page portfolio with dark and light themes',
      'Responsive layout and scroll-based motion',
      'Accessible navigation, project filters, and detail pages',
      'Shared JS data modules for skills, hobbies, projects, and site content',
      'Vanilla HTML, CSS, and JavaScript — no frontend framework',
    ],
    overview:
      'This portfolio is both a product and a playground: a multi-page site that presents my experience, skills, and projects while showcasing careful frontend craft in plain HTML, CSS, and JavaScript.',
  },
]

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function getProjectStatusLabel(status) {
  return PROJECT_STATUS[status] || status
}

export function hasProjectLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url)
}
