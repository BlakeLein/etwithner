import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { Ornament } from '../art/Art';
import { LIMITS, validateChoice, validateEmail, validateMessage, validateName } from '../lib/validate';

// A simple contact form. On Netlify the form is stored there and emailed to the owner (the hidden copy of
// the form in index.html is how Netlify finds it). Anywhere else, the post is refused and the visitor is
// offered their own email app instead, so a message is never lost.
export default function Contact() {
  const { contact } = site;
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  function mailtoLink() {
    const lines = [message.trim(), '', `Reason: ${reason}`, `From: ${name.trim()} <${email.trim()}>`];
    return `mailto:${contact.to}?subject=${encodeURIComponent(`${reason}: message for ${site.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const found = {
      reason: validateChoice(reason, 'Choose a reason.'),
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };
    setErrors(found);
    if (Object.values(found).some((text) => text !== '')) return;
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
            <select
              value={reason}
              aria-invalid={Boolean(errors.reason)}
              onChange={(e) => {
                setReason(e.target.value);
                setErrors((prev) => ({ ...prev, reason: '' }));
              }}
            >
              <option value="" disabled>
                Select a reason
              </option>
              {contact.reasons.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.reason && <em className="field-error">{errors.reason}</em>}
          </label>
          <label className="field">
            <span>Your name</span>
            <input
              type="text"
              value={name}
              maxLength={LIMITS.name}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: '' }));
              }}
            />
            {errors.name && <em className="field-error">{errors.name}</em>}
          </label>
          <label className="field">
            <span>Your email</span>
            <input
              type="email"
              value={email}
              maxLength={LIMITS.email}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
            />
            {errors.email && <em className="field-error">{errors.email}</em>}
          </label>
          <label className="field">
            <span>Your message</span>
            <textarea
              rows={5}
              value={message}
              maxLength={LIMITS.message}
              aria-invalid={Boolean(errors.message)}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors((prev) => ({ ...prev, message: '' }));
              }}
            />
            {errors.message && <em className="field-error">{errors.message}</em>}
          </label>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className="privacy-note">{site.privacy}</p>
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
