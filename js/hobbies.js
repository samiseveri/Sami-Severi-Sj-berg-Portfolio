/**
 * Hobbies page — render hobby cards from shared data
 */
import { HOBBIES } from './hobbies-data.js'

const Hobbies = (() => {
  function init() {
    const grid = document.querySelector('#hobbies-grid')
    if (!grid) return

    grid.innerHTML = HOBBIES.map(
      (hobby) => `
      <a href="hobby-details.html?id=${hobby.id}" class="hobby-card glass reveal" data-tilt>
        <span class="hobby-card__icon" aria-hidden="true">${hobby.icon}</span>
        <h3>${hobby.title}</h3>
        <p>${hobby.summary}</p>
        <span class="hobby-card__cta">Learn more →</span>
      </a>`,
    ).join('')
  }

  return { init }
})()

export default Hobbies
