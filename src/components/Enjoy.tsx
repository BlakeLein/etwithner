import { site } from '../content/site';
import { Ornament } from '../art/Art';

export default function Enjoy() {
  const { enjoy } = site;
  return (
    <section className="section sun" id="enjoy">
      <div className="wrap">
        <p className="kicker">Serving</p>
        <h2>{enjoy.title}</h2>
        <Ornament />
        <ol className="enjoy-steps">
          {enjoy.steps.map((step, index) => (
            <li key={step}>
              <span className="step-num" aria-hidden="true">
                {index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <p className="enjoy-yield">{enjoy.yield}</p>
      </div>
    </section>
  );
}
