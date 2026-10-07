import { site } from '../content/site';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div>
          <p className="kicker">Small-batch cold brew</p>
          <h1>
            {site.name}
            <span className="hero-descriptor">{site.descriptor}</span>
          </h1>
          <p className="hero-tagline">{site.tagline}</p>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#brews">
              See the brews
            </a>
            <a className="btn btn-ghost" href="#order">
              How to order
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
