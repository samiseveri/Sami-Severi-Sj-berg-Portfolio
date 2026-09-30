/**
 * Shared project data — used by projects.html and project-details.html
 *
 * Curated from resume, LinkedIn experience, and public GitHub repos.
 * github / demo: set a real URL, or omit / set null when unavailable.
 */
export const PROJECTS = [
  {
    id: 'bittera-signage',
    title: 'Bittera Digital Signage',
    category: 'tools',
    description:
      'Remote digital signage platform for Raspberry Pi screens — media library, playlists, layouts, and live device monitoring from one admin web app.',
    image: 'assets/images/project-bittera.svg',
    tags: ['JavaScript', 'Node.js', 'Raspberry Pi', 'PostgreSQL', 'Linux'],
    github: 'https://github.com/samiseveri/Raspi-oppari',
    demo: null,
    features: [
      'Centralized admin for media, playlists, and multi-zone screen layouts',
      'Raspberry Pi players with local caching and offline-tolerant playback',
      'Device heartbeats, remote sync, and reboot commands',
      'Multi-tenant customers, roles, CSRF protection, and signed media URLs',
      'Finnish / English UI for operators',
    ],
    overview:
      'Built during my Full Stack Engineer internship at Bittera Oy. The system lets operators manage advertising screens at shops, offices, and lobbies from one website, while Raspberry Pi devices download content and play it fullscreen — even through short network drops.',
  },
  {
    id: 'market-monitor',
    title: 'Market Monitor',
    category: 'web',
    description:
      'Personal financial monitoring and portfolio tracking app — NestJS API, React frontend, PostgreSQL, and Redis in a monorepo architecture.',
    image: 'assets/images/project-market-monitor.svg',
    tags: ['TypeScript', 'NestJS', 'React', 'Prisma', 'Docker'],
    github: 'https://github.com/samiseveri/financial-monitoring-plan-app',
    demo: null,
    features: [
      'Monorepo with shared domain packages and typed DTOs',
      'NestJS API + Prisma with Dockerized PostgreSQL and Redis',
      'React (Vite) web client for dashboards and watchlists',
      'Planned ingestion, alerts, and daily reporting pipeline',
      'Designed as a solo software-engineering thesis project',
    ],
    overview:
      'Market Monitor is my in-progress thesis-oriented full-stack product: a personal market and portfolio monitor with a clear API/web split, Docker-based local infrastructure, and a phased roadmap from auth through alerts and reporting.',
  },
  {
    id: 'price-checker',
    title: 'Price Checker API',
    category: 'tools',
    description:
      'Clean-architecture FastAPI backend for store price comparison — JWT auth, layered services, and Docker deployment.',
    image: 'assets/images/project-price-checker.svg',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'JWT', 'Docker'],
    github: 'https://github.com/samiseveri/Practical-software-architecture-Teamwork-Commission',
    demo: null,
    features: [
      'Layered Clean Architecture (API, services, CRUD, models, schemas)',
      'OAuth2 / JWT security with password hashing',
      'Price comparison and labeling strategies for nearby stores',
      'Role-based user management for admins, stores, and shoppers',
      'Docker Compose setup with Swagger docs',
    ],
    overview:
      'Team coursework from the Practical Software Architecture course (TWC–PSA 2025). I contributed to a FastAPI backend that compares store prices using strategy-based labeling, solid layering, and production-minded auth and Docker packaging.',
  },
  {
    id: 'boardgame-site',
    title: 'Board Game Hobbyist Site',
    category: 'web',
    description:
      'Server-rendered Node.js + Express board-game community site with MongoDB, sessions, and modular MVC structure.',
    image: 'assets/images/project-boardgame.svg',
    tags: ['Node.js', 'Express', 'MongoDB', 'Handlebars', 'Jest'],
    github: 'https://github.com/samiseveri/backend-development-project-work',
    demo: null,
    features: [
      'Full server-side Express application with Handlebars views',
      'MongoDB models with session-based authentication',
      'Modular routes, controllers, models, and public assets',
      'Automated tests with Jest and Supertest',
      'Backend course team project focused on real server patterns',
    ],
    overview:
      'A hobbyist board-game website built as backend course teamwork. The stack stays intentionally server-centric — Express, MongoDB, and Handlebars — with a clear project structure and tests to practice production backend habits.',
  },
  {
    id: 'studisco-games',
    title: 'Studisco Game Production',
    category: 'games',
    description:
      'Game production leadership and design work — production planning, creative direction, mini-games, and playtesting in a studio setting.',
    image: 'assets/images/project-studisco.svg',
    tags: ['Unity', 'Game Design', 'Figma', 'Project Management'],
    github: null,
    demo: null,
    features: [
      'Game Production Lead / Lead Designer responsibilities',
      'Creative direction across game and media production',
      'Designed game sections, mini-games, and level flows',
      'Playtesting reports feeding iterative development',
      'Production scheduling and team coordination',
    ],
    overview:
      'At Studisco I worked as Game Designer and later Creative Director / Game Production Lead. The work combined Unity design, Figma workflows, and project management — shipping content under real production deadlines.',
  },
  {
    id: 'this-site',
    title: 'This Site',
    category: 'web',
    description:
      'Personal portfolio built with vanilla HTML, CSS, and JavaScript — dark/light themes, motion, and accessible multi-page structure.',
    image: 'assets/images/project-folio.svg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility'],
    github: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
    demo: 'https://sami-severi.fi',
    features: [
      'Dark / light theme with persistent preference',
      'Scroll animations and responsive layout',
      'Accessible navigation, filters, and detail pages',
      'Shared content modules for skills, hobbies, and projects',
      'No framework dependency — crafted with the web platform',
    ],
    overview:
      'This portfolio is both a product and a playground: a multi-page site that presents my experience, skills, and projects while showcasing careful frontend craft in plain HTML, CSS, and JavaScript.',
  },
]

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function hasProjectLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url)
}
