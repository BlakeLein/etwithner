import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-icon">&#9833;</span>
          <div>
            <span className="footer-name">E.T. Withner</span>
            <span className="footer-tagline">Financial Advisory</span>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/schedule">Schedule Meeting</Link>
        </div>

        <div className="footer-bottom">
          <p>Rooted in Jersey Village, TX &mdash; Serving families with clarity and care.</p>
          <p className="footer-copy">&copy; {new Date().getFullYear()} E.T. Withner Financial Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
