import React, { useRef } from 'react';
import {
  motion, useInView, useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import { Search, Lightbulb, Pencil, Rocket, FileBarChart, Zap, Target } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discover',
    desc: 'We dive deep into your brand identity, audience demographics, and market positioning to find your competitive edge.',
    accentColor: '#7C3AED',
    gradFrom: '#EDE7F9',
    gradTo: '#F3E8FF',
    iconBg: 'linear-gradient(135deg,#7C3AED,#8B5CF6)',
    tag: 'Week 1',
  },
  {
    num: '02',
    icon: Lightbulb,
    title: 'Strategy',
    desc: 'Build a data-backed roadmap — platform selection, content pillars, brand partnership targets, and growth milestones.',
    accentColor: '#EC4899',
    gradFrom: '#FCE7F3',
    gradTo: '#FDF2F8',
    iconBg: 'linear-gradient(135deg,#EC4899,#F472B6)',
    tag: 'Week 2',
  },
  {
    num: '03',
    icon: Pencil,
    title: 'Create',
    desc: 'Execute high-quality content production, campaigns, and brand collaborations aligned to your strategic vision.',
    accentColor: '#F97316',
    gradFrom: '#FEF3E7',
    gradTo: '#FFF7ED',
    iconBg: 'linear-gradient(135deg,#F97316,#FB923C)',
    tag: 'Week 3–4',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch',
    desc: 'Scale across platforms with paid amplification, community management, and continuous optimisation.',
    accentColor: '#8B5CF6',
    gradFrom: '#EDE7F9',
    gradTo: '#F3E8FF',
    iconBg: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
    tag: 'Month 2',
  },
  {
    num: '05',
    icon: FileBarChart,
    title: 'Report',
    desc: 'Monthly deep-dive reports with actionable insights, KPIs, and a refined strategy for the next cycle.',
    accentColor: '#DB2777',
    gradFrom: '#FCE7F3',
    gradTo: '#FFF1F2',
    iconBg: 'linear-gradient(135deg,#DB2777,#EC4899)',
    tag: 'Ongoing',
  },
];

/* ── 3-D tilt hook ─────────────────────────────────────────────── */
const useTilt = (strength = 11) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [strength, -strength]), { stiffness: 130, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), { stiffness: 130, damping: 20 });
  const gloss = useTransform(mx, [-0.5, 0.5], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.14)']);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { ref, rx, ry, gloss, onMove, onLeave };
};

/* ── Single step card ──────────────────────────────────── */
const StepCard = ({ step, index, inView }) => {
  const { ref, rx, ry, gloss, onMove, onLeave } = useTilt(10);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 900 }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
          boxShadow: `0 4px 24px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.05)`,
        }}
        whileHover={{
          boxShadow: `0 16px 48px rgba(${hexRgb(step.accentColor)},0.18), 0 0 0 1.5px ${step.accentColor}30`,
          y: -6,
        }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-3xl overflow-hidden h-full border border-slate-100"
      >
        {/* Gloss sheen */}
        <motion.div
          style={{ background: gloss }}
          className="absolute inset-0 rounded-3xl pointer-events-none z-20"
        />

        {/* Gradient top strip */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${step.accentColor}, ${step.accentColor}88)` }}
        />

        {/* Soft pastel background blob */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none opacity-60"
          style={{ background: `radial-gradient(circle, ${step.gradFrom} 0%, transparent 70%)` }}
        />

        <div className="relative p-7 flex flex-col h-full" style={{ transform: 'translateZ(12px)' }}>
          {/* Step number + tag row */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-4xl font-black leading-none"
              style={{ color: `${step.accentColor}20`, WebkitTextStroke: `1.5px ${step.accentColor}40` }}
            >
              {step.num}
            </span>
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide"
              style={{ background: `${step.accentColor}12`, color: step.accentColor, border: `1px solid ${step.accentColor}25` }}
            >
              {step.tag}
            </span>
          </div>

          {/* Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5 shrink-0"
            style={{
              background: step.iconBg,
              boxShadow: `0 6px 20px ${step.accentColor}35`,
              transform: 'translateZ(6px)',
            }}
          >
            <Icon size={22} />
          </div>

          {/* Text */}
          <h3
            className="font-display font-bold text-slate-900 text-xl mb-3 transition-colors duration-200"
          >
            {step.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed flex-1">{step.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

function hexRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Section ───────────────────────────────────────────────────── */
const Process = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="py-20 lg:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl lg:text-5xl mt-2 mb-4"
          >
            Our proven{' '}
            <span className="gradient-text">5-step process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            A structured, repeatable framework that consistently delivers results
            for creators and brands at every scale.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <Zap size={16} className="text-violet-700 shrink-0" />
            <span className="text-sm font-semibold text-slate-800">Average onboarding time: <span className="text-violet-700 font-bold">under 48 hours</span></span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <Target size={16} className="text-pink-600 shrink-0" />
            <span className="text-sm font-semibold text-slate-800">First results visible: <span className="text-pink-600 font-bold">within 30 days</span></span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Process;

