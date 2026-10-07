import { useState } from 'react';
import { gate } from './content/site';
import PasswordGate from './components/PasswordGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Products from './components/Products';
import Enjoy from './components/Enjoy';
import About from './components/About';
import Order from './components/Order';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';

// One page, top to bottom: hero, story, how to enjoy it, the product, about me, how to order, contact. All the words and links
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

  useScrollReveal(authenticated);

  if (!authenticated) return <PasswordGate onAuth={handleAuth} />;

  return (
    <>
      <a className="skip" href="#story">
        Skip to the content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Enjoy />
        <Products />
        <About />
        <Order />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
