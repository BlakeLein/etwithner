import { site } from '../content/site';
import { Ornament } from '../art/Art';

export default function Order() {
  const { order } = site;
  // A link with no address is left off.
  const links = order.links.filter((link) => link.url.trim() !== '');
  return (
    <section className="section paper" id="order">
      <div className="wrap">
        <p className="kicker kicker-dark">Order</p>
        <h2>{order.title}</h2>
        <Ornament />
        <p className="lede">{order.intro}</p>
        <ol className="steps">
          {order.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-num" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="links">
          {links.map((link) => (
            <a
              key={link.id}
              className="link-card"
              href={link.url}
              {...(link.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="link-label">{link.label}</span>
              <span className="link-desc">{link.description}</span>
              <span className="link-go" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
