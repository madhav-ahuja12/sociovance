import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, ArrowRight } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import logoImg from '../assets/image.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand col */}
          <div className="lg:col-span-1">
            <div className="mb-5 inline-flex items-center">
              <img
                src={logoImg}
                alt="Sociovance"
                className="h-12 w-auto object-contain select-none"
                style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
                draggable={false}
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 text-slate-400">
              Premier social media and talent management agency helping creators become brands since 2026.
            </p>
            <div className="flex gap-2">
              {[
                { href: 'https://www.instagram.com/socio.vance/', Icon: FaInstagram, label: 'Instagram', hover: 'hover:text-pink-400' },
                { href: '#', Icon: FaLinkedinIn, label: 'LinkedIn', hover: 'hover:text-violet-400' },
                { href: '#', Icon: FaXTwitter, label: 'Twitter', hover: 'hover:text-white' },
              ].map(({ href, Icon, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 ${hover} transition-all duration-200 hover:bg-slate-800`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'Services', href: '/#services' },
                { label: 'Portfolio', href: '/#portfolio' },
                { label: 'About Us', href: '/#about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/contact') ? (
                    <Link to="/contact" className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-3 h-0.5 bg-pink-500 transition-all duration-200 rounded" />
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-0.5 bg-pink-500 transition-all duration-200 rounded" />
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {[
                'Talent Management',
                'Brand Partnerships',
                'Digital Marketing',
                'Content Creation',
                'Performance Marketing',
                'Analytics & Reporting',
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleNavClick('/#services')}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-pink-500 transition-all duration-200 rounded" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="mailto:info@sociovance.com" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                  <Mail size={14} className="text-pink-400 shrink-0" />
                  info@sociovance.com
                </a>
              </li>
              <li>
                <a href="tel:+917017114214" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                  <Phone size={14} className="text-pink-400 shrink-0" />
                  +91 70171 14214
                </a>
              </li>
              <li>
                <a href="https://sociovance.com" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                  <Globe size={14} className="text-pink-400 shrink-0" />
                  sociovance.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-white text-sm font-semibold mb-2">Newsletter</p>
              <p className="text-xs mb-3">Tips, trends & brand growth insights. Weekly.</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-pink-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#EC4899" fillOpacity="0.2" />
                    <path d="M5 8L7 10L11 6" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-pink-500 transition-colors"
                    id="footer-newsletter-email"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white shadow-sm"
                    id="footer-newsletter-submit"
                  >
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © 2026 Sociovance LLP. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

