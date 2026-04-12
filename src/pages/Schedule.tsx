import { useState } from 'react'
import './Schedule.css'

function Schedule() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    topic: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="schedule">
      <section className="schedule-hero">
        <h1>Schedule a Meeting</h1>
        <p className="schedule-lead">
          Take the first step toward financial peace. Pick a time that works for you.
        </p>
      </section>

      <section className="schedule-body">
        <div className="schedule-inner">
          <div className="schedule-sidebar">
            <h2>What to Expect</h2>
            <div className="expect-list">
              <div className="expect-item">
                <span className="expect-number">1</span>
                <div>
                  <h3>A Real Conversation</h3>
                  <p>No scripts or sales pitches. Evan will ask about your goals, your family, and what keeps you up at night financially.</p>
                </div>
              </div>
              <div className="expect-item">
                <span className="expect-number">2</span>
                <div>
                  <h3>Clear Next Steps</h3>
                  <p>You'll leave with a clear understanding of where you stand and what options make sense for your situation.</p>
                </div>
              </div>
              <div className="expect-item">
                <span className="expect-number">3</span>
                <div>
                  <h3>Zero Obligation</h3>
                  <p>This meeting is about you&mdash;not a close. If it's not the right fit, Evan will tell you that too.</p>
                </div>
              </div>
            </div>

            <div className="schedule-note">
              <p>Meetings are typically 30&ndash;45 minutes, in person or virtual.</p>
            </div>
          </div>

          <div className="schedule-form-wrap">
            {submitted ? (
              <div className="schedule-success">
                <span className="success-icon">&#10003;</span>
                <h3>Request Submitted</h3>
                <p>Thanks, {formData.name}. Evan will confirm your meeting within one business day.</p>
              </div>
            ) : (
              <>
                <h2>Request a Time</h2>
                <form className="schedule-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="topic">Topic</label>
                      <select id="topic" name="topic" value={formData.topic} onChange={handleChange} required>
                        <option value="">Select a topic...</option>
                        <option value="getting-started">Getting Started</option>
                        <option value="retirement">Retirement Planning</option>
                        <option value="education">Education Savings</option>
                        <option value="investment">Investment Review</option>
                        <option value="insurance">Insurance & Protection</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">Preferred Date</label>
                      <input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preferredTime">Preferred Time</label>
                      <select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required>
                        <option value="">Select a time...</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Anything else Evan should know?</label>
                    <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} />
                  </div>

                  <button type="submit" className="btn btn-gold">Request Meeting</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Schedule
