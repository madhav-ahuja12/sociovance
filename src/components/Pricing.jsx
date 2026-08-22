import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap, Star, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    icon: <Zap size={22} />,
    price: '₹15,000',
    period: '/month',
    desc: 'Perfect for emerging creators ready to take their first steps toward professionalism.',
    color: 'text-slate-900',
    bg: 'bg-purple-50/50',
    border: 'border-purple-100',
    gradient: 'from-violet-500 to-purple-700',
    features: [
      'Talent onboarding & profile setup',
      'Monthly content strategy',
      'Up to 2 brand partnership pitches',
      'Basic analytics report',
      'Email support',
      '1 platform managed',
    ],
    missing: ['Paid ad management', 'Dedicated account manager', 'Custom campaign creation'],
    popular: false,
  },
  {
    name: 'Growth',
    icon: <Star size={22} />,
    price: '₹35,000',
    period: '/month',
    desc: 'For growing creators and small brands ready to scale rapidly across platforms.',
    color: 'text-slate-900',
    bg: 'bg-pink-50/50',
    border: 'border-pink-200',
    gradient: 'from-pink-500 to-rose-600',
    features: [
      'Full talent management',
      'Weekly content strategy & calendar',
      'Up to 5 brand partnership pitches',
      'Paid ad management (Meta + Google)',
      'Detailed monthly analytics report',
      '3 platforms managed',
      'Dedicated account manager',
      'Priority email & WhatsApp support',
    ],
    missing: ['Custom campaign creation'],
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: <Building2 size={22} />,
    price: 'Custom',
    period: '',
    desc: 'Full-scale management for established creators and brands with complex needs.',
    color: 'text-slate-900',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    gradient: 'from-purple-900 via-pink-900 to-orange-900',
    features: [
      'Complete white-glove management',
      'Daily content strategy & execution',
      'Unlimited brand partnership pitches',
      'Full paid ad management',
      'Custom campaign creation & production',
      'All platforms managed',
      'Dedicated team (manager + strategist)',
      'Weekly performance calls',
      'SLA-backed 4-hour response time',
    ],
    missing: [],
    popular: false,
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag"
          >
            Pricing Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl lg:text-5xl mt-2 mb-4"
          >
            Simple,{' '}
            <span className="gradient-text">transparent pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            No hidden fees. No lock-in contracts. Scale up or down as you grow.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden ${
                plan.popular
                  ? 'shadow-card-hover ring-2 ring-pink-500'
                  : 'shadow-card border border-slate-100'
              } bg-white`}
            >
              {plan.popular && (
                <div
                  className="text-center text-white text-xs font-bold py-2 tracking-wider uppercase"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                >
                  ✦ Most Popular
                </div>
              )}

              <div className="p-7 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg">{plan.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className={`text-4xl font-display font-bold ${plan.color}`}>{plan.price}</span>
                  <span className="text-slate-500 text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{plan.desc}</p>

                {/* CTA */}
                <Link
                  to="/contact"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 mb-7 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'border-2 border-violet-600 text-violet-600 hover:bg-purple-50'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Talk to Sales' : 'Get Started'}
                  <ArrowRight size={16} />
                </Link>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-6" />

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-r from-violet-600 to-pink-500"
                      >
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 text-sm">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f, j) => (
                    <div key={j} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 1L7 7M7 1L1 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-slate-500 text-sm line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          All plans include a 7-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;

