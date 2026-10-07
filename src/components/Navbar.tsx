import { site } from '../content/site';
import { LogoIcon } from '../art/Art';

export default function Navbar() {
  return (
    <>
      {site.announcement && <p className="announce">{site.announcement}</p>}
      <header className="nav">
        <a className="nav-brand" href="#top" aria-label={`${site.name}, back to the top`}>
          <LogoIcon height={38} />
          <span className="logo-word">{site.name}</span>
        </a>
        <nav aria-label="Sections">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#order">Order</a>
        </nav>
      </header>
    </>
  );
}
