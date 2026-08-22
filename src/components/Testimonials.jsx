import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion, useInView, useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Growth stories data
───────────────────────────────────────────────────────────────── */
const stories = [
  {
    name: 'Riya Sharma',
    role: 'Fashion Creator · Instagram',
    metric: '1.2M → 2.8M',
    metricLabel: 'Followers in 8 months',
    quote:
      'Sociovance completely transformed my career. Within 6 months, my brand deal revenue tripled and my follower count doubled. They truly understand the creator economy.',
    initials: 'RS',
    accentColor: '#7C3AED',
    accentBg: '#EDE7F9',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'Tech Reviewer · YouTube',
    metric: '800K → 2.1M',
    metricLabel: 'Subscribers in 11 months',
    quote:
      "The team at Sociovance helped me secure deals with brands I never thought would approach me. Their negotiation skills and industry connections are unmatched.",
    initials: 'AM',
    accentColor: '#EC4899',
    accentBg: '#FCE7F3',
    rating: 5,
  },
  {
    name: 'Priya Kapoor',
    role: 'Brand Manager · NutriGlow',
    metric: '8× ROI',
    metricLabel: 'Return on influencer spend',
    quote:
      "We worked with Sociovance for our product launch campaign. The ROI was phenomenal — 8x return on our influencer marketing spend. Professional and results-driven.",
    initials: 'PK',
    accentColor: '#F97316',
    accentBg: '#FEF3E7',
    rating: 5,
  },
  {
    name: 'Vikram Das',
    role: 'Fitness Creator · Instagram',
    metric: '4× Revenue',
    metricLabel: 'Monthly income growth',
    quote:
      "From content strategy to brand partnerships — they handle everything while I focus on creating. My monthly revenue has grown 4x in less than a year with Sociovance.",
    initials: 'VD',
    accentColor: '#8B5CF6',
    accentBg: '#F3E8FF',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'Food Creator · YouTube Shorts',
    metric: '45M+',
    metricLabel: 'Monthly views achieved',
    quote:
      "Sociovance's content strategy helped my reels go viral consistently. They understand trends, algorithms, and what audiences actually want to see — every single time.",
    initials: 'SR',
    accentColor: '#DB2777',
    accentBg: '#FDF2F8',
    rating: 5,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Cylinder / orbital arc math
   ─ N cards arranged on a circular arc
   ─ STEP_DEG = angular gap between adjacent cards
   ─ PERIOD   = full cycle in degrees (N × STEP)
   ─ RADIUS   = invisible cylinder radius in px
   ─ computeTheta normalises each card's angle to [-PERIOD/2, PERIOD/2]
     so the "opposite" half of the ring folds back and appears on the
     correct side — this is what produces seamless circular wrap-around.
───────────────────────────────────────────────────────────────── */
const N          = stories.length;   // 5
const STEP_DEG   = 20;               // degrees between adjacent slots
const PERIOD     = N * STEP_DEG;     // 100°  — full rotation cycle
const RADIUS     = 760;              // cylinder radius px
const CARD_W     = 310;              // card width px
const CARD_H     = 400;              // card height px
const DRAG_RATIO = 3.5;             // px of drag per 1° of rotation

const toRad = (d) => d * Math.PI / 180;

/**
 * Maps card index + current wheel rotation → normalised arc angle in
 * degrees, centred at 0 (front-facing).  The period-based normalisation
 * is the key step that makes cards "wrap around" the cylinder.
 */
const computeTheta = (cardIdx, wheelRot) => {
  const raw = cardIdx * STEP_DEG - wheelRot;
  // Normalise raw angle to [-PERIOD/2, +PERIOD/2]
  return ((raw % PERIOD) + 1.5 * PERIOD) % PERIOD - 0.5 * PERIOD;
};

/* ─────────────────────────────────────────────────────────────────
   Custom hook — derives all 3-D transform values for one card from
   the shared spring MotionValue.  Because each card is a separate
   React component instance, calling this hook per-card is legal.
───────────────────────────────────────────────────────────────── */
function useCylinderCard(cardIdx, springAngle) {
  /* x — horizontal position on the arc */
  const x = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    return RADIUS * Math.sin(toRad(θ));
  });

  /* z — depth on the cylinder (translateZ) */
  const z = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    return RADIUS * (Math.cos(toRad(θ)) - 1); // 0 at front, negative going back
  });

  /* rotateY — face toward the viewer as they approach centre */
  const rotateY = useTransform(springAngle, (w) => -computeTheta(cardIdx, w));

  /* scale — quadratic falloff: 1.0 at 0°, 0.72 at ±50° */
  const scale = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    const t = θ / (PERIOD / 2); // normalised [-1, 1]
    return Math.max(0.72, 1 - 0.28 * t * t);
  });

  /* opacity — power-law falloff for a smooth depth-fade */
  const opacity = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    const absT = Math.abs(θ) / (PERIOD / 2);
    return Math.max(0.35, 1 - 0.65 * Math.pow(absT, 1.5));
  });

  /* blur — only kicks in beyond 45% of the half-period */
  const blurFilter = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    const absRatio = Math.abs(θ) / (PERIOD / 2);
    const blurPx = Math.max(0, (absRatio - 0.45) * 5.5);
    return `blur(${blurPx.toFixed(2)}px)`;
  });

  /* zIndex — front card always on top */
  const zIndex = useTransform(springAngle, (w) => {
    const θ = computeTheta(cardIdx, w);
    return Math.round((1 - Math.abs(θ) / (PERIOD / 2)) * 10 + 1);
  });

  return { x, z, rotateY, scale, opacity, blurFilter, zIndex };
}

