/**
 * Hobby details page — populate from URL ?id=
 */
import { getHobbyById } from './hobbies-data.js'

const HobbyDetails = (() => {
  function init() {
    const root = document.querySelector('#hobby-detail')
    if (!root) return

    const params = new URLSearchParams(window.location.search)
    const id = params.get('id') || 'gaming'
    const hobby = getHobbyById(id)

    if (!hobby) {
      root.innerHTML =
        '<p class="section__subtitle">Hobby not found. <a href="hobbies.html">Back to hobbies</a></p>'
      return
    }

    document.title = `${hobby.title} — Sami-Severi Sjöberg`

    const imageSrc = hobby.image || ''
    const imageAlt = `${hobby.title} — photo`

    root.innerHTML = `
      <a href="hobbies.html" class="hobby-detail__back reveal">← All Hobbies</a>
      <div class="hobby-detail reveal">
        <div class="hobby-detail__content">
          <div class="hobby-detail__icon" aria-hidden="true">${hobby.icon}</div>
          <h1 class="hobby-detail__title">${hobby.title}</h1>
          <p class="hobby-detail__overview">${hobby.overview}</p>
          <div class="hobby-detail__features glass">
            <h2>Highlights</h2>
            <ul>${hobby.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
        <aside class="hobby-detail__media">
          <div class="hobby-detail__photo-frame is-empty">
            <img
              class="hobby-detail__photo"
              src="${imageSrc}"
              alt="${imageAlt}"
              width="480"
              height="600"
              loading="lazy"
            />
            <div class="hobby-detail__photo-fallback" aria-hidden="true">
              <span>${hobby.icon}</span>
              <p>Add your photo</p>
              <code>${imageSrc}</code>
            </div>
          </div>
        </aside>
      </div>
    `

    const img = root.querySelector('.hobby-detail__photo')
    const frame = root.querySelector('.hobby-detail__photo-frame')
    if (img && frame) {
      const showPhoto = () => {
        frame.classList.remove('is-empty')
        frame.classList.add('has-photo')
      }
      const showFallback = () => {
        frame.classList.add('is-empty')
        frame.classList.remove('has-photo')
      }

      img.addEventListener('error', showFallback)
      img.addEventListener('load', showPhoto)

      if (img.complete && img.naturalWidth > 0) showPhoto()
    }

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default HobbyDetails
