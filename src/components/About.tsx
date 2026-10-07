import { site } from '../content/site';
import { Ornament } from '../art/Art';

export default function About() {
  const { about } = site;
  return (
    <section className="section white" id="about">
      <div className="wrap narrow">
        <p className="kicker">The maker</p>
        <h2>{about.title}</h2>
        <Ornament />
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="story-text">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
