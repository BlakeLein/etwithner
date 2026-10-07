import { site } from '../content/site';
import { Glass, Jug, Ornament } from '../art/Art';

// A different label color on each card, so the lineup is easy to tell apart.
const ACCENTS = ['var(--teal)', 'var(--yellow)', 'var(--coral)'];

export default function Products() {
  return (
    <section className="section tint" id="brews">
      <div className="wrap">
        <p className="kicker">The brews</p>
        <h2>What we pour</h2>
        <Ornament />
        <div className="products">
          {site.products.map((product, index) => (
            <article key={product.id} className="product">
              {product.badge && <span className="ribbon">{product.badge}</span>}
              <div className="product-art">
                {product.art === 'jug' ? (
                  <Jug accent={ACCENTS[index % ACCENTS.length]} />
                ) : (
                  <Glass accent={ACCENTS[index % ACCENTS.length]} />
                )}
              </div>
              <div className="product-body">
                <h3>{product.name}</h3>
                <p className="product-tagline">{product.tagline}</p>
                <ul className="notes" aria-label="Tasting notes">
                  {product.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <div className="product-foot">
                  <span className="size">{product.size}</span>
                  <span className="price">{product.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="center-note">
          <a className="btn btn-primary" href="#order">
            Ready to order
          </a>
        </p>
      </div>
    </section>
  );
}
