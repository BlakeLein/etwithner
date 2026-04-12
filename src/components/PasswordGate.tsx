import { useState } from 'react'
import './PasswordGate.css'

interface PasswordGateProps {
  onAuth: (password: string) => boolean
}

function PasswordGate({ onAuth }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!onAuth(password)) {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-icon">&#9833;</div>
        <h1>E.T. Withner</h1>
        <p className="gate-subtitle">Financial Advisory</p>
        <p className="gate-notice">This site is currently under development.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setError(false); setPassword(e.target.value) }}
            placeholder="Enter password"
            autoFocus
          />
          {error && <p className="gate-error">Incorrect password</p>}
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}

export default PasswordGate
