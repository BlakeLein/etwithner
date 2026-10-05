import { site } from '../content/site';
import { PineIcon } from '../art/Art';

export default function Navbar() {
  return (
    <header className="nav">
      <a className="nav-brand" href="#top" aria-label={`${site.name}, back to the top`}>
        <PineIcon size={22} />
        <span>{site.name}</span>
      </a>
      <nav aria-label="Sections">
        <a href="#brews">Brews</a>
        <a href="#order">Order</a>
        <a href="#feedback">Feedback</a>
      </nav>
    </header>
  );
}
