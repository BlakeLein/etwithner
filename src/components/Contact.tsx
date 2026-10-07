import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { Ornament } from '../art/Art';

// A simple contact form. On Netlify the form is stored there and emailed to the owner (the hidden copy of
// the form in index.html is how Netlify finds it). Anywhere else, the post is refused and the visitor is
// offered their own email app instead, so a message is never lost.
export default function Contact() {
  const { contact } = site;
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  function mailtoLink() {
    const lines = [message.trim(), '', `Reason: ${reason}`, `From: ${name.trim()} <${email.trim()}>`];
    return `mailto:${contact.to}?subject=${encodeURIComponent(`${reason}: message for ${site.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (reason === '' || name.trim() === '' || !/^\S+@\S+\.\S+$/.test(email.trim()) || message.trim() === '') {
      setError('Please choose a reason and add your name, a valid email, and a message.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': '',
        reason,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('not ok');
      setStatus('sent');
      setReason('');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <section className="section bold" id="contact">
      <div className="wrap narrow">
        <p className="kicker">Contact</p>
        <h2>{contact.title}</h2>
        <Ornament />
        <form className="card-form" onSubmit={submit} noValidate>
          <label className="field">
            <span>Reason for contact</span>
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="" disabled>
                Select a reason
              </option>
              {contact.reasons.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Your name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="field">
            <span>Your email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="field">
            <span>Your message</span>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={error !== ''} />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && (
            <p className="form-ok" role="status">
              Thank you! Your message is on its way.
            </p>
          )}
          {status === 'failed' && (
            <p className="form-error" role="alert">
              That did not go through. <a href={mailtoLink()}>Send it by email instead</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