/* ─────────────────────────────────────────────────────────────────
   CylinderCard — a single orbital card
───────────────────────────────────────────────────────────────── */
const CylinderCard = React.memo(
  ({ story, cardIndex, springAngle, isActive, onNavigate }) => {
    const { x, z, rotateY, scale, opacity, blurFilter, zIndex } =
      useCylinderCard(cardIndex, springAngle);

    /* 3-D tilt — active card only */
    const tiltRef = useRef(null);
    const tiltMX  = useMotionValue(0);
    const tiltMY  = useMotionValue(0);
    const tiltRX  = useSpring(tiltMX, { stiffness: 200, damping: 28 });
    const tiltRY  = useSpring(tiltMY, { stiffness: 200, damping: 28 });

    const handleMouseMove = useCallback(
      (e) => {
        if (!isActive || !tiltRef.current) return;
        const r  = tiltRef.current.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width  - 0.5;
        const ny = (e.clientY - r.top)  / r.height - 0.5;
        tiltMX.set(ny *  7);
        tiltMY.set(nx * -7);
      },
      [isActive, tiltMX, tiltMY],
    );

    const handleMouseLeave = useCallback(() => {
      tiltMX.set(0);
      tiltMY.set(0);
    }, [tiltMX, tiltMY]);

    return (
      <motion.div
        style={{
          position:       'absolute',
          width:           CARD_W,
          height:          CARD_H,
          left:           `calc(50% - ${CARD_W / 2}px)`,
          top:             0,
          x,
          z,
          rotateY,
          scale,
          opacity,
          filter:          blurFilter,
          zIndex,
          transformStyle: 'preserve-3d',
          willChange:     'transform, opacity, filter',
          cursor:          isActive ? 'default' : 'pointer',
        }}
        onClick={!isActive ? onNavigate : undefined}
        aria-hidden={!isActive}
      >
        {/* ── Tilt / hover wrapper ── */}
        <motion.div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX:        isActive ? tiltRX : 0,
            rotateY:        isActive ? tiltRY : 0,
            transformStyle: 'preserve-3d',
            height:         '100%',
          }}
          whileHover={isActive ? { y: -7 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* ── Card shell ── */}
          <div
            className="w-full h-full bg-white rounded-[24px] flex flex-col overflow-hidden"
            style={{
              boxShadow: isActive
                ? `0 4px 6px rgba(0,0,0,0.03),
                   0 14px 44px rgba(0,0,0,0.09),
                   0 0 0 1.5px ${story.accentColor}22`
                : '0 2px 14px rgba(0,0,0,0.05), 0 0 0 1px #E5E7EB',
              transition: 'box-shadow 0.35s ease',
            }}
          >
            {/* Accent stripe */}
            <div
              className="h-[3px] w-full shrink-0"
              style={{ background: story.accentColor }}
            />

            {/* Card body */}
            <div className="flex flex-col flex-1 p-6">

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-pink-500 text-pink-500" />
                ))}
              </div>

              {/* Quote mark */}
              <Quote
                size={22}
                className="mb-2 opacity-30"
                style={{ color: story.accentColor }}
              />

              {/* Quote text */}
              <p className="text-gray-600 text-[13px] leading-[1.65] flex-1 italic">
                "{story.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-4" />

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center
                             text-white text-sm font-bold shrink-0"
                  style={{ background: story.accentColor }}
                >
                  {story.initials}
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-[13px] leading-tight truncate">
                    {story.name}
                  </p>
                  <p className="text-gray-400 text-[11px] truncate">{story.role}</p>
                </div>

                {/* Growth metric — reveals only on active card */}
                <div
                  className="shrink-0 rounded-xl px-2.5 py-1.5 text-center"
                  style={{
                    background:  story.accentBg,
                    opacity:     isActive ? 1 : 0,
                    transform:   isActive ? 'scale(1)' : 'scale(0.85)',
                    transition:  'opacity 0.35s ease, transform 0.35s ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <p
                    className="text-[13px] font-bold leading-tight"
                    style={{ color: story.accentColor }}
                  >
                    {story.metric}
                  </p>
                  <p className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">
                    {story.metricLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  },
);
CylinderCard.displayName = 'CylinderCard';

/* ─────────────────────────────────────────────────────────────────
   Nav arrow button
───────────────────────────────────────────────────────────────── */
const NavArrow = ({ onClick, label, children }) => (
  <motion.button
    onClick={onClick}
    aria-label={label}
    data-cursor-hover
    whileHover={{ scale: 1.08, boxShadow: '0 8px 24px rgba(236,72,153,0.18)' }}
    whileTap={{ scale: 0.92 }}
    className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm
               flex items-center justify-center text-gray-500
               hover:text-pink-600 hover:border-pink-300
               transition-colors duration-200 shrink-0"
  >
    {children}
  </motion.button>
);

/* ─────────────────────────────────────────────────────────────────
   Main section — "Stories of Real Growth"
───────────────────────────────────────────────────────────────── */
const Testimonials = () => {
  /* ── Spring-driven wheel angle — the single source of truth ── */
  const rawAngle    = useMotionValue(0);
  const springAngle = useSpring(rawAngle, {
    stiffness: 195,
    damping:   30,
    mass:      0.9,
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });
  const dragState   = useRef({ dragging: false, startX: 0, startAngle: 0 });

  /* Track which card is nearest the front */
  useEffect(
    () =>
      springAngle.on('change', (val) => {
        const idx = ((Math.round(val / STEP_DEG) % N) + N) % N;
        setActiveIdx(idx);
      }),
    [springAngle],
  );

  /* Navigate to a specific card index via shortest arc */
  const goTo = useCallback(
    (targetIdx) => {
      const cur     = rawAngle.get();
      const curStep = Math.round(cur / STEP_DEG);
      const curIdx  = ((curStep % N) + N) % N;
      let diff      = targetIdx - curIdx;
      if (diff >  N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      rawAngle.set((curStep + diff) * STEP_DEG);
    },
    [rawAngle],
  );

  const prev = useCallback(() => rawAngle.set(rawAngle.get() - STEP_DEG), [rawAngle]);
  const next = useCallback(() => rawAngle.set(rawAngle.get() + STEP_DEG), [rawAngle]);

  /* Keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  /* Pointer drag — works for both mouse and touch via Pointer Events API */
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      dragging:    true,
      startX:      e.clientX,
      startAngle:  rawAngle.get(),
    };
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const delta = (dragState.current.startX - e.clientX) / DRAG_RATIO;
    rawAngle.set(dragState.current.startAngle + delta);
  };
  const onPointerUp = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    /* Snap to nearest card */
    const snapped = Math.round(rawAngle.get() / STEP_DEG) * STEP_DEG;
    rawAngle.set(snapped);
  };

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="section-tag"
          >
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="section-title text-4xl lg:text-5xl mt-3 mb-4"
          >
            Stories of{' '}
            <span className="gradient-text">Real Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Real results from creators and brands who trusted Sociovance to
            elevate their presence — told in their own words.
          </motion.p>
        </div>

        {/* ── Orbital cylinder carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <NavArrow onClick={prev} label="Previous story">
              <ChevronLeft size={18} />
            </NavArrow>

            {/* ── Cylinder stage — perspective container ── */}
            <div
              className="relative flex-1 select-none overflow-hidden"
              style={{
                height:            CARD_H,
                perspective:       1100,
                perspectiveOrigin: '50% 50%',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {stories.map((story, i) => (
                <CylinderCard
                  key={i}
                  story={story}
                  cardIndex={i}
                  springAngle={springAngle}
                  isActive={i === activeIdx}
                  onNavigate={() => goTo(i)}
                />
              ))}
            </div>

            <NavArrow onClick={next} label="Next story">
              <ChevronRight size={18} />
            </NavArrow>
          </div>

          {/* ── Animated pagination dots ── */}
          <div
            className="flex justify-center items-center gap-2 mt-10"
            role="tablist"
            aria-label="Story navigation"
          >
            {stories.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to story by ${s.name}`}
                data-cursor-hover
                animate={{
                  width:           i === activeIdx ? 28 : 8,
                  backgroundColor: i === activeIdx ? s.accentColor : '#D1D5DB',
                  opacity:         i === activeIdx ? 1 : 0.45,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full h-2 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-pink-400"
              />
            ))}
          </div>

          {/* ── Active story label ── */}
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="text-center text-[12px] font-medium text-gray-400 mt-3 tracking-wide"
          >
            <span
              style={{ color: stories[activeIdx].accentColor }}
              className="font-semibold"
            >
              {stories[activeIdx].name}
            </span>
            &ensp;·&ensp;{activeIdx + 1} of {N}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
