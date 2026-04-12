import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Jersey Village, TX</p>
          <h1>Financial Guidance<br />Rooted in Community</h1>
          <p className="hero-subtitle">
            Evan Withner brings the patience of an educator, the discipline of a musician,
            and the heart of a family man to every financial conversation.
          </p>
          <div className="hero-actions">
            <Link to="/schedule" className="btn btn-gold">Schedule a Meeting</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values-inner">
          <h2>Built on What Matters</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">&#9835;</span>
              <h3>Discipline & Harmony</h3>
              <p>
                Years of musical training taught Evan that mastery comes from consistency.
                He brings that same rhythm and structure to financial planning.
              </p>
            </div>
            <div className="value-card">
              <span className="value-icon">&#9998;</span>
              <h3>Education First</h3>
              <p>
                A former educator at heart, Evan believes in teaching&mdash;not
                selling. You'll understand every decision and why it matters for your family.
              </p>
            </div>
            <div className="value-card">
              <span className="value-icon">&#9751;</span>
              <h3>Community Roots</h3>
              <p>
                Deeply involved in Jersey Village, Evan isn't just an advisor&mdash;he's a
                neighbor invested in the same community you call home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to Find Your Financial Peace?</h2>
          <p>
            Whether you're just getting started or looking for a second opinion,
            Evan is here to listen and guide&mdash;no pressure, no jargon.
          </p>
          <Link to="/schedule" className="btn btn-gold">Let's Talk</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
