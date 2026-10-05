import { site } from '../content/site';
import { Ornament } from '../art/Art';

export default function Story() {
  const { story } = site;
  return (
    <section className="section paper" id="story">
      <div className="wrap narrow">
        <p className="kicker kicker-dark">Our brew</p>
        <h2>{story.title}</h2>
        <Ornament />
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph} className="story-text">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="wrap highlights">
        {story.highlights.map((item) => (
          <div key={item.title} className="highlight">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
