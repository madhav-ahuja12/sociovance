import { useEffect, useRef, useState } from 'react';

/**
 * Premium light-theme custom cursor
 * – Soft emerald/mint glow ring with lerp-interpolated motion
 * – Magnetic expansion on interactive elements
 * – Respects prefers-reduced-motion & touch devices
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  const mouse  = useRef({ x: -100, y: -100 });
  const dot    = useRef({ x: -100, y: -100 });
  const ring   = useRef({ x: -100, y: -100 });
  const rafId  = useRef(null);

  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [clicking, setClicking] = useState(false);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const isTouch = useRef(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  useEffect(() => {
    if (prefersReduced.current || isTouch.current) return;

    // Activate CSS: hides native cursor
    document.documentElement.classList.add('custom-cursor-active');

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      dot.current.x  = lerp(dot.current.x,  mouse.current.x, 0.22);
      dot.current.y  = lerp(dot.current.y,  mouse.current.y, 0.22);
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.10);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.10);

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const onMove  = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; setVisible(true); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';
    const onHoverIn  = (e) => { if (e.target.closest(INTERACTIVE)) setHovered(true);  };
    const onHoverOut = (e) => { if (e.target.closest(INTERACTIVE)) setHovered(false); };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseover',  onHoverIn,  { passive: true });
    document.addEventListener('mouseout',   onHoverOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseover',  onHoverIn);
      document.removeEventListener('mouseout',   onHoverOut);
    };
  }, []);

  if (prefersReduced.current || isTouch.current) return null;

  return (
    <>
      {/* Inner dot — snappy */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{ opacity: visible ? (clicking ? 0.5 : 0.85) : 0 }}
      />
      {/* Outer glow ring — trailing, magnetic */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`custom-cursor-ring${hovered ? ' is-hovered' : ''}${clicking ? ' is-clicking' : ''}`}
        style={{ opacity: visible ? (hovered ? 0.55 : 0.18) : 0 }}
      />
    </>
  );
};

export default CustomCursor;
