import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion, useInView, useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import {
  Users, Handshake, BarChart3, Video, Target, LineChart,
  ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────
   Service data
───────────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Users,
    title: 'Talent Management',
    description:
      'End-to-end representation for creators — contracts, brand deals, audience growth strategy, and full career management.',
    iconBg: '#EDE7F9',
    iconColor: '#7C3AED',
    accentColor: '#7C3AED',
    accentBg: 'rgba(124,58,237,0.10)',
    tag: 'Core Service',
    stat: '100+ Creators',
  },
  {
    icon: Handshake,
    title: 'Brand Partnerships',
    description:
      'We connect creators with the right brands — negotiating premium deals that align with your audience and values.',
    iconBg: '#FCE7F3',
    iconColor: '#EC4899',
    accentColor: '#EC4899',
    accentBg: 'rgba(236,72,153,0.10)',
    tag: 'High Impact',
    stat: '150+ Deals',
  },
  {
    icon: BarChart3,
    title: 'Digital Marketing',
    description:
      'Comprehensive social media strategy, content calendars, SEO, and community management to amplify your presence.',
    iconBg: '#FEF3E7',
    iconColor: '#F97316',
    accentColor: '#F97316',
    accentBg: 'rgba(249,115,22,0.10)',
    tag: 'Growth Driver',
    stat: '1M+ Leads',
  },
  {
    icon: Video,
    title: 'Content Creation',
    description:
      'High-quality content production — scripting, shooting, editing and publishing across all major platforms.',
    iconBg: '#F3E8FF',
    iconColor: '#8B5CF6',
    accentColor: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.10)',
    tag: 'Creative',
    stat: '45M+ Views',
  },
  {
    icon: Target,
    title: 'Performance Marketing',
    description:
      'Precision-targeted campaigns on Meta, Instagram, and Google Ads that maximize ROI and drive measurable results.',
    iconBg: '#FDF2F8',
    iconColor: '#DB2777',
    accentColor: '#DB2777',
    accentBg: 'rgba(219,39,119,0.10)',
    tag: 'Performance',
    stat: '12× Avg ROAS',
  },
  {
    icon: LineChart,
    title: 'Analytics & Reporting',
    description:
      'Deep-dive monthly reports with growth tracking, engagement analysis, and actionable strategy recommendations.',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    accentColor: '#EA580C',
    accentBg: 'rgba(234,88,12,0.10)',
    tag: 'Data-Driven',
    stat: '98% Retention',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Coverflow slot configurations
   Slots: [-2, -1, 0, +1, +2] mapped to array index [0,1,2,3,4]
───────────────────────────────────────────────────────────────── */
const CARD_W  = 296;  // logical card width in px
const SLOT    = [
  // far-left — 72 % scale, noticeably behind, strong blur
  { x: -318, scale: 0.72, rotateY:  28, opacity: 0.38, blur: 2.5, z: -90, zIndex: 1, clickable: true  },
  // near-left — half-overlapped by center card, slight blur, pushed back
  { x: -148, scale: 0.86, rotateY:  14, opacity: 0.75, blur: 1.5, z: -48, zIndex: 2, clickable: true  },
  // center — front, dominant, zero depth offset
  { x:    0, scale: 1.00, rotateY:   0, opacity: 1.00, blur: 0,   z:   0, zIndex: 10, clickable: false },
  // near-right
  { x:  148, scale: 0.86, rotateY: -14, opacity: 0.75, blur: 1.5, z: -48, zIndex: 2, clickable: true  },
  // far-right
  { x:  318, scale: 0.72, rotateY: -28, opacity: 0.38, blur: 2.5, z: -90, zIndex: 1, clickable: true  },
];

const SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 };

