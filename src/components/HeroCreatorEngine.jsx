import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Flame, 
  Zap, 
  Play, 
  Share2, 
  Award,
  Video
} from 'lucide-react';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa6';

const HeroCreatorEngine = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none py-6">
      {/* ── Ambient Radial Glow Layers (Sunset Aurora) ── */}
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-violet-600/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-72 h-72 rounded-full bg-pink-500/15 blur-[80px] pointer-events-none" />

      {/* ── Floating Satellite 1: Top-Right Viral Reach ── */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-[0_12px_32px_rgba(30,27,41,0.08)] flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
          <Flame size={16} className="text-pink-600" />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Viral Distribution</p>
          <p className="text-xs font-black text-[#1E1B29]">45M+ Organic Views</p>
        </div>
      </motion.div>

      {/* ── Main Creator Brand Showcase Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_20px_50px_rgba(124,58,237,0.12),0_4px_16px_rgba(30,27,41,0.04)] overflow-hidden"
      >
        {/* Top Accent Gradient Line (Sunset Aurora) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400" />

        {/* Card Header: Creator Profile & Status */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-700 via-pink-600 to-orange-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-pink-500/25">
                SV
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-pink-500 border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-[#1E1B29] text-base sm:text-lg tracking-tight">
                  Creator Growth Engine
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 text-violet-700 border border-purple-200">
                  <Sparkles size={10} className="text-violet-600" /> ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">Talent Management &amp; Scaling</p>
            </div>
          </div>

          <div className="flex gap-1.5">
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-pink-600 transition-colors">
              <FaInstagram size={14} />
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-violet-600 transition-colors">
              <FaYoutube size={14} />
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-orange-500 transition-colors">
              <FaFacebookF size={12} />
            </div>
          </div>
        </div>

        {/* Audience Growth Metric Banner */}
        <div className="my-5 p-5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-pink-50/40 to-orange-50/30 border border-purple-100/80 relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              Verified Impact
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-black text-violet-800 bg-purple-100/70 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} /> +4.2× Velocity
            </span>
          </div>

          <p className="font-display font-black text-3xl sm:text-4xl text-[#1E1B29] tracking-tight my-1">
            1M+ Leads Generated
          </p>
          <p className="text-xs text-[#6B7280] font-medium">
            High-intent customer &amp; audience acquisition across campaigns
          </p>

          {/* Animated Growth Waveform Bars */}
          <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-end justify-between gap-1.5 h-12 px-1">
            {[35, 50, 45, 65, 58, 80, 72, 92, 85, 100, 94, 100].map((height, idx) => (
              <motion.div
                key={idx}
                initial={{ height: '25%' }}
                animate={{ height: `${height}%` }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: idx * 0.08,
                  ease: 'easeInOut'
                }}
                className={`w-full rounded-t-sm ${
                  idx >= 8 
                    ? 'bg-gradient-to-t from-violet-600 via-pink-500 to-orange-400 shadow-[0_0_8px_rgba(236,72,153,0.45)]' 
                    : 'bg-pink-200/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
              Brand Deals
            </span>
            <p className="text-sm sm:text-base font-black text-[#1E1B29]">150+ Closed</p>
          </div>
          <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-100 text-center">
            <span className="text-[10px] text-pink-700 font-bold uppercase tracking-wider block mb-0.5">
              Retention
            </span>
            <p className="text-sm sm:text-base font-black text-pink-700">98%</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
              Roster
            </span>
            <p className="text-sm sm:text-base font-black text-[#1E1B29]">100+ Creators</p>
          </div>
        </div>
      </motion.div>

      {/* ── Floating Satellite 2: Bottom-Left Rapid Onboarding ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        className="absolute -bottom-2 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-[0_12px_32px_rgba(30,27,41,0.08)] flex items-center gap-2"
      >
        <Zap size={15} className="text-violet-600" />
        <span className="text-xs font-black text-[#1E1B29]">48h Creator Onboarding</span>
      </motion.div>
    </div>
  );
};

export default HeroCreatorEngine;
