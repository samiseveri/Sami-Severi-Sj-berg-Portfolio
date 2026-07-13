/**
 * Navigation module — mobile menu, active links, sticky header, theme toggle
 */
const Navigation = (() => {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home', page: 'home' },
    { href: 'about.html', label: 'About', page: 'about' },
    { href: 'experience.html', label: 'Experience', page: 'experience' },
    { href: 'projects.html', label: 'Projects', page: 'projects' },
    { href: 'skills.html', label: 'Skills', page: 'skills' },
    { href: 'education.html', label: 'Education', page: 'education' },
    { href: 'hobbies.html', label: 'Hobbies', page: 'hobbies' },
    { href: 'contact.html', label: 'Contact', page: 'contact' },
  ]

  let navbar = null
  let toggle = null
  let drawer = null

  /** Determine current page from <body data-page> or URL */
  function getCurrentPage() {
    const fromBody = document.body.dataset.page
    if (fromBody) return fromBody

    const path = window.location.pathname.split('/').pop() || 'index.html'
    if (path === '' || path === '/') return 'home'
    return path.replace('.html', '')
  }

  /** Build nav link HTML */
  function linkHTML(link, isActive) {
    const cls = `navbar__link${isActive ? ' is-active' : ''}`
    return `<a href="${link.href}" class="${cls}" data-page="${link.page}">${link.label}</a>`
  }

  /** Inject navigation links into desktop and mobile containers */
  function renderLinks() {
    const current = getCurrentPage()
    const desktop = document.querySelector('.navbar__links--desktop')
    const mobile = document.querySelector('.navbar__drawer-links')

    const html = NAV_LINKS.map((l) => linkHTML(l, l.page === current)).join('')

    if (desktop) desktop.innerHTML = html
    if (mobile) mobile.innerHTML = html
  }

  /** Toggle mobile drawer */
  function toggleDrawer(forceClose = false) {
    const isOpen = drawer.classList.contains('is-open')
    const next = forceClose ? false : !isOpen

    drawer.classList.toggle('is-open', next)
    toggle.classList.toggle('is-open', next)
    toggle.setAttribute('aria-expanded', String(next))
    document.body.classList.toggle('no-scroll', next)
  }

  /** Sticky navbar background on scroll */
  function onScroll() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20)
  }

  /** Theme toggle with localStorage persistence */
  function initTheme() {
    const saved = localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const theme = saved || (prefersLight ? 'light' : 'dark')
    document.documentElement.setAttribute('data-theme', theme)

    const btn = document.querySelector('.theme-toggle')
    if (!btn) return

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme')
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
    })
  }

  /** Close drawer when a link is clicked */
  function bindDrawerLinks() {
    drawer?.addEventListener('click', (e) => {
      if (e.target.matches('.navbar__link')) toggleDrawer(true)
    })
  }

  /** Smooth scroll for same-page anchors */
  function bindSmoothScroll() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function init() {
    navbar = document.querySelector('.navbar')
    toggle = document.querySelector('.navbar__toggle')
    drawer = document.querySelector('.navbar__drawer')

    renderLinks()
    initTheme()
    bindDrawerLinks()
    bindSmoothScroll()

    toggle?.addEventListener('click', () => toggleDrawer())
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Close drawer on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) toggleDrawer(true)
    })
  }

  return { init, getCurrentPage }
})()

export default Navigation
