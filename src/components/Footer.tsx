import { site } from '../content/site';
import { PineIcon } from '../art/Art';

export default function Footer() {
  return (
    <footer className="footer">
      <PineIcon size={26} />
      <p className="footer-name">
        {site.name} <span>{site.descriptor}</span>
      </p>
      <p className="footer-note">{site.footer.note}</p>
      <p className="footer-copy">&copy; {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
