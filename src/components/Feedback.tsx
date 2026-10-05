import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { Bean, Ornament } from '../art/Art';

// Light feedback. On Netlify the form is stored there and emailed to the owner (the hidden copy of the
// form in index.html is how Netlify finds it). Anywhere else, the post is refused and the visitor is
// offered their own email app instead, so nothing is ever lost.
export default function Feedback() {
  const { feedback } = site;
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  function mailtoLink() {
    const lines = [
      message.trim(),
      '',
      rating > 0 ? `Rating: ${rating} of 5` : null,
      name.trim() !== '' ? `From: ${name.trim()}` : null,
    ].filter((line): line is string => line !== null);
    return `mailto:${feedback.to}?subject=${encodeURIComponent(`Feedback for ${site.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (message.trim() === '') {
      setError('Please write a few words first.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        'form-name': 'feedback',
        'bot-field': '',
        name: name.trim(),
        rating: rating > 0 ? String(rating) : '',
        message: message.trim(),
      });
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('not ok');
      setStatus('sent');
      setName('');
      setRating(0);
      setMessage('');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <section className="section dark" id="feedback">
      <div className="wrap narrow">
        <p className="kicker">Feedback</p>
        <h2 className="light">{feedback.title}</h2>
        <Ornament />
        <p className="lede light">{feedback.intro}</p>
        <form className="card-form" onSubmit={submit} noValidate>
          <label className="field">
            <span>Your name (optional)</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <fieldset className="rating">
            <legend>How was it?</legend>
            <div className="beans">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="bean">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <Bean filled={value <= rating} />
                  <span className="sr-only">{value} of 5</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>Your note</span>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={error !== ''} />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-ember" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send feedback'}
          </button>
          {status === 'sent' && (
            <p className="form-ok" role="status">
              Thank you! Your note is on its way.
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
