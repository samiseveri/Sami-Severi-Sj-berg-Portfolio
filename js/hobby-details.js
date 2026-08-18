/**
 * Hobby details page — populate from URL ?id=
 */
import { getHobbyById } from './hobbies-data.js'

const STEAM_LOGO_PATH = 'assets/images/steam-logo-png_seeklogo-290636.png'

const LINK_ICONS = {
  steam: `<img class="hobby-detail__steam-logo" src="${STEAM_LOGO_PATH}" width="36" height="36" alt="" aria-hidden="true" decoding="async" />`,
}

const CAROUSEL_NAV = {
  prev: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,
  next: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
}

function encodeImagePath(path) {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

async function loadGalleryImages(hobby) {
  if (hobby.gallery?.length) {
    return hobby.gallery.map(encodeImagePath)
  }

  if (hobby.galleryManifest) {
    try {
      const response = await fetch(hobby.galleryManifest)
      if (!response.ok) throw new Error('Gallery manifest not found')

      const data = await response.json()
      const folder = (data.folder || 'assets/images/hobbies').replace(/\/$/, '')

      return (data.images || []).map((name) =>
        encodeImagePath(`${folder}/${name}`),
      )
    } catch {
      /* fall back to single image */
    }
  }

  return hobby.image ? [encodeImagePath(hobby.image)] : []
}

function renderHobbyLinks(links) {
  if (!links?.length) return ''

  return `
    <div class="hobby-detail__links">
      ${links
        .map(
          (link) => `
        <a
          href="${link.href}"
          class="hobby-detail__link hobby-detail__link--${link.type}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="hobby-detail__link-icon">${LINK_ICONS[link.type] || ''}</span>
          <span class="hobby-detail__link-label">${link.label}</span>
        </a>`,
        )
        .join('')}
    </div>
  `
}

function renderCarousel(hobby, images) {
  return `
    <div class="hobby-carousel" data-carousel tabindex="0" aria-roledescription="carousel" aria-label="${hobby.title} gallery">
      <div class="hobby-carousel__viewport">
        <div class="hobby-carousel__track">
          ${images
            .map(
              (src, index) => `
            <figure
              class="hobby-carousel__slide${index === 0 ? ' is-active' : ''}"
              role="group"
              aria-roledescription="slide"
              aria-label="Slide ${index + 1} of ${images.length}"
              ${index === 0 ? '' : 'aria-hidden="true"'}
            >
              <img
                src="${src}"
                alt="${hobby.title} — photo ${index + 1}"
                width="480"
                height="600"
                loading="${index === 0 ? 'eager' : 'lazy'}"
                decoding="async"
              />
            </figure>`,
            )
            .join('')}
        </div>
      </div>
      <button type="button" class="hobby-carousel__nav hobby-carousel__nav--prev" aria-label="Previous image">
        ${CAROUSEL_NAV.prev}
      </button>
      <button type="button" class="hobby-carousel__nav hobby-carousel__nav--next" aria-label="Next image">
        ${CAROUSEL_NAV.next}
      </button>
      <p class="hobby-carousel__status sr-only" aria-live="polite"></p>
    </div>
  `
}

function renderSinglePhoto(hobby, imageSrc) {
  const imageAlt = `${hobby.title} — photo`

  return `
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
  `
}

function renderEmptyPhoto(hobby) {
  return `
    <div class="hobby-detail__photo-frame is-empty">
      <img class="hobby-detail__photo" src="" alt="" width="480" height="600" hidden />
      <div class="hobby-detail__photo-fallback" aria-hidden="true">
        <span>${hobby.icon}</span>
        <p>Add your photo</p>
        <code>${hobby.image || 'assets/images/hobbies/' + hobby.id + '.jpg'}</code>
      </div>
    </div>
  `
}

function renderMedia(hobby, images) {
  if (images.length > 1) {
    return renderCarousel(hobby, images)
  }

  if (images.length === 1) {
    return renderSinglePhoto(hobby, images[0])
  }

  return renderEmptyPhoto(hobby)
}

function initSinglePhoto(root) {
  const img = root.querySelector('.hobby-detail__photo')
  const frame = root.querySelector('.hobby-detail__photo-frame')
  if (!img || !frame) return

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

function initCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.hobby-carousel__slide')]
  const prevBtn = carousel.querySelector('.hobby-carousel__nav--prev')
  const nextBtn = carousel.querySelector('.hobby-carousel__nav--next')
  const status = carousel.querySelector('.hobby-carousel__status')
  const viewport = carousel.querySelector('.hobby-carousel__viewport')

  if (slides.length < 2) return

  let index = 0
  let isAnimating = false

  const updateSlide = (nextIndex) => {
    if (isAnimating || nextIndex === index) return

    isAnimating = true
    slides[index].classList.remove('is-active')
    slides[index].setAttribute('aria-hidden', 'true')

    index = nextIndex
    slides[index].classList.add('is-active')
    slides[index].setAttribute('aria-hidden', 'false')

    if (status) {
      status.textContent = `Showing slide ${index + 1} of ${slides.length}`
    }

    window.setTimeout(() => {
      isAnimating = false
    }, 500)
  }

  const goNext = () => updateSlide((index + 1) % slides.length)
  const goPrev = () => updateSlide((index - 1 + slides.length) % slides.length)

  prevBtn?.addEventListener('click', goPrev)
  nextBtn?.addEventListener('click', goNext)

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  })

  let touchStartX = 0
  viewport?.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].screenX
    },
    { passive: true },
  )

  viewport?.addEventListener(
    'touchend',
    (event) => {
      const touchEndX = event.changedTouches[0].screenX
      const delta = touchStartX - touchEndX

      if (Math.abs(delta) < 48) return
      if (delta > 0) goNext()
      else goPrev()
    },
    { passive: true },
  )
}

const HobbyDetails = (() => {
  async function init() {
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

    root.innerHTML = `
      <a href="hobbies.html" class="hobby-detail__back reveal">← All Hobbies</a>
      <div class="hobby-detail reveal">
        <div class="hobby-detail__content">
          <div class="hobby-detail__icon" aria-hidden="true">${hobby.icon}</div>
          <h1 class="hobby-detail__title">${hobby.title}</h1>
          <p class="hobby-detail__overview">${hobby.overview}</p>
          ${renderHobbyLinks(hobby.links)}
          <div class="hobby-detail__features glass">
            <h2>Highlights</h2>
            <ul>${hobby.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
        <aside class="hobby-detail__media">
          <div class="hobby-detail__media-loading glass" aria-hidden="true">
            <span>${hobby.icon}</span>
            <p>Loading gallery…</p>
          </div>
        </aside>
      </div>
    `

    const mediaRoot = root.querySelector('.hobby-detail__media')
    const images = await loadGalleryImages(hobby)

    mediaRoot.innerHTML = renderMedia(hobby, images)

    if (images.length > 1) {
      initCarousel(mediaRoot.querySelector('[data-carousel]'))
    } else {
      initSinglePhoto(mediaRoot)
    }

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default HobbyDetails
