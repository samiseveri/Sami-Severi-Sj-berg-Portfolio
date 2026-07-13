import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <h2 className="section__title">Projects</h2>
      <div className="projects">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <h3 className="card__title">{p.title}</h3>
            <p className="card__desc">{p.description}</p>
            <ul className="card__tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="card__link" href={p.link} target="_blank" rel="noreferrer">
              Learn more →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
