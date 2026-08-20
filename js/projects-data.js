/**
 * Shared project data — used by projects.html and project-details.html
 *
 * github / demo: set a real URL, or omit / set null when unavailable.
 * Do not use placeholder domains (github.com root, example.com).
 */
export const PROJECTS = [
  {
    id: 'aurora',
    title: 'Aurora Dashboard',
    category: 'web',
    description:
      'Real-time analytics dashboard with live charts, dark mode, and a plugin widget system.',
    image: 'assets/images/project-aurora.svg',
    tags: ['React', 'TypeScript', 'D3', 'WebSockets'],
    github: null,
    demo: null,
    features: [
      'Real-time data streaming',
      'Custom widget plugins',
      'Dark/light themes',
      'Export to PDF',
    ],
    overview:
      'Aurora is an enterprise analytics platform that transforms raw data into actionable insights through beautiful, real-time visualizations.',
  },
  {
    id: 'trailhead',
    title: 'Trailhead',
    category: 'mobile',
    description:
      'Trip-planning app for hikers with offline maps, elevation profiles, and shared itineraries.',
    image: 'assets/images/project-trailhead.svg',
    tags: ['React Native', 'MapLibre', 'SQLite'],
    github: null,
    demo: null,
    features: ['Offline map caching', 'Elevation profiles', 'Shared trip planning', 'GPS tracking'],
    overview:
      'Trailhead helps outdoor enthusiasts plan, navigate, and share hiking adventures — even without cell service.',
  },
  {
    id: 'cadence',
    title: 'Cadence',
    category: 'web',
    description:
      'Minimalist habit tracker that turns daily routines into streaks with gentle motivating nudges.',
    image: 'assets/images/project-cadence.svg',
    tags: ['HTML', 'CSS', 'PWA', 'IndexedDB'],
    github: null,
    demo: null,
    features: ['Streak tracking', 'Offline PWA', 'Gentle reminders', 'Progress analytics'],
    overview:
      'Cadence makes building habits feel effortless with a calm, distraction-free interface and smart streak mechanics.',
  },
  {
    id: 'nexus',
    title: 'Nexus Design System',
    category: 'design',
    description:
      'Comprehensive component library and design tokens used across multiple product teams.',
    image: 'assets/images/project-nexus.svg',
    tags: ['Figma', 'Storybook', 'React', 'CSS'],
    github: null,
    demo: null,
    features: ['50+ components', 'Design tokens', 'Accessibility built-in', 'Storybook docs'],
    overview:
      'Nexus unifies design and development with a shared language of tokens, patterns, and documented components.',
  },
  {
    id: 'pulse',
    title: 'Pulse API Monitor',
    category: 'tools',
    description:
      'Developer tool for monitoring API health, latency, and uptime with instant alerts.',
    image: 'assets/images/project-pulse.svg',
    tags: ['Node.js', 'Chart.js', 'Redis', 'Docker'],
    github: null,
    demo: null,
    features: ['Uptime monitoring', 'Latency graphs', 'Slack alerts', 'Status pages'],
    overview:
      'Pulse gives engineering teams peace of mind with real-time API health monitoring and beautiful status dashboards.',
  },
  {
    id: 'folio',
    title: 'This Portfolio',
    category: 'web',
    description:
      'Premium personal portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks.',
    image: 'assets/images/project-folio.svg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SVG'],
    github: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
    demo: null,
    features: ['Dark/light mode', 'Scroll animations', 'Fully responsive', 'Accessible'],
    overview:
      'A showcase of frontend craft — proving that vanilla web technologies can deliver award-level experiences.',
  },
]

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function hasProjectLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url)
}
