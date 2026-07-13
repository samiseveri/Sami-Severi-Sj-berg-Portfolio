export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <p className="hero__eyebrow">Software Developer · Designer · Builder</p>
      <h1 className="hero__title">
        Hi, I&apos;m <span className="hero__name">Sami-Severi Sjöberg</span>.
        <br />I build delightful things for the web.
      </h1>
      <p className="hero__subtitle">
        I craft fast, accessible, and thoughtfully designed products — from
        pixel-perfect interfaces to the systems that power them.
      </p>
      <div className="hero__actions">
        <a className="btn btn--primary" href="#projects">
          View my work
        </a>
        <a className="btn btn--ghost" href="#contact">
          Get in touch
        </a>
      </div>
    </section>
  )
}
