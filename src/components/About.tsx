import { skills } from '../data/skills'

export default function About() {
  return (
    <section className="section" id="about">
      <h2 className="section__title">About</h2>
      <div className="about">
        <p className="about__lead">
          I&apos;m a developer who loves the whole journey — from a rough sketch
          on paper to a polished product in people&apos;s hands. I care deeply
          about performance, accessibility, and the small details that make
          software feel effortless.
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me exploring the outdoors,
          experimenting with design systems, or contributing to open source.
        </p>
        <ul className="skills" aria-label="Skills">
          {skills.map((s) => (
            <li key={s} className="skills__chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
