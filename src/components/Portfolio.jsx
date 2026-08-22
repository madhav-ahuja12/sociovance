import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: '01',
    category: 'Brand Deals & Collab',
    title: 'Fashion Creator x Luxury Brand',
    desc: 'End-to-end partnership management and campaign execution for a tier-1 creator, generating 2.1M impressions and ₹15L deal value.',
    metrics: '2.1M Reach · ₹15L Deal',
    tag: 'Instagram & Reels',
  },
  {
    id: '02',
    category: 'Talent & Strategy',
    title: 'Tech Reviewer Growth Engine',
    desc: 'Structured long-form and short-form monetization blueprint driving 140% subscriber growth and 2.4x multi-stream sponsorship revenue.',
    metrics: '500K → 1.2M Subs',
    tag: 'YouTube & Analytics',
  },
  {
    id: '03',
    category: 'Digital Marketing & ROAS',
    title: 'D2C Skincare Brand Launch',
    desc: 'Omnichannel performance acquisition with custom creator ad creatives achieving 12x return on ad spend in first 90 days.',
    metrics: '₹8L Revenue · 12x ROAS',
    tag: 'Meta & Google Ads',
  },
  {
    id: '04',
    category: 'Content & Viral Media',
    title: 'Culinary Masterclass Series',
    desc: 'Multi-platform short-form viral storytelling driving 45M organic views and onboarding 3M cross-platform followers in 4 months.',
    metrics: '45M Organic Views',
    tag: 'Reels & YouTube Shorts',
  },
  {
    id: '05',
    category: 'Influencer Campaigns',
    title: 'FinTech Multi-Creator Surge',
    desc: 'Synchronized launch across 15 finance and lifestyle creators resulting in 8M+ reach and 85,000 app installs within 14 days.',
    metrics: '15 Creators · 8M+ Reach',
    tag: 'Campaign & App Growth',
  },
  {
    id: '06',
    category: 'Talent & Monetization',
    title: 'Fitness Creator Commerce',
    desc: 'Complete digital product and brand integration strategy scaling annual revenue to ₹40L+ with automated funnel systems.',
    metrics: '₹40L+ Annual Revenue',
    tag: 'Merch & Digital Courses',
  },
  {
    id: '07',
    category: 'EdTech & Education',
    title: 'EdTech Mastermind Launch',
    desc: 'Creator-led cohort masterclass campaign generating 1,200 paid student enrollments with 94% course completion satisfaction.',
    metrics: '1,100+ Enrollments',
    tag: 'Live Workshops',
  },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(1); // start on card 02 like the reference
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const total = portfolioItems.length;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Keyboard navigation support (ArrowLeft, ArrowRight, KeyA, KeyD, Home, End)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input field or textarea
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement?.isContentEditable) {
        return;
      }

      // Check if portfolio section is visible in viewport
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isInViewport) return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveIndex(total - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Swipe / Drag handling
  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -40 || velocity.x < -400) {
      nextSlide();
    } else if (swipe > 40 || velocity.x > 400) {
      prevSlide();
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag inline-flex items-center gap-1.5">
            <Sparkles size={13} className="text-violet-600" />
            Selected Case Studies
          </span>
          <h2 className="section-title text-4xl lg:text-5xl mt-2 mb-4">
            Stories of{' '}
            <span className="gradient-text">real growth</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Explore our featured client transformations across creator management and brand scaling.
          </p>
        </div>

        {/* ── REVOLVING DECK STAGE ── */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Interactive 3D Portfolio Deck (Use Left and Right arrow keys to navigate)"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-pink-500/30 rounded-3xl overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {portfolioItems
              .map((item, index) => {
                // Calculate wrap-around offset
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) offset -= total;
                return { item, index, offset };
              })
              // Render only 5 cards (active + 2 left + 2 right) for peak 120 FPS performance
              .filter(({ offset }) => Math.abs(offset) <= 2)
              // Sort furthest cards first, center card last for bulletproof DOM stacking
              .sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset))
              .map(({ item, index, offset }) => {
                const isCenter = offset === 0;
                const isNear = Math.abs(offset) === 1;
                const isMid = Math.abs(offset) === 2;

                // Spacing and scaling for crisp, layered deck look
                const translateX = offset === 0 ? 0 : offset > 0 
                  ? (offset === 1 ? 290 : 480)
                  : (offset === -1 ? -290 : -480);
                
                const scale = isCenter ? 1.0 : isNear ? 0.88 : 0.76;
                const opacity = isCenter ? 1 : isNear ? 0.85 : 0.55;
                const zIndex = 30 - Math.abs(offset) * 5;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{
                      x: translateX,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 28,
                      mass: 0.35,
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: zIndex,
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className={`w-[320px] sm:w-[460px] lg:w-[500px] h-[260px] sm:h-[280px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between select-none cursor-pointer bg-white transition-[filter,box-shadow,border-color] duration-300 ease-out ${
                      isCenter
                        ? 'blur-0 border-2 border-pink-500 shadow-[0_20px_50px_rgba(236,72,153,0.22),0_0_30px_rgba(124,58,237,0.18)] ring-1 ring-violet-400/40'
                        : isNear
                        ? 'blur-[3px] border border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:border-slate-300'
                        : 'blur-[6px] border border-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.05)]'
                    }`}
                  >
                  {/* Top Row: Category Pill + Giant Watermark Index */}
                  <div className="flex items-start justify-between">
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${
                      isCenter ? 'border-pink-500/30 bg-pink-50/90' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isCenter ? 'bg-pink-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span className={`text-[11px] sm:text-xs font-bold tracking-wider uppercase ${
                        isCenter ? 'text-pink-700' : 'text-slate-600'
                      }`}>
                        {item.category}
                      </span>
                    </div>

                    <span className={`font-display font-black text-4xl sm:text-5xl select-none tracking-tight ${
                      isCenter ? 'text-slate-200' : 'text-slate-200/60'
                    }`}>
                      {item.id}
                    </span>
                  </div>

                  {/* Middle Content: Big Title & Description */}
                  <div className="my-auto pt-1">
                    <h3 className={`font-display font-black text-lg sm:text-2xl text-slate-900 mb-2 leading-snug tracking-tight ${
                      !isCenter && 'opacity-70'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 ${
                      isCenter ? 'text-slate-600' : 'text-slate-500'
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Glowing Accent Line & Metrics */}
                  <div className="pt-3">
                    {/* Glowing bottom line */}
                    <div
                      className={`w-full h-1 rounded-full mb-3 ${
                        isCenter
                          ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.7)] opacity-100'
                          : 'bg-slate-200 opacity-40'
                      }`}
                    />

                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className={`font-bold ${isCenter ? 'text-slate-900' : 'text-slate-600'}`}>
                        {item.metrics}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        isCenter ? 'text-pink-600 font-bold' : 'text-slate-400'
                      }`}>
                        {item.tag} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── BOTTOM CONTROLS & GLOWING ORBIT BUTTON ── */}
        <div className="flex items-center justify-center gap-6 mt-4">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous Project"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Concentric Glowing Center Indicator like reference */}
          <div className="flex items-center gap-2">
            {portfolioItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative flex items-center justify-center p-1"
              >
                {activeIndex === i ? (
                  <div className="relative flex items-center justify-center w-7 h-7">
                    <span className="absolute inset-0 rounded-full border-2 border-pink-500 animate-ping opacity-30" />
                    <span className="w-6 h-6 rounded-full border border-pink-500/80 bg-pink-50 flex items-center justify-center shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500" />
                    </span>
                  </div>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-pink-300 transition-colors" />
                )}
              </button>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next Project"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:scale-105 transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


