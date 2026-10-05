import { site } from '../content/site';
import { ForestScene } from '../art/Art';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <p className="kicker">
          Small-batch cold brew{site.maker && ` by ${site.maker}`}
        </p>
        <h1>
          {site.name}
          <span className="hero-descriptor">{site.descriptor}</span>
        </h1>
        <p className="hero-tagline">{site.tagline}</p>
        <p className="hero-intro">{site.intro}</p>
        <div className="hero-actions">
          <a className="btn btn-ember" href="#brews">
            See the brews
          </a>
          <a className="btn btn-ghost" href="#order">
            How to order
          </a>
        </div>
      </div>
      <ForestScene style={{ position: 'absolute', inset: 'auto 0 0 0', width: '100%', height: '46%' }} />
    </section>
  );
}
