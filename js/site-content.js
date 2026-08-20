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
  initCvLinks()
  initProfileImages()
  initFooterYear()
}

export default { init, SITE }
