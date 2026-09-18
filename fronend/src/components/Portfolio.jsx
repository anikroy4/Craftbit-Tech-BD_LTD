import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setFilter } from '../features/projects/projectsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const filters = [
  { label: 'All',       value: 'all' },
  { label: 'Full-Stack',value: 'fullstack' },
  { label: 'Web',       value: 'web' },
  { label: 'Mobile',    value: 'mobile' },
  { label: 'API',       value: 'api' },
];

const defaultImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80',
];

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const imgSrc = project.image || defaultImages[index % defaultImages.length];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F6B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end gap-3 p-5">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#1A56DB] transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink size={15} />
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={15} />
            </a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#1A56DB] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A56DB] mb-3">
          {project.category}
        </div>

        <h3
          className="text-[17px] font-extrabold text-[#0B1F6B] mb-2.5 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {project.title}
        </h3>

        <p className="text-slate-500 text-[13px] leading-relaxed mb-5 flex-grow line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-semibold rounded-lg border border-slate-100">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2.5 py-1 bg-slate-50 text-slate-400 text-[11px] font-semibold rounded-lg border border-slate-100">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const dispatch = useDispatch();
  const { items, loading, activeFilter } = useSelector((s) => s.projects);
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
              Our Work
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Featured Projects
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              Real-world solutions we've built for clients across industries and continents.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-[#0B1F6B] text-sm font-semibold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all shrink-0 group"
          >
            All Projects
            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-[#1A56DB] text-white shadow-lg shadow-blue-200'
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
              <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
                <div className="h-52 shimmer" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-20 shimmer rounded" />
                  <div className="h-5 w-3/4 shimmer rounded" />
                  <div className="h-3 w-full shimmer rounded" />
                  <div className="h-3 w-5/6 shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
