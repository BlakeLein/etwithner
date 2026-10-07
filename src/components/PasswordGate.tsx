import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { LogoIcon } from '../art/Art';

// The "under development" password page (see `gate` in src/content/site.ts).
export default function PasswordGate({ onAuth }: { onAuth: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!onAuth(password)) {
      setError(true);
      setPassword('');
    }
  }

  return (
    <main className="gate">
      <form className="gate-card" onSubmit={submit}>
        <LogoIcon height={52} />
        <h1 className="logo-word">{site.name}</h1>
        <p className="gate-sub">{site.descriptor}</p>
        <p className="gate-note">This site is currently under development.</p>
        <label className="sr-only" htmlFor="gate-password">
          Password
        </label>
        <input
          id="gate-password"
          type="password"
          value={password}
          autoFocus
          placeholder="Enter password"
          onChange={(e) => {
            setError(false);
            setPassword(e.target.value);
          }}
          aria-invalid={error}
        />
        {error && (
          <p className="gate-error" role="alert">
            Incorrect password
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Enter
        </button>
      </form>
    </main>
  );
}
