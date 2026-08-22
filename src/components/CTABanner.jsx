import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Full Sunset Aurora gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)' }}
      />

      {/* Modern light grid effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 40%, transparent 95%)',
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-light-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <circle cx="48" cy="0" r="1.5" fill="rgba(255, 255, 255, 0.35)" />
              <circle cx="0" cy="48" r="1.5" fill="rgba(255, 255, 255, 0.35)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-light-grid)" />
        </svg>
      </div>

      {/* Ambient luminous glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-white/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-72 h-72 -top-20 -left-20 rounded-full bg-pink-300/30 blur-3xl pointer-events-none" />
      <div className="absolute w-64 h-64 -bottom-10 right-10 rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/30 backdrop-blur-sm shadow-sm"
        >
          <Sparkles size={14} />
          Limited spots available for Q3 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
        >
          Ready to grow your brand?
          <br />
          <span className="text-amber-200">Let's talk.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/90 text-lg mb-10 max-w-xl mx-auto font-medium"
        >
          Join 100+ creators and brands who've transformed their digital presence with Sociovance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:text-pink-600 hover:-translate-y-0.5 transition-all duration-300 text-base"
          >
            Book a Free Consultation <ArrowRight size={18} />
          </Link>
          <a
            href="tel:+917017114214"
            className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-4 rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300 text-base backdrop-blur-sm"
          >
            Call Us: +91 70171 14214
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-white/80 text-sm"
        >
          {['No long-term contracts', 'Free consultation', '7-day trial', '24hr response guarantee'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.2" />
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

