import { useState } from 'react';
import { gate } from './content/site';
import PasswordGate from './components/PasswordGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Products from './components/Products';
import Order from './components/Order';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

// One page, top to bottom: hero, story, the brews, how to order, feedback. All the words and links
// are in src/content/site.ts.
export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => !gate.enabled || sessionStorage.getItem(gate.storageKey) === 'true',
  );

  function handleAuth(password: string): boolean {
    if (password !== gate.password) return false;
    sessionStorage.setItem(gate.storageKey, 'true');
    setAuthenticated(true);
    return true;
  }

  if (!authenticated) return <PasswordGate onAuth={handleAuth} />;

  return (
    <>
      <a className="skip" href="#brews">
        Skip to the brews
      </a>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Products />
        <Order />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
