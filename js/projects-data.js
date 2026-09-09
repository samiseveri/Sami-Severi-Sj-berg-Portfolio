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
