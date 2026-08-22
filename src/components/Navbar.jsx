import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { label: 'Home',      href: '/#home',      sectionId: 'home' },
  { label: 'Services',  href: '/#services',  sectionId: 'services' },
  { label: 'Portfolio', href: '/#portfolio', sectionId: 'portfolio' },
  { label: 'About',     href: '/#about',     sectionId: 'about' },

  { label: 'Contact',   href: '/contact',    sectionId: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') {
      // On /contact page highlight "Contact"
      setActiveSection('contact');
      return;
    }

    const sectionIds = navLinks
      .filter((l) => l.sectionId && l.href.startsWith('/#'))
      .map((l) => l.sectionId);

    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Fire when the section covers 30% of the viewport
          threshold: 0.3,
          rootMargin: '-80px 0px 0px 0px', // account for fixed navbar height
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = (sectionId) =>
    `px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
      activeSection === sectionId
        ? 'font-bold text-violet-700 bg-purple-50'
        : 'font-medium text-slate-800 hover:text-violet-700 hover:bg-purple-50/60'
    }`;

  const mobileLinkClass = (sectionId) =>
    `block w-full text-left px-4 py-3 text-sm rounded-xl transition-colors ${
      activeSection === sectionId
        ? 'font-bold text-violet-700 bg-purple-50'
        : 'font-medium text-slate-800 hover:text-violet-700 hover:bg-purple-50/60'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? 'shadow-sm border-b border-gray-100'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo size="sm" variant="dark" showLLP={false} className="mt-2" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith('/contact') ? (
                <Link
                  key={link.label}
                  to="/contact"
                  className={linkClass(link.sectionId)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={linkClass(link.sectionId)}
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm py-2.5 px-6">
              Get Started <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) =>
            link.href.startsWith('/contact') ? (
              <Link
                key={link.label}
                to="/contact"
                className={mobileLinkClass(link.sectionId)}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={mobileLinkClass(link.sectionId)}
              >
                {link.label}
              </button>
            )
          )}
          <div className="pt-3 pb-1">
            <Link to="/contact" className="btn-primary w-full justify-center">
              Get Started <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
