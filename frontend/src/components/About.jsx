import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Code2, Users, Trophy, ArrowRight } from 'lucide-react';
import { aboutData } from '../data/siteData';

const iconMap = { Zap, Code2, Users, Trophy };

const colorAvatarMap = {
  blue: 'from-blue-600 to-blue-400',
  purple: 'from-violet-600 to-violet-400',
  cyan: 'from-cyan-600 to-cyan-400',
  emerald: 'from-emerald-600 to-emerald-400',
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left — text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-badge mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {aboutData.badge}
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6 leading-tight tracking-tight">
              {aboutData.headline.split(',').map((part, i) => (
                i === 0
                  ? <span key={i}>{part},<br /></span>
                  : <span key={i} className="gradient-text">{part}</span>
              ))}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4 text-lg">
              {aboutData.description}
            </p>
            <p className="text-slate-500 leading-relaxed text-base italic border-l-2 border-blue-500/40 pl-4">
              "{aboutData.mission}"
            </p>
            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl btn-glow transition-colors duration-200"
            >
              Work With Us <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          {/* Right — values grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {aboutData.values.map((v, i) => {
              const Icon = iconMap[v.icon];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass-card p-6 text-center group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/15 transition-colors">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <h4 className="font-display font-700 text-white text-sm mb-1.5">{v.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Team ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-3 tracking-tight">
              Meet the <span className="gradient-text">Team</span>
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              A small, tight-knit team of senior engineers and designers obsessed with quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {aboutData.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${colorAvatarMap[member.color]} flex items-center justify-center mx-auto mb-4 text-white font-black text-lg shadow-lg`}>
                  {member.initials}
                </div>
                <h4 className="font-display font-700 text-white text-sm mb-1">{member.name}</h4>
                <p className="text-xs text-slate-400">{member.role}</p>

                {/* Social hint */}
                <div className="mt-3 flex justify-center">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Available
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
