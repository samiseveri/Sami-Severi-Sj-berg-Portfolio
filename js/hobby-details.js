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

      return (data.images || []).map((name) => encodeImagePath(`${folder}/${name}`))
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

function renderHobbyCTA(cta) {
  if (!cta?.href || !cta?.label) return ''

  return `
    <a
      href="${cta.href}"
      class="hobby-detail__link hobby-detail__link--amma hobby-detail__cta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${cta.label} (opens in a new tab)"
    >
      <span class="hobby-detail__link-icon" aria-hidden="true">
        <svg class="hobby-detail__amma-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
          <path d="M21 14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7" />
        </svg>
      </span>
      <span class="hobby-detail__link-label">${cta.label}</span>
    </a>
  `
}

function renderCarousel(hobby, images) {
  const fitClass = hobby.imageFit === 'contain' ? ' hobby-carousel--contain' : ''
  return `
    <div class="hobby-carousel${fitClass}" data-carousel tabindex="0" aria-roledescription="carousel" aria-label="${hobby.title} gallery">
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
  const frameClass = hobby.imageFit === 'contain' ? ' hobby-detail__photo-frame--fit' : ''

  return `
    <div class="hobby-detail__photo-frame${frameClass}">
      <img
        class="hobby-detail__photo"
        src="${imageSrc}"
        alt="${imageAlt}"
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

const TOOL_ICONS = {
  cursor: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M9 8.5 22.5 14.2l-5.2 2.1-2.1 5.2L9 8.5Z" fill="currentColor"/><path d="m15.8 17.4 5.7 5.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  claude: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M16 7.5 17.8 13h5.7l-4.6 3.4 1.8 5.5L16 18.6l-4.7 3.3 1.8-5.5-4.6-3.4h5.7L16 7.5Z" fill="currentColor"/></svg>`,
  copilot: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M11 12.5c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v1.2c1.7.5 3 2.1 3 4v1.3c0 1.5-1.2 2.7-2.7 2.7h-.6c-.8 1.5-2.4 2.5-4.2 2.5h-1c-1.8 0-3.4-1-4.2-2.5h-.6C9.2 21.7 8 20.5 8 19v-1.3c0-1.9 1.3-3.5 3-4V12.5Z" stroke="currentColor" stroke-width="1.7"/><circle cx="13.2" cy="14.2" r="1.1" fill="currentColor"/><circle cx="18.8" cy="14.2" r="1.1" fill="currentColor"/></svg>`,
  chatgpt: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M16.8 8.2a4.4 4.4 0 0 1 4.3 5.3 4.4 4.4 0 0 1 2.2 6.1 4.4 4.4 0 0 1-5.5 2.2 4.4 4.4 0 0 1-6.1 2.2 4.4 4.4 0 0 1-2.2-6.1A4.4 4.4 0 0 1 7.3 13a4.4 4.4 0 0 1 5.5-2.2 4.4 4.4 0 0 1 4-2.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
}

function renderToolsPanel(hobby) {
  const panel = hobby.toolsPanel
  if (!panel?.tools?.length) return ''

  return `
    <section class="hobby-tools glass" aria-labelledby="hobby-tools-title">
      <header class="hobby-tools__header">
        <p class="hobby-tools__eyebrow">Toolkit</p>
        <h2 id="hobby-tools-title" class="hobby-tools__title">${panel.title}</h2>
        <p class="hobby-tools__lead">Different tools for different jobs — coding-focused assistants alongside broader research and writing support.</p>
      </header>
      <ul class="hobby-tools__list">
        ${panel.tools
          .map(
            (tool) => `
          <li class="hobby-tools__item hobby-tools__item--${tool.id}">
            <span class="hobby-tools__icon" aria-hidden="true">${TOOL_ICONS[tool.id] || ''}</span>
            <span class="hobby-tools__body">
              <span class="hobby-tools__meta">
                <span class="hobby-tools__name">${tool.name}</span>
                ${tool.badge ? `<span class="hobby-tools__badge">${tool.badge}</span>` : ''}
                <span class="hobby-tools__category">${tool.category}</span>
              </span>
              <span class="hobby-tools__desc">${tool.description}</span>
            </span>
          </li>`,
          )
          .join('')}
      </ul>
    </section>
  `
}

function renderMedia(hobby, images) {
  if (hobby.toolsPanel?.tools?.length) {
    return renderToolsPanel(hobby)
  }

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
  const isContainVariant = carousel.classList.contains('hobby-carousel--contain')

  if (slides.length < 2) return

  let index = 0
  let isAnimating = false

  const setViewportAspectRatioFromSlideImage = (slide) => {
    if (!isContainVariant || !viewport) return

    const img = slide?.querySelector('img')
    if (!img) return

    const apply = () => {
      const { naturalWidth: w, naturalHeight: h } = img
      if (w > 0 && h > 0) {
        viewport.style.aspectRatio = `${w} / ${h}`
      }
    }

    if (img.complete && img.naturalWidth > 0) apply()
    else img.addEventListener('load', apply, { once: true })
  }

  // Ensure the first (eager) slide uses its real aspect ratio.
  setViewportAspectRatioFromSlideImage(slides[0])

  const updateSlide = (nextIndex) => {
    if (isAnimating || nextIndex === index) return

    isAnimating = true
    slides[index].classList.remove('is-active')
    slides[index].setAttribute('aria-hidden', 'true')

    index = nextIndex
    slides[index].classList.add('is-active')
    slides[index].setAttribute('aria-hidden', 'false')

    setViewportAspectRatioFromSlideImage(slides[index])

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
          ${renderHobbyCTA(hobby.cta)}
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

    if (hobby.toolsPanel?.tools?.length) {
      mediaRoot.innerHTML = renderToolsPanel(hobby)
    } else {
      const images = await loadGalleryImages(hobby)
      mediaRoot.innerHTML = renderMedia(hobby, images)

      if (images.length > 1) {
        initCarousel(mediaRoot.querySelector('[data-carousel]'))
      } else {
        initSinglePhoto(mediaRoot)
      }
    }

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default HobbyDetails
