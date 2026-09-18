import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code2, Star } from 'lucide-react';
import { portfolioCategories, projects } from '../data/siteData';

const colorMap = {
  blue:    { gradient: 'from-blue-600/20 to-blue-900/10',  badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',   dot: 'bg-blue-500' },
  purple:  { gradient: 'from-violet-600/20 to-violet-900/10', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', dot: 'bg-violet-500' },
  emerald: { gradient: 'from-emerald-600/20 to-emerald-900/10', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-500' },
  orange:  { gradient: 'from-orange-600/20 to-orange-900/10', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', dot: 'bg-orange-500' },
  cyan:    { gradient: 'from-cyan-600/20 to-cyan-900/10',  badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',   dot: 'bg-cyan-500' },
  pink:    { gradient: 'from-pink-600/20 to-pink-900/10',  badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',   dot: 'bg-pink-500' },
};

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = colorMap[project.color] || colorMap.blue;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="group relative glass-card overflow-hidden cursor-pointer"
    >
      {/* Featured star */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/25">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-semibold text-yellow-400">Featured</span>
        </div>
      )}

      {/* Gradient background panel */}
      <div className={`h-40 bg-gradient-to-br ${c.gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.gradient} border border-white/10 flex items-center justify-center backdrop-blur-sm`}>
          <Code2 size={28} className="text-white/60" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <a
              href={project.link}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium"
            >
              <ExternalLink size={14} /> View Project
            </a>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category badge */}
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.badge} mb-3`}>
          {project.category}
        </span>

        <h3 className="font-display font-700 text-white text-base mb-2 leading-snug group-hover:text-blue-50 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/4 border border-white/8 text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Our Work
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            Products We've <span className="gradient-text">Shipped</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Real projects, real impact. Here's a curated selection of our best work
            across industries and platforms.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 mb-4">More projects available upon request</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl btn-glow transition-colors"
          >
            Start Your Project →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
