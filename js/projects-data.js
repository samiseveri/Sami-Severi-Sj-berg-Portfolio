/**
 * Shared project data — used by projects.html and project-details.html
 *
 * github / demo: set a real URL, or omit / set null when unavailable.
 * Do not use placeholder domains (github.com root, example.com).
 *
 * Note: Bittera Raspberry Pi work lives in the public repo `Raspi-oppari`
 * (no public repo named Bittera-RasperyPi-add-project was found).
 */
export const PROJECTS = [
  {
    id: 'bittera-raspi',
    title: 'Bittera Raspberry Pi Signage',
    category: 'tools',
    description:
      'Remote digital signage platform: admin web app plus Raspberry Pi players for customer screens.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Raspberry Pi', 'JavaScript'],
    github: 'https://github.com/samiseveri/Raspi-oppari',
    githubLabel: 'View on GitHub',
    demo: null,
    overview:
      'Bittera is a web-based digital signage system built during my full-stack internship. Operators manage media, playlists, layouts, devices, and customers from one admin site, while Raspberry Pi players download content and play it fullscreen on TVs — including brief offline periods. The project covers the admin backend/frontend, device player software, sync/heartbeats, and Pi setup tooling.',
    technologiesPanel: {
      title: 'Technologies Used',
      lead: 'Full-stack signage platform spanning cloud admin, database, and on-device Raspberry Pi players.',
      tools: [
        {
          id: 'node',
          name: 'Node.js',
          category: 'Runtime',
          badge: 'Core',
          description: 'Server runtime for the admin API and device-facing endpoints',
        },
        {
          id: 'express',
          name: 'Express',
          category: 'Backend',
          description: 'HTTP API, sessions, uploads, and admin routes',
        },
        {
          id: 'postgres',
          name: 'PostgreSQL',
          category: 'Database',
          description: 'Persistent storage for users, media, playlists, devices, and status',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'Logic',
          description: 'Admin server logic and Raspberry Pi player scripts',
        },
        {
          id: 'raspberrypi',
          name: 'Raspberry Pi',
          category: 'Hardware',
          description: 'On-site players that sync media and play content on screens',
        },
      ],
    },
  },
  {
    id: 'fullstack-course',
    title: 'Fullstack Course',
    category: 'web',
    description:
      'Coursework covering modern full-stack JavaScript — React frontends, Node/Express APIs, and state management.',
    tags: ['React', 'JavaScript', 'Express', 'Redux', 'Node.js'],
    github: 'https://github.com/samiseveri/Fullstack-course',
    githubLabel: 'View on GitHub',
    demo: null,
    overview:
      'A repository of exercises and apps from a full-stack web development course. It progresses through frontend React apps, REST APIs with Node.js and Express, and more advanced patterns such as Redux state management across multiple course parts.',
    technologiesPanel: {
      title: 'Technologies Used',
      lead: 'Full-stack JavaScript stack used across the course parts.',
      tools: [
        {
          id: 'react',
          name: 'React',
          category: 'Frontend',
          badge: 'Core',
          description: 'Component-based UI apps built throughout the course parts',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'Language',
          description: 'Primary language for both frontend and backend exercises',
        },
        {
          id: 'node',
          name: 'Node.js',
          category: 'Runtime',
          description: 'Backend runtime for API exercises and tooling',
        },
        {
          id: 'express',
          name: 'Express',
          category: 'Backend',
          description: 'REST API servers and middleware in later course parts',
        },
        {
          id: 'redux',
          name: 'Redux',
          category: 'State',
          description: 'Client state management with Redux Toolkit patterns',
        },
      ],
    },
  },
  {
    id: 'vibe-coding-snake',
    title: 'Vibe Coding Snake',
    category: 'web',
    description:
      'Experimental snake games built with vibe coding — including a 3D snake and a React/TypeScript cube snake.',
    tags: ['HTML', 'Three.js', 'React', 'TypeScript', 'Vite'],
    github: 'https://github.com/samiseveri/vibe-coding-snake',
    githubLabel: 'View on GitHub',
    demo: null,
    overview:
      'A collection of snake-game experiments created with AI-assisted vibe coding. It includes a browser 3D snake experience powered by Three.js and a Vite + React + TypeScript cube-snake prototype styled with Tailwind CSS — focused on rapid iteration and playful interaction design.',
    technologiesPanel: {
      title: 'Technologies Used',
      lead: 'Browser game experiments mixing vanilla WebGL/Three.js with a modern React toolchain.',
      tools: [
        {
          id: 'html',
          name: 'HTML5',
          category: 'Markup',
          description: 'Standalone game pages and app shells',
        },
        {
          id: 'threejs',
          name: 'Three.js',
          category: 'Graphics',
          badge: '3D',
          description: '3D rendering for the FEZ-inspired snake experience',
        },
        {
          id: 'react',
          name: 'React',
          category: 'Frontend',
          description: 'UI and game loop structure for the cube-snake prototype',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'Language',
          description: 'Typed game logic in the Vite cube-snake project',
        },
        {
          id: 'vite',
          name: 'Vite',
          category: 'Tooling',
          description: 'Fast local development and bundling for the React game',
        },
      ],
    },
  },
  {
    id: 'folio',
    title: 'This Portfolio',
    category: 'web',
    description:
      'Premium personal portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SVG'],
    github: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
    githubLabel: 'View on GitHub',
    demo: 'https://sami-severi.fi',
    demoLabel: 'Visit live site',
    overview:
      'This is my personal portfolio site — built with vanilla HTML, CSS, and JavaScript, without a framework or build step. It presents my experience, skills, hobbies, and selected work in a fast, accessible layout with dark/light themes and scroll-driven motion. The goal was to show that careful frontend craft with core web technologies can still deliver a polished, production-ready experience.',
    technologiesPanel: {
      title: 'Technologies Used',
      lead: 'Core web technologies only — no framework and no build step for the site itself.',
      tools: [
        {
          id: 'html',
          name: 'HTML5',
          category: 'Markup',
          description: 'Semantic page structure, accessible landmarks, and content markup',
        },
        {
          id: 'css',
          name: 'CSS3',
          category: 'Styling',
          description: 'Design system, responsive layout, themes, and motion',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'Logic',
          badge: 'Core',
          description: 'ES modules for navigation, filtering, details pages, and interactions',
        },
        {
          id: 'svg',
          name: 'SVG',
          category: 'Graphics',
          description: 'Icons and lightweight vector graphics used throughout the UI',
        },
      ],
    },
  },
]

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function hasProjectLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url)
}
