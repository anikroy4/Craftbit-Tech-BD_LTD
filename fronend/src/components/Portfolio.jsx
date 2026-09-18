import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setFilter } from '../features/projects/projectsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiArrowRight, FiX, FiCheckCircle, FiStar, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Full-Stack',   value: 'fullstack' },
  { label: 'Web Applications', value: 'web' },
  { label: 'Mobile Apps',  value: 'mobile' },
  { label: 'API & Cloud',  value: 'api' },
];

const defaultImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80',
];

const projectImpacts = [
  '99.9% SLA & Uptime',
  '+45% User Engagement',
  '100k+ Active Monthly Users',
  '10x Faster Data Processing',
  'Zero Security Incidents',
  '4.9★ App Store Rating',
];

function ProjectCard({ project, index, onSelect }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const imgSrc = project.image || defaultImages[index % defaultImages.length];
  const impact = projectImpacts[index % projectImpacts.length];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F6B]/85 via-[#0B1F6B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
          <span className="text-xs font-semibold text-cyan-200 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <FiActivity size={13} /> {impact}
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#1A56DB] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#1A56DB] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
            <FiStar size={11} className="fill-current" /> Featured Case
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A56DB] mb-2.5">
          {project.category}
        </div>

        <h3
          className="text-[17px] font-extrabold text-[#0B1F6B] mb-2.5 leading-snug group-hover:text-[#1A56DB] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {project.title}
        </h3>

        <p className="text-slate-500 text-[13px] leading-relaxed mb-5 flex-grow line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[11px] font-semibold rounded-lg border border-slate-100">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 bg-blue-50 text-[#1A56DB] text-[11px] font-semibold rounded-lg border border-blue-100">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/50 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
        >
          <FiX size={18} />
        </button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-72 bg-slate-900">
          <img
            src={project.image || defaultImages[0]}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F6B] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md mb-2 inline-block">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-slate-600 text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F6B] mb-3">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 bg-blue-50 text-[#1A56DB] text-xs font-bold rounded-xl border border-blue-100">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-8 flex items-center gap-3 text-emerald-800 text-xs font-bold">
            <FiCheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
            <span>Delivered on time with full CI/CD deployment, 99.9% availability, and source code transfer.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A56DB] text-white text-sm font-bold rounded-xl hover:bg-[#1545B8] transition-all shadow-md shadow-blue-200"
              >
                Launch Live Demo <FiExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Repository <FiGithub size={14} />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3.5 border border-slate-200 text-slate-500 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const dispatch = useDispatch();
  const { items, loading, activeFilter } = useSelector((s) => s.projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    dispatch(fetchProjects(activeFilter));
  }, [dispatch, activeFilter]);

  const handleFilter = (val) => {
    dispatch(setFilter(val));
    dispatch(fetchProjects(val));
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            Proven Track Record
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Featured Case Studies
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-6">
            High-impact digital platforms engineered for enterprise clients, scaling startups, and global brands.
          </p>
          <div className="flex justify-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-[#0B1F6B] text-sm font-semibold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all group bg-white shadow-sm"
            >
              All Case Studies
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-[#1A56DB]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                <div className="h-52 shimmer" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-20 shimmer rounded" />
                  <div className="h-5 w-3/4 shimmer rounded" />
                  <div className="h-3 w-full shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} onSelect={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