/* ─────────────────────────────────────────────────────────────────
   3D Tilt hook — center card only
───────────────────────────────────────────────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const rx  = useSpring(useTransform(my, [-0.5, 0.5], [ 8, -8]), { stiffness: 200, damping: 26 });
  const ry  = useSpring(useTransform(mx, [-0.5, 0.5], [-8,  8]), { stiffness: 200, damping: 26 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { ref, rx, ry, onMove, onLeave };
};

/* ─────────────────────────────────────────────────────────────────
   Single coverflow card
───────────────────────────────────────────────────────────────── */
const CoverCard = React.memo(({ service, slotIndex, onNavigate }) => {
  const s       = SLOT[slotIndex];
  const isCenter = slotIndex === 2;
  const { ref, rx, ry, onMove, onLeave } = useTilt();
  const Icon    = service.icon;

  const innerStyle = isCenter
    ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }
    : {};

  return (
    <motion.div
      /* slot animation */
      animate={{
        x:       s.x,
        z:       s.z,
        scale:   s.scale,
        rotateY: s.rotateY,
        opacity: s.opacity,
        filter:  `blur(${s.blur}px)`,
        zIndex:  s.zIndex,
      }}
      transition={SPRING}
      onClick={s.clickable ? onNavigate : undefined}
      style={{
        position:   'absolute',
        width:       CARD_W,
        left:       `calc(50% - ${CARD_W / 2}px)`,
        top:         0,
        cursor:      s.clickable ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      aria-hidden={!isCenter}
    >
      {/* tilt wrapper — center only */}
      <motion.div
        ref={isCenter ? ref : undefined}
        onMouseMove={isCenter ? onMove : undefined}
        onMouseLeave={isCenter ? onLeave : undefined}
        style={innerStyle}
        whileHover={isCenter ? { y: -6 } : {}}
        transition={isCenter ? { type: 'spring', stiffness: 220, damping: 24 } : {}}
        className="h-full"
      >
        {/* Card shell */}
        <div
          className="bg-white rounded-[22px] overflow-hidden flex flex-col"
          style={{
            boxShadow: isCenter
              ? `0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.10), 0 0 0 1.5px ${service.accentColor}28`
              : '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB',
            height: 420,
          }}
        >
          {/* Accent top stripe */}
          <div
            className="h-[3px] w-full shrink-0"
            style={{ background: service.accentColor }}
          />

          {/* Body */}
          <div className="flex flex-col flex-1 p-7">
            {/* Tag + Icon */}
            <div className="flex items-start justify-between mb-5">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{ background: service.accentBg, color: service.accentColor }}
              >
                {service.tag}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: service.iconBg }}
              >
                <Icon size={22} color={service.iconColor} strokeWidth={1.75} />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-gray-900 text-[19px] leading-snug mb-2.5">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-[13px] leading-relaxed flex-1">
              {service.description}
            </p>

            {/* Divider + footer — fade out on non-center */}
            <div
              style={{
                opacity:    isCenter ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: isCenter ? 'auto' : 'none',
              }}
            >
              <div className="h-px bg-gray-100 my-5" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: service.accentColor }}
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {service.stat}
                  </span>
                </div>
                <Link
                  to="/contact"
                  data-cursor-hover
                  className="group inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  style={{ background: service.accentColor }}
                >
                  Learn more
                  <ArrowRight
                    size={11}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
CoverCard.displayName = 'CoverCard';

/* ─────────────────────────────────────────────────────────────────
   Navigation arrow
───────────────────────────────────────────────────────────────── */
const NavArrow = ({ onClick, label, children }) => (
  <motion.button
    onClick={onClick}
    aria-label={label}
    data-cursor-hover
    whileHover={{ scale: 1.08, boxShadow: '0 8px 24px rgba(236,72,153,0.2)' }}
    whileTap={{ scale: 0.92 }}
    className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-600 hover:border-pink-300 transition-colors duration-200 shrink-0 z-10"
  >
    {children}
  </motion.button>
);

/* ─────────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────────── */
const Services = () => {
  const [active, setActive] = useState(0);
  const sectionRef          = useRef(null);
  const stageRef            = useRef(null);
  const inView              = useInView(sectionRef, { once: true, margin: '-80px' });
  const total               = services.length;
  const dragStartX          = useRef(0);

  const getIdx = useCallback(
    (offset) => ((active + offset) % total + total) % total,
    [active, total],
  );

  const prev = useCallback(() => setActive((a) => ((a - 1) + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  /* Touch / mouse drag */
  const onPointerDown = (e) => { dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0; };
  const onPointerUp   = (e) => {
    const end  = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const diff = dragStartX.current - end;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
  };

  /* Visible service indices: [-2, -1, 0, +1, +2] */
  const visibleSvcIdx = [-2, -1, 0, 1, 2].map((o) => getIdx(o));

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="section-tag"
          >
            What We Do
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="section-title text-4xl lg:text-5xl mt-3 mb-4"
          >
            Services built for{' '}
            <span className="gradient-text">modern creators</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Everything you need to turn your passion into a professional brand.
          </motion.p>
        </div>

        {/* ── Coverflow stage ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Row: arrows + stage */}
          <div className="flex items-center gap-4 select-none">
            <NavArrow onClick={prev} label="Previous service">
              <ChevronLeft size={18} />
            </NavArrow>

            {/* Stage — perspective container */}
            <div
              ref={stageRef}
              className="relative flex-1 overflow-visible"
              style={{
                height:      420,
                perspective: 1100,
                perspectiveOrigin: '50% 50%',
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e)   => {
                const diff = dragStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
              }}
            >
              {visibleSvcIdx.map((svcIdx, slotIdx) => (
                <CoverCard
                  key={svcIdx}
                  service={services[svcIdx]}
                  slotIndex={slotIdx}
                  onNavigate={
                    slotIdx < 2 ? prev
                    : slotIdx > 2 ? next
                    : undefined
                  }
                />
              ))}
            </div>

            <NavArrow onClick={next} label="Next service">
              <ChevronRight size={18} />
            </NavArrow>
          </div>

          {/* ── Pagination dots ── */}
          <div
            className="flex justify-center items-center gap-2 mt-10"
            role="tablist"
            aria-label="Service navigation"
          >
            {services.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to ${s.title}`}
                aria-selected={i === active}
                role="tab"
                data-cursor-hover
                animate={{
                  width:           i === active ? 28 : 8,
                  backgroundColor: i === active ? s.accentColor : '#D1D5DB',
                  opacity:         i === active ? 1 : 0.45,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full h-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              />
            ))}
          </div>

          {/* ── Active label ── */}
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="text-center text-[12px] font-medium text-gray-400 mt-3 tracking-wide"
          >
            <span style={{ color: services[active].accentColor }} className="font-semibold">
              {services[active].title}
            </span>
            &ensp;·&ensp;{active + 1} of {total}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;

