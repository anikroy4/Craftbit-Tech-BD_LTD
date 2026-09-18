import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor, Smartphone, Cloud, Bot, ShieldCheck,
  BarChart3, ArrowRight, Check,
} from 'lucide-react';
import { services } from '../data/siteData';

const iconMap = { Monitor, Smartphone, Cloud, Bot, ShieldCheck, BarChart3 };

const colorMap = {
  blue:    { bg: 'rgba(59,130,246,0.1)',   border: 'rgba(59,130,246,0.25)',   icon: '#3b82f6',  badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  purple:  { bg: 'rgba(139,92,246,0.1)',   border: 'rgba(139,92,246,0.25)',   icon: '#8b5cf6',  badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  cyan:    { bg: 'rgba(6,182,212,0.1)',    border: 'rgba(6,182,212,0.25)',    icon: '#06b6d4',  badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  emerald: { bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.25)',   icon: '#10b981',  badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  orange:  { bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.25)',   icon: '#f97316',  badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  pink:    { bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.25)',   icon: '#ec4899',  badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
};

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const Icon  = iconMap[service.icon] || Monitor;
  const c     = colorMap[service.color] || colorMap.blue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative glass-card p-7 cursor-default"
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${c.icon}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        <Icon size={22} style={{ color: c.icon }} />
      </div>

      {/* Title */}
      <h3 className="font-display font-700 text-[17px] text-white mb-2.5 group-hover:text-blue-50 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
            <Check size={13} style={{ color: c.icon }} className="shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Learn more link */}
      <button
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group/link"
        style={{ color: c.icon }}
      >
        Learn more
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
      </button>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-28 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-blue-600/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            What We Do
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            Services That{' '}
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            From concept to deployment, we deliver full-spectrum digital solutions
            tailored to your business needs and goals.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 mb-4">Need something custom?</p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold text-sm rounded-xl transition-all duration-200"
          >
            Discuss Your Project <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
