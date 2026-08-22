import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // RAF Animation Frame Loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global interceptor for smooth anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Check for local anchor or /#anchor
      if (href.startsWith('#') || (href.startsWith('/#') && window.location.pathname === '/')) {
        const id = href.replace('/#', '').replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem, {
            offset: -70,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Scroll to hash on route load if present
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          lenis.scrollTo(elem, { offset: -70, duration: 1.0 });
        }
      }, 100);
    }

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Handle route change scroll to top or target hash
  useEffect(() => {
    if (!window.lenis) return;
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const elem = document.getElementById(id);
      if (elem) {
        window.lenis.scrollTo(elem, { offset: -70, duration: 1.0 });
      }
    } else {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash]);

  return null;
};

export default SmoothScroll;
