import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import './App.css'

const SITE_PASSWORD = 'etwithner2026'

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('etwithner_auth') === 'true'
  })

  const handleAuth = (password: string): boolean => {
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem('etwithner_auth', 'true')
      setAuthenticated(true)
      return true
    }
    return false
  }

  if (!authenticated) {
    return <PasswordGate onAuth={handleAuth} />
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
