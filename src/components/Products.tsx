import { site, venmoUrl } from '../content/site';
import { Glass, Ornament } from '../art/Art';

export default function Products() {
  return (
    <section className="section tint" id="product">
      <div className="wrap">
        <p className="kicker">The brew</p>
        <h2>What we do best</h2>
        <Ornament />
        <div className="products">
          {site.products.map((product) => (
            <article key={product.id} className="product">
              {product.badge && <span className="ribbon">{product.badge}</span>}
              <div className="product-art">
                <Glass accent="var(--teal)" />
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
                <div className="product-actions">
                  <a className="btn btn-primary" href={venmoUrl} target="_blank" rel="noopener noreferrer">
                    Pay with Venmo
                  </a>
                  <a className="btn btn-ghost" href="#order">
                    How to order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
