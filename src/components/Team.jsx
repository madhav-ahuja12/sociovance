import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { Sparkles, ArrowUpRight, Award, Zap, ShieldCheck } from 'lucide-react';

const team = [
  {
    name: 'Rkthan Arora',
    role: 'Founder & CEO',
    tag: 'Sociovance',
    bio: 'Visionary behind Sociovance — building a bridge between creators, brands, and the future of influencer marketing.',
    initials: 'RA',
    specialty: 'Talent & Deal Architecture',
    metric: '100+ Campaigns',
    gradient: 'from-violet-700 via-pink-600 to-orange-500',
    glow: 'rgba(236,72,153,0.35)',
    orb1: '#7C3AED',
    orb2: '#EC4899',
    social: { 
      linkedin: 'https://www.linkedin.com/in/rkthan-arora-808a0a160/', 
      instagram: 'https://www.instagram.com/_rkthan/', 
      twitter: 'https://x.com/rkthan',
      facebook: '#' 
    },
  },
  {
    name: 'Vishal Kumar',
    role: 'Operations Lead',
    tag: 'Operations',
    bio: 'Powering operations and partnerships at Sociovance, ensuring every collaboration delivers real impact.',
    initials: 'VK',
    specialty: 'Brand Relations & Execution',
    metric: '98% Delivery Rate',
    gradient: 'from-pink-600 via-rose-500 to-orange-400',
    glow: 'rgba(249,115,22,0.35)',
    orb1: '#EC4899',
    orb2: '#F97316',
    social: { 
      linkedin: '#', 
      instagram: '#', 
      twitter: '#',
      facebook: '#' 
    },
  },
  {
    name: 'Madhav Ahuja',
    role: 'Technical Lead',
    tag: 'Tech & Systems',
    bio: 'Architecting technology infrastructure and digital platforms at Sociovance, powering high-performance growth and creator tech systems.',
    initials: 'MA',
    specialty: 'Tech Architecture & Platforms',
    metric: '45M+ Reach Scaled',
    gradient: 'from-violet-600 via-purple-700 to-pink-600',
    glow: 'rgba(124,58,237,0.35)',
    orb1: '#7C3AED',
    orb2: '#8B5CF6',
    social: { 
      linkedin: 'https://www.linkedin.com/in/madhav-ahuja-69598b312/', 
      instagram: 'https://www.instagram.com/madhavahuja_/', 
      twitter: 'https://x.com/madhavahuja_',
      facebook: '#' 
    },
  },
];

const AnimatedTeamCard = ({ member, index, inView }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    setTilt({ x: dy * -10, y: dx * 10 });
    setMousePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1100px' }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: hovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Dynamic Card Container */}
        <div 
          className="relative h-full border rounded-3xl p-7 sm:p-8 text-center bg-white flex flex-col justify-between transition-all duration-300"
          style={{ 
            borderColor: hovered ? 'rgba(236,72,153,0.45)' : '#E2E8F0',
            boxShadow: hovered 
              ? '0 25px 50px -12px rgba(236,72,153,0.2), 0 0 0 1px rgba(236,72,153,0.2)' 
              : '0 4px 24px rgba(30,27,41,0.06), 0 1px 4px rgba(30,27,41,0.04)' 
          }}
        >
          {/* Mouse Spotlight Layer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              opacity: mousePos.opacity,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236,72,153,0.08), transparent 70%)`,
            }}
          />

          {/* Top Accent Gradient Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
            style={{
              background: hovered 
                ? 'linear-gradient(90deg, #7C3AED, #EC4899, #F97316)' 
                : 'linear-gradient(90deg, transparent, #CBD5E1, transparent)',
            }}
          />

          {/* Upper Section: Avatar & Badges */}
          <div>
            {/* Avatar with 3D Depth */}
            <div 
              className="relative inline-block mb-6"
              style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            >
              {/* Backlight Pulse Glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-xl scale-125 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${member.orb1}, ${member.orb2})`,
                  opacity: hovered ? 0.65 : 0.2,
                }}
              />

              {/* Avatar Box with Gradient */}
              <div className={`relative w-24 h-24 sm:w-26 sm:h-26 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-black shadow-xl mx-auto border-2 border-white/20`}>
                {member.initials}
                {/* Gloss reflection overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)' }} 
                />
              </div>

              {/* Verified Online Live Status Orb */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-pink-500 border-2 border-white shadow-md flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            </div>

            {/* Tags & Name */}
            <div style={{ transform: 'translateZ(25px)' }}>
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3 tracking-wider uppercase bg-purple-50 text-violet-700 border border-purple-200 shadow-sm">
                {member.tag}
              </span>

              <h3 className="font-display font-black text-slate-900 text-xl sm:text-2xl mb-1 tracking-tight group-hover:text-purple-900 transition-colors">
                {member.name}
              </h3>

              <p className="text-sm font-extrabold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-3">
                {member.role}
              </p>

              {/* Specialty & Metric Pill */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200">
                  <Zap size={10} className="text-pink-600" /> {member.metric}
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {member.bio}
              </p>
            </div>
          </div>

          {/* Social Links with Spring Physics */}
          <div 
            className="flex justify-center gap-2.5 pt-4 border-t border-slate-100"
            style={{ transform: 'translateZ(30px)' }}
          >
            {[
              { href: member.social.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn' },
              { href: member.social.instagram, Icon: FaInstagram, label: 'Instagram' },
              { href: member.social.twitter, Icon: FaXTwitter, label: 'Twitter' },
              { href: member.social.facebook, Icon: FaFacebookF, label: 'Facebook' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 bg-slate-50 border border-slate-200 transition-all duration-200 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-pink-500 hover:border-transparent hover:shadow-md hover:shadow-pink-500/25"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-20 lg:py-32 relative overflow-hidden bg-white">
      {/* Soft ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent)' }} 
        />
        <div 
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08), transparent)' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag"
          >
            The Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title text-slate-900 mt-3"
          >
            Minds Behind the <span className="gradient-text">Movement</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle text-slate-600 max-w-2xl mx-auto mt-4"
          >
            Passionate strategists, managers, and visionaries dedicated to elevating digital creators into enduring personal brands.
          </motion.p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {team.map((member, index) => (
            <AnimatedTeamCard
              key={member.name}
              member={member}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
