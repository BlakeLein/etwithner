import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p className="contact-lead">
          Questions, thoughts, or just want to say hello&mdash;Evan would love to hear from you.
        </p>
      </section>

      <section className="contact-body">
        <div className="contact-inner">
          <div className="contact-info">
            <h2>Reach Out Directly</h2>

            <div className="contact-detail">
              <span className="contact-label">Location</span>
              <p>Jersey Village, TX</p>
            </div>

            <div className="contact-detail">
              <span className="contact-label">Email</span>
              <p>evan@etwithner.com</p>
            </div>

            <div className="contact-detail">
              <span className="contact-label">Availability</span>
              <p>Monday &ndash; Friday, 9am &ndash; 5pm CST</p>
            </div>

            <div className="contact-note">
              <p>
                Evan responds personally to every inquiry. Whether you're a long-time
                Jersey Village resident or new to the area, he's happy to connect.
              </p>
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">&#10003;</span>
                <h3>Message Received</h3>
                <p>Thank you, {formData.name}. Evan will be in touch soon.</p>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">How can Evan help?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-gold">Send Message</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
