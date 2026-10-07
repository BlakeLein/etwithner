import { useEffect } from 'react';

// Fades and lifts each part of the page into view as it scrolls on screen. Items inside a grid (the
// product cards, steps, and so on) arrive one after another. Does nothing when the visitor prefers
// reduced motion, so everything is simply visible. Styles are under "Scroll reveal" in index.css.
const GRIDS = '.products';

export default function useScrollReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.section .wrap > *')).flatMap((el) =>
      el.matches(GRIDS) ? (Array.from(el.children) as HTMLElement[]) : [el],
    );

    const cleanups: Array<() => void> = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    for (const el of targets) {
      const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
      el.style.setProperty('--i', String(index));
      // Hide it first with no transition (so it doesn't fade out), then switch the transition on.
      el.classList.add('reveal');
      void el.offsetWidth;
      el.classList.add('reveal-ready');
      // Once it has faded in, hand the element back to its normal styles (hover effects and so on).
      const done = (event: TransitionEvent) => {
        if (event.propertyName !== 'opacity' || !el.classList.contains('revealed')) return;
        el.classList.remove('reveal', 'reveal-ready', 'revealed');
        el.style.removeProperty('--i');
        el.removeEventListener('transitionend', done);
      };
      el.addEventListener('transitionend', done);
      cleanups.push(() => {
        el.removeEventListener('transitionend', done);
        el.classList.remove('reveal', 'reveal-ready', 'revealed');
        el.style.removeProperty('--i');
      });
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [enabled]);
}
