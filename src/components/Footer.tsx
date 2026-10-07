import { site } from '../content/site';
import { LogoIcon } from '../art/Art';

export default function Footer() {
  return (
    <footer className="footer">
      <LogoIcon height={44} />
      <p className="footer-name">
        {site.name} <span>{site.descriptor}</span>
      </p>
      <p className="footer-tag">{site.footer.tag}</p>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} {site.name}
        {site.maker && ` · ${site.maker}`}
      </p>
      {site.footer.credit.name && (
        <p className="footer-credit">
          {site.footer.credit.text}{' '}
          <a href={site.footer.credit.url} target="_blank" rel="noopener noreferrer">
            {site.footer.credit.name}
          </a>
        </p>
      )}
    </footer>
  );
}
