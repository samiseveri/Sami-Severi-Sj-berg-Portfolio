/**
 * Hydrate contact details, CV links, and profile images from site-data.js
 */
import { SITE, encodeAssetPath } from './site-data.js'

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value
  })
}

function setHref(selector, href) {
  if (!href) return
  document.querySelectorAll(selector).forEach((el) => {
    el.setAttribute('href', href)
  })
}

function initContactDetails() {
  setText('[data-site-email-text]', SITE.email)
  setHref('[data-site-email]', SITE.emailHref)

  setText('[data-site-phone-text]', SITE.phone)
  setHref('[data-site-phone]', SITE.phoneHref)

  setText('[data-site-location]', SITE.location)

  setText('[data-site-linkedin-text]', SITE.linkedinLabel)
  setHref('[data-site-linkedin]', SITE.linkedin)

  setText('[data-site-github-text]', SITE.githubLabel)
  setHref('[data-site-github]', SITE.github)

  setText('[data-site-instagram-text]', SITE.instagramLabel)
  setHref('[data-site-instagram]', SITE.instagram)
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()
  const ok = document.execCommand('copy')
  input.remove()
  if (!ok) throw new Error('Copy command failed')
}

function initEmailCopy() {
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    let hideTimer = 0
    const feedback = btn
      .closest('.contact-info__meta')
      ?.querySelector('.contact-info__copied')

    const hideFeedback = () => {
      if (!feedback) return
      feedback.classList.remove('is-visible')
      window.setTimeout(() => {
        if (!feedback.classList.contains('is-visible')) {
          feedback.textContent = ''
        }
      }, 220)
    }

    const showFeedback = () => {
      if (!feedback) return
      feedback.textContent = 'Copied!'
      feedback.classList.add('is-visible')
      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(hideFeedback, 1600)
    }

    btn.addEventListener('click', async () => {
      const email = (btn.textContent || SITE.email).trim()
      if (!email) return

      try {
        await copyText(email)
        showFeedback()
      } catch {
        /* Keep silent on failure — no Copied! without a successful copy */
      }
    })
  })
}

function initCvLinks() {
  const encoded = encodeAssetPath(SITE.cvPath)
  document.querySelectorAll('[data-site-cv]').forEach((el) => {
    el.setAttribute('href', encoded)
    if (SITE.cvDownloadName) {
      el.setAttribute('download', SITE.cvDownloadName)
    }
  })
}

function initProfileImages() {
  document.querySelectorAll('[data-site-profile-image]').forEach((img) => {
    img.setAttribute('src', encodeAssetPath(SITE.profileImage))
    if (!img.getAttribute('alt')) {
      img.setAttribute('alt', `${SITE.name} — profile photo`)
    }
  })
}

function initFooterYear() {
  const year = String(new Date().getFullYear())
  document.querySelectorAll('.year, #year').forEach((el) => {
    el.textContent = year
  })
}

function init() {
  initContactDetails()
  initEmailCopy()
  initCvLinks()
  initProfileImages()
  initFooterYear()
}

export default { init, SITE }
