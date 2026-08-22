import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import HeroCreatorEngine from "./HeroCreatorEngine";

/* ── Right-side Interactive Creator Growth Engine Visual ───────────── */
const HeroVisual = () => (
  <div className="relative flex items-center justify-center select-none w-full">
    <HeroCreatorEngine />
  </div>
);

/* ── Hero ────────────────────────────────────────────────────────── */
const Hero = () => {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #EDE7F9 0%, #FCE7F3 50%, #FEF3E7 100%)",
      }}
    >
      {/* Mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 70% 40%,rgba(124,58,237,0.14) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 20% 70%,rgba(236,72,153,0.12) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(249,115,22,0.10) 0%,transparent 60%)"
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(30,27,41,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(30,27,41,0.4) 1px,transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + (i % 3) * 3, height: 3 + (i % 3) * 3,
            left: `${6 + (i * 19) % 88}%`, top: `${8 + (i * 27) % 82}%`,
            background: ["#7C3AED","#EC4899","#F97316","#8B5CF6","#F472B6"][i % 5],
            opacity: 0.25,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-tag bg-white/80 backdrop-blur-sm border-purple-200 text-violet-700">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 inline-block" />
                Social Media &amp; Talent Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.08] mt-5 mb-6 text-[#1E1B29]"
            >
              <span>Where creators</span>{" "}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)" }}
              >
                become brands.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-lg"
            >
              We help creators and brands grow exponentially through strategic talent management,
              high-value brand partnerships, and data-driven digital marketing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="btn-primary text-base py-4 px-8"
              >
                Book a Free Consultation <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => scroll("portfolio")}
                className="btn-secondary text-base py-4 px-8 bg-white/60 backdrop-blur-sm"
              >
                <Play size={15} className="fill-violet-600 text-violet-600" /> Our Work
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="mt-10 flex items-center gap-5"
            >
              <div className="flex -space-x-2">
                {["#7C3AED","#EC4899","#F97316","#8B5CF6","#DB2777"].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ background: c, borderColor: "white" }}>
                    {["A","B","C","D","E"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <p className="text-xs text-[#6B7280]">Trusted by <span className="font-bold text-[#1E1B29]">100+ creators</span></p>
              </div>
            </motion.div>
          </div>

          {/* Right: abstract visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <HeroVisual />
          </motion.div>

        </div>
      </div>

      {/* Bottom fade into white next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFFFFF)" }} />
    </section>
  );
};

export default Hero;

