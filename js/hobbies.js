/**
 * Hobbies page — render hobby cards from shared data
 */
import { HOBBIES } from './hobbies-data.js'

function renderCardScene(id) {
  const scenes = {
    gaming: `
      <span class="hobby-card__scene hobby-card__scene--gaming" aria-hidden="true">
        <span class="hc-glow hc-glow--a"></span>
        <span class="hc-glow hc-glow--b"></span>
        <span class="hc-pixels"></span>
        <span class="hc-scan"></span>
      </span>`,
    hardware: `
      <span class="hobby-card__scene hobby-card__scene--hardware" aria-hidden="true">
        <span class="hc-grid"></span>
        <span class="hc-trace hc-trace--1"></span>
        <span class="hc-trace hc-trace--2"></span>
        <span class="hc-led hc-led--1"></span>
        <span class="hc-led hc-led--2"></span>
        <span class="hc-led hc-led--3"></span>
      </span>`,
    ai: `
      <span class="hobby-card__scene hobby-card__scene--ai" aria-hidden="true">
        <span class="hc-neural"></span>
        <span class="hc-node hc-node--1"></span>
        <span class="hc-node hc-node--2"></span>
        <span class="hc-node hc-node--3"></span>
        <span class="hc-node hc-node--4"></span>
        <span class="hc-pulse"></span>
      </span>`,
    cooking: `
      <span class="hobby-card__scene hobby-card__scene--cooking" aria-hidden="true">
        <span class="hc-warmth"></span>
        <span class="hc-steam hc-steam--1"></span>
        <span class="hc-steam hc-steam--2"></span>
        <span class="hc-steam hc-steam--3"></span>
        <span class="hc-ember"></span>
      </span>`,
    nature: `
      <span class="hobby-card__scene hobby-card__scene--nature" aria-hidden="true">
        <span class="hc-sky"></span>
        <span class="hc-hills"></span>
        <span class="hc-tree hc-tree--1"></span>
        <span class="hc-tree hc-tree--2"></span>
        <span class="hc-tree hc-tree--3"></span>
        <span class="hc-tree hc-tree--4"></span>
        <span class="hc-leaves"></span>
        <span class="hc-mist"></span>
      </span>`,
    traveling: `
      <span class="hobby-card__scene hobby-card__scene--traveling" aria-hidden="true">
        <span class="hc-aura"></span>
        <span class="hc-rays"></span>
        <span class="hc-orbs"></span>
      </span>`,
    fencing: `
      <span class="hobby-card__scene hobby-card__scene--fencing" aria-hidden="true">
        <span class="hc-piste"></span>
        <span class="hc-slash hc-slash--1"></span>
        <span class="hc-slash hc-slash--2"></span>
        <span class="hc-spark"></span>
      </span>`,
  }

  return scenes[id] || `<span class="hobby-card__scene" aria-hidden="true"></span>`
}

const Hobbies = (() => {
  function init() {
    const grid = document.querySelector('#hobbies-grid')
    if (!grid) return

    grid.innerHTML = HOBBIES.map(
      (hobby) => `
      <a
        href="hobby-details.html?id=${hobby.id}"
        class="hobby-card glass reveal hobby-card--${hobby.id}"
        data-tilt
      >
        ${renderCardScene(hobby.id)}
        <span class="hobby-card__body">
          <span class="hobby-card__icon" aria-hidden="true">${hobby.icon}</span>
          <h3>${hobby.title}</h3>
          <p>${hobby.summary}</p>
          <span class="hobby-card__cta">Learn more →</span>
        </span>
      </a>`,
    ).join('')
  }

  return { init }
})()

export default Hobbies
