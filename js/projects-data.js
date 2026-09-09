/**
 * Shared project data — used by projects.html and project-details.html
 *
 * github / demo: set a real URL, or omit / set null when unavailable.
 * Do not use placeholder domains (github.com root, example.com).
 */
export const PROJECTS = [
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
