import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const WHATSAPP_NUMBER = '917017114214';
const WHATSAPP_MESSAGE = "Hi Sociovance! I'd like to know more about your services.";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWATooltip, setShowWATooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp button */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {showWATooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg"
            >
              Chat on WhatsApp
              <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-float-btn"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowWATooltip(true)}
          onMouseLeave={() => setShowWATooltip(false)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          style={{ background: '#25D366' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.668 4.8 1.832 6.8L2 30l7.4-1.8A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="white" fillOpacity="0.15"/>
            <path d="M16 3.5C9.096 3.5 3.5 9.096 3.5 16c0 2.303.617 4.466 1.695 6.33L3.5 28.5l6.35-1.663A12.455 12.455 0 0016 28.5c6.904 0 12.5-5.596 12.5-12.5S22.904 3.5 16 3.5zm6.19 17.18c-.26.73-1.515 1.395-2.07 1.44-.555.045-1.08.265-3.635-.755-3.075-1.24-5.04-4.395-5.19-4.6-.15-.205-1.22-1.625-1.22-3.1s.77-2.2 1.045-2.5c.275-.3.6-.375.8-.375l.575.01c.185.01.435-.07.68.52l.875 2.19c.085.215.14.465.005.735l-.32.615-.33.45c-.12.155-.245.32-.105.63.14.31.625 1.03 1.34 1.665.92.82 1.695 1.075 1.935 1.195.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12l1.72.81c.2.1.335.15.385.235.05.085.05.49-.21 1.22z" fill="white"/>
          </svg>
          <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: '#25D366' }} />
        </motion.a>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 shadow-card hover:shadow-card-hover hover:border-pink-500 hover:text-pink-600 transition-colors duration-200"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
