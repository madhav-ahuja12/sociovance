import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Compass, Handshake, TrendingUp, BarChart3, Sparkles } from 'lucide-react';

const stats = [
  { value: 100, suffix: '+', label: 'Creators Managed', color: 'text-slate-900', bg: 'bg-white', border: 'border-slate-200/80' },
  { value: 150, suffix: '+', label: 'Brand Deals Closed', color: 'text-slate-900', bg: 'bg-white', border: 'border-slate-200/80' },
  { value: 1, suffix: 'M+', label: 'Leads Generated', color: 'text-slate-900', bg: 'bg-white', border: 'border-slate-200/80' },
  { value: 98, suffix: '%', label: 'Client Retention', color: 'text-slate-900', bg: 'bg-white', border: 'border-slate-200/80' },
];

const features = [
  { title: 'Creator-First Philosophy', desc: 'We treat every creator as a unique brand, crafting personalized strategies.' },
  { title: 'Industry Relationships', desc: 'Deep connections with top brands across fashion, tech, food, and lifestyle.' },
  { title: 'End-to-End Support', desc: 'From onboarding to reporting — we handle everything so you can create.' },
  { title: 'Proven ROI', desc: 'Every campaign is tracked, measured, and optimized for maximum return.' },
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>{count}{suffix}</span>
  );
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden bg-white">
      {/* Background orbs */}
      <div className="orb w-72 h-72 -top-10 right-10" style={{ background: '#7C3AED' }} />
      <div className="orb w-56 h-56 bottom-10 left-0" style={{ background: '#EC4899' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white rounded-2xl p-6 text-center border ${stat.border} shadow-card`}
            >
              <div className={`text-4xl lg:text-5xl font-display font-bold ${stat.color} mb-2`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-tag"
            >
              Why Sociovance
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title text-4xl lg:text-5xl mt-2 mb-4"
            >
              Built by creators,{' '}
              <span className="gradient-text">for creators.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="section-subtitle mb-8"
            >
              We started as creators ourselves. We know what it takes to build a 
              personal brand from zero — and we've turned that knowledge into a 
              system that works for everyone.
            </motion.p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-0.5">{f.title}</p>
                    <p className="text-slate-600 text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Creator Journey Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-white rounded-3xl p-8 shadow-card-hover border border-slate-100 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-7">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Creator Journey</p>
                  <p className="text-xs text-slate-500 mt-0.5">From zero to brand</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  <Sparkles size={11} className="text-pink-600" /> Proven System
                </span>
              </div>

              {/* Journey steps */}
              <div className="space-y-0">
                {[
                  { step: '01', title: 'Onboard & Audit', sub: 'Profile, niche & content deep-dive', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', Icon: Target, delay: 0.4 },
                  { step: '02', title: 'Strategy Build', sub: 'Content calendar + growth roadmap', color: '#EC4899', bg: 'rgba(236,72,153,0.08)', Icon: Compass, delay: 0.55 },
                  { step: '03', title: 'Brand Outreach', sub: 'Pitching to matched brand partners', color: '#F97316', bg: 'rgba(249,115,22,0.08)', Icon: Handshake, delay: 0.7 },
                  { step: '04', title: 'Scale & Monetise', sub: 'Revenue optimisation & reporting', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', Icon: TrendingUp, delay: 0.85 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: item.delay, duration: 0.45 }}
                    className="flex items-center gap-4 relative"
                  >
                    {/* Connector line */}
                    {i < 3 && (
                      <div className="absolute left-[19px] top-[40px] w-0.5 h-8 rounded-full"
                        style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }} />
                    )}
                    {/* Icon bubble */}
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: item.bg, border: `1.5px solid ${item.color}25` }}>
                      <item.Icon size={17} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-wider" style={{ color: item.color }}>{item.step}</span>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color, opacity: 0.5 }} />
                  </motion.div>
                ))}
              </div>

              {/* Result bar */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.05 }}
                className="mt-6 rounded-2xl p-4 flex items-center justify-between bg-gradient-to-r from-purple-50/80 via-pink-50/50 to-orange-50/40 border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-r from-violet-600 to-pink-500 shadow-sm text-white">
                    <BarChart3 size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Average result across creators</p>
                    <p className="text-[10px] text-slate-500">within first 6 months</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-pink-600">3.2×</p>
                  <p className="text-[10px] text-slate-500">growth</p>
                </div>
              </motion.div>
            </div>

            {/* Subtle decorative shadows */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-purple-50 -z-0" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl bg-pink-50 -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

