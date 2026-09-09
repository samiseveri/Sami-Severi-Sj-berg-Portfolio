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
    image: 'assets/images/project-folio.svg',
    imageFit: 'contain',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SVG'],
    github: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
    githubLabel: 'View on GitHub',
    demo: 'https://sami-severi.fi',
    demoLabel: 'Visit live site',
    features: ['Dark/light mode', 'Scroll animations', 'Fully responsive', 'Accessible'],
    overview:
      'This is my personal portfolio site — built with vanilla HTML, CSS, and JavaScript, without a framework or build step. It presents my experience, skills, hobbies, and selected work in a fast, accessible layout with dark/light themes and scroll-driven motion. The goal was to show that careful frontend craft with core web technologies can still deliver a polished, production-ready experience.',
  },
]

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function hasProjectLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url)
}
