/**
 * Projects page — category filtering
 */
import { PROJECTS } from './projects-data.js'

const Projects = (() => {
  function renderGrid(container, items) {
    container.innerHTML = items
      .map(
        (p) => `
      <article class="project-card glass reveal" data-category="${p.category}">
        <a href="project-details.html?id=${p.id}" class="project-card__link">
          <div class="project-card__image">
            <img src="${p.image}" alt="" width="400" height="240" loading="lazy" />
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">${p.title}</h3>
            <p class="project-card__desc">${p.description}</p>
            <ul class="project-card__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
            <span class="project-card__cta">View case study →</span>
          </div>
        </a>
      </article>`,
      )
      .join('')

    // Re-observe new reveal elements
    container.querySelectorAll('.reveal').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      observer.observe(el)
    })
  }

  function init() {
    const grid = document.querySelector('#projects-grid')
    const filters = document.querySelectorAll('[data-filter]')
    if (!grid) return

    renderGrid(grid, PROJECTS)

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter
        filters.forEach((b) => b.classList.toggle('is-active', b === btn))

        const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
        renderGrid(grid, filtered)
      })
    })
  }

  return { init }
})()

export default Projects
