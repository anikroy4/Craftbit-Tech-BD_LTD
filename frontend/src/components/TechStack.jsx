import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout, Server, Database, Cloud } from 'lucide-react';
import { techCategories, techLogos } from '../data/siteData';

const iconMap = { Layout, Server, Database, Cloud };

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-xs font-semibold text-blue-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-blue-400"
        />
      </div>
    </div>
  );
}

function LogoChip({ tech }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-white/15 transition-all duration-200 cursor-default group"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shadow-lg"
        style={{ background: `${tech.color}18`, border: `1px solid ${tech.color}30`, color: tech.color }}
      >
        {tech.letter}
      </div>
      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const active = techCategories[activeTab];

  return (
    <section id="tech" className="py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-px bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />

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
            Tech Stack
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            Our <span className="gradient-text">Expertise</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Battle-tested tools and technologies we use to build production-grade applications.
          </p>
        </motion.div>

        {/* MERN highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-6 mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="text-sm font-semibold text-slate-300">MERN Stack Core:</span>
          {[
            { label: 'M', name: 'MongoDB',    color: '#47A248' },
            { label: 'E', name: 'Express.js', color: '#ffffff' },
            { label: 'R', name: 'React',      color: '#61DAFB' },
            { label: 'N', name: 'Node.js',    color: '#339933' },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
                {item.label}
              </span>
              <span className="text-sm font-medium text-slate-300">{item.name}</span>
            </div>
          ))}
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            Full-Stack Experts
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: skill bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {techCategories.map((cat, i) => {
                const Icon = iconMap[cat.icon];
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === i
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <Icon size={14} />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {active.techs.map((tech, i) => (
                <SkillBar
                  key={tech.name}
                  name={tech.name}
                  level={tech.level}
                  inView={inView}
                  delay={0.3 + i * 0.08}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: logo grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
              All Technologies
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {techLogos.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                >
                  <LogoChip tech={tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
