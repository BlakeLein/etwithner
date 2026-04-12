import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Evan</h1>
        <p className="about-lead">
          Musician. Educator. Family man. Financial advisor.
        </p>
      </section>

      <section className="about-story">
        <div className="about-inner">
          <div className="about-text">
            <h2>A Different Kind of Advisor</h2>
            <p>
              Before Evan Withner ever read a balance sheet, he was reading sheet music.
              A trained musician and former educator, Evan spent years in the classroom
              learning what most advisors never do: how to meet people where they are,
              break down complex ideas, and build trust through patience.
            </p>
            <p>
              That background shapes everything about how he works today. Financial
              planning doesn't have to be intimidating or inaccessible. Evan believes
              that when people truly understand their money, they make better
              decisions&mdash;and find real peace.
            </p>
          </div>

          <div className="about-text">
            <h2>Rooted in Jersey Village</h2>
            <p>
              Evan isn't just an advisor who happens to work in Jersey Village&mdash;he's
              woven into the fabric of this community. As a family man raising his own
              kids here, he understands the real financial questions local families face:
              saving for education, planning for retirement, protecting what matters most.
            </p>
            <p>
              His deep involvement in the community means when you sit down with Evan,
              you're not talking to a stranger. You're talking to a neighbor who genuinely
              cares about the future of this town and the families in it.
            </p>
          </div>

          <div className="about-text">
            <h2>The Educator's Approach</h2>
            <p>
              Evan's philosophy is simple: education before action. He won't push products
              or rush you into decisions. Instead, he'll take the time to teach you the
              "why" behind every recommendation, so you feel confident and in control.
            </p>
            <p>
              Like a good teacher, he listens first. Like a good musician, he knows that
              timing matters. And like a good neighbor, he'll always tell you the truth.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values-inner">
          <h2>What Guides the Work</h2>
          <div className="about-values-grid">
            <div className="about-value">
              <h3>Clarity Over Complexity</h3>
              <p>Financial plans should be understood, not just followed.</p>
            </div>
            <div className="about-value">
              <h3>Family First</h3>
              <p>Every strategy starts with what matters most to your household.</p>
            </div>
            <div className="about-value">
              <h3>Long-Term Thinking</h3>
              <p>No shortcuts, no chasing trends&mdash;just steady, disciplined growth.</p>
            </div>
            <div className="about-value">
              <h3>Local Trust</h3>
              <p>Accountability that comes from living in the same community you serve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Let's Start a Conversation</h2>
        <p>No pressure, no jargon&mdash;just an honest discussion about your goals.</p>
        <Link to="/schedule" className="btn btn-gold">Schedule a Meeting</Link>
      </section>
    </div>
  )
}

export default About
