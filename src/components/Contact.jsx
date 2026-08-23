import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Mail, Phone, Globe, MapPin, Clock, Send, CheckCircle
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6';

const isBusinessOpen = () => {
  // IST = UTC+5:30
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const day = ist.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hour = ist.getHours() + ist.getMinutes() / 60;
  return day >= 1 && day <= 6 && hour >= 10 && hour < 19;
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const open = isBusinessOpen();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company || 'Not specified',
        interest: data.interest,
        message: data.message,
        _subject: `New Lead from Website: ${data.name} (${data.company || 'Individual'})`,
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/info@sociovance.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok || result.success === 'true' || result.success === true) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again or email info@sociovance.com directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Failed to send message. Please reach out directly to info@sociovance.com or call +91 70171 14214.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl lg:text-5xl mt-2 mb-4"
          >
            Let's build{' '}
            <span className="gradient-text">your brand</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto italic"
          >
            "Where creators become brands."
          </motion.p>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT: Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                    <CheckCircle size={40} className="text-violet-600" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">We've received your request and will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {submitError}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Priya Sharma"
                        className="input-field"
                        id="contact-name"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                        })}
                        placeholder="priya@brand.com"
                        type="email"
                        className="input-field"
                        id="contact-email"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      {...register('company')}
                      placeholder="Your Company or Channel Name"
                      className="input-field"
                      id="contact-company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      I'm Interested In *
                    </label>
                    <select
                      {...register('interest', { required: 'Please select an option' })}
                      className="input-field cursor-pointer"
                      id="contact-interest"
                    >
                      <option value="">Select a service...</option>
                      <option value="talent-management">Talent Management</option>
                      <option value="brand-partnerships">Brand Partnerships</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="content-creation">Content Creation</option>
                      <option value="performance-marketing">Performance marketing (Meta / Google)</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.interest && (
                      <p className="text-xs text-red-500 mt-1">{errors.interest.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Please tell us a bit more' })}
                      rows={5}
                      placeholder="Tell us about your goals, current follower count, or what you're looking to achieve..."
                      className="input-field resize-none"
                      id="contact-message"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Info card — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Main info card */}
            <div
              className="rounded-3xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 55%, #F97316 100%)' }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/15" />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl mb-1">Sociovance LLP</h3>
                <p className="text-pink-100 text-sm italic mb-5">"Where creators become brands."</p>

                <div className="space-y-3">
                  {[
                    { Icon: Mail, label: 'info@sociovance.com', href: 'mailto:info@sociovance.com' },
                    { Icon: Phone, label: '+91 70171 14214', href: 'tel:+917017114214' },
                    { Icon: Globe, label: 'sociovance.com', href: 'https://sociovance.com' },
                    { Icon: MapPin, label: 'New Delhi, India', href: 'https://maps.google.com/?q=New+Delhi,+India' },
                  ].map(({ Icon, label, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Icon size={15} />
                      </div>
                      {href ? (
                        <a href={href} className="text-sm text-white/95 hover:text-white font-medium transition-colors break-all">
                          {label}
                        </a>
                      ) : (
                        <span className="text-sm text-white/90">{label}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Focus areas */}
                <div className="mt-5 pt-5 border-t border-white/20">
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">Focus Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {['Talent Management', 'Brand Partnerships', 'Digital Marketing'].map((area) => (
                      <span key={area} className="text-xs bg-white/20 text-white/95 px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center border border-pink-100">
                  <Clock size={16} className="text-pink-600" />
                </div>
                <p className="font-bold text-slate-900">Business Hours</p>
              </div>
              <p className="text-slate-600 text-sm">Monday – Saturday</p>
              <p className="text-slate-900 font-bold">10:00 AM – 7:00 PM IST</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className={`w-2 h-2 rounded-full ${open ? 'bg-pink-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className={`text-xs font-semibold ${open ? 'text-pink-600' : 'text-slate-500'}`}>
                  {open ? 'Currently Open' : 'Currently Closed'}
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5">
              <p className="font-bold text-slate-900 mb-3">Follow Us</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/socio.vance/', color: 'hover:text-pink-600 hover:bg-pink-50' },
                  { Icon: FaLinkedinIn, label: 'LinkedIn', href: '#', color: 'hover:text-violet-700 hover:bg-purple-50' },
                  { Icon: FaYoutube, label: 'YouTube', href: '#', color: 'hover:text-pink-600 hover:bg-pink-50' },
                  { Icon: FaXTwitter, label: 'Twitter / X', href: '#', color: 'hover:text-slate-900 hover:bg-slate-100' },
                ].map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 text-sm font-medium transition-all duration-200 ${color}`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl bg-slate-50 border border-slate-200/80 px-8 py-5 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle size={16} className="text-violet-600" />
            </div>
            <span>Response within <strong className="text-slate-900">24 hours</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="#EC4899" />
              </svg>
            </div>
            <span><strong className="text-slate-900">100+</strong> creators managed</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C11.866 1 15 4.134 15 8s-3.134 7-7 7S1 11.866 1 8 4.134 1 8 1zm3.536 4.536L6.5 10.5 4.964 8.964" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span><strong className="text-slate-900">Free</strong> first consultation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="9" rx="2" stroke="#F97316" strokeWidth="1.5" />
                <path d="M5 4V3a3 3 0 016 0v1" stroke="#F97316" strokeWidth="1.5" />
              </svg>
            </div>
            <span><strong className="text-slate-900">Confidential</strong> &amp; secure</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

