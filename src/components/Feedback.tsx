import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { Bean, Ornament } from '../art/Art';

// Light feedback with no server: the form fills in an email to the owner and opens the visitor's own
// email app, so nothing is stored or processed here.
export default function Feedback() {
  const { feedback } = site;
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (message.trim() === '') {
      setError('Please write a few words first.');
      setOpened(false);
      return;
    }
    setError('');
    const lines = [
      message.trim(),
      '',
      rating > 0 ? `Rating: ${rating} of 5` : null,
      name.trim() !== '' ? `From: ${name.trim()}` : null,
    ].filter((line): line is string => line !== null);
    const subject = encodeURIComponent(`Feedback for ${site.name}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${feedback.to}?subject=${subject}&body=${body}`;
    setOpened(true);
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
          <button type="submit" className="btn btn-ember">
            Send feedback
          </button>
          {opened && (
            <p className="form-ok" role="status">
              Your email app should open with your note ready to send. If it does not, write to{' '}
              <a href={`mailto:${feedback.to}`}>{feedback.to}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
