// Motion: Lenis smooth scrolling + GSAP reveals, sharing one animation loop.
// Rules (CLAUDE.md): animate only transform and opacity; respect
// prefers-reduced-motion; do not hurt LCP.
//
// Start states live in global.css under `html.motion`, which an inline
// script in BaseLayout adds before first paint (no flash). That script
// removes `motion` again after 3s if this file never runs.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && root.classList.contains('motion')) {
  root.classList.add('motion-ready');
  gsap.registerPlugin(ScrollTrigger);

  // One loop: GSAP's ticker drives Lenis, Lenis updates ScrollTrigger.
  const lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Same-page links (e.g. "Book a consultation" -> /#enquiry): scroll
  // smoothly and move keyboard focus to the target.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.pathname !== location.pathname || !link.hash) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    // Lenis honours the target's CSS scroll-margin-top, which already
    // leaves room for the header (see EnquiryForm.astro).
    lenis.scrollTo(target);
    history.pushState(null, '', link.hash);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  const ease = 'power3.out';

  // Hero: eases up on load, staggered, about 1s in total.
  gsap.to('[data-reveal-hero]', { y: 0, opacity: 1, duration: 0.9, ease, stagger: 0.1 });

  // Sections and cards reveal as they scroll into view.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease, stagger: 0.1 }),
  });
  ScrollTrigger.batch('[data-reveal-card]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.8, ease, stagger: 0.07 }),
  });
}
