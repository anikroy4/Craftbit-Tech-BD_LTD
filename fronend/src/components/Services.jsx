import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../features/services/servicesSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  FaLaptopCode, FaCloudUploadAlt, FaBuilding, FaMobileAlt,
  FaProjectDiagram, FaPencilRuler, FaServer, FaBrain,
} from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle, FiX, FiZap, FiShield } from 'react-icons/fi';

const iconMap = {
  FaLaptopCode:    { icon: FaLaptopCode,    color: 'text-blue-500',    bg: 'bg-blue-50',    border: 'group-hover:border-blue-200', category: 'Web & SaaS' },
  FaCloudUploadAlt:{ icon: FaCloudUploadAlt, color: 'text-cyan-500',    bg: 'bg-cyan-50',    border: 'group-hover:border-cyan-200', category: 'Cloud & DevOps' },
  FaBuilding:      { icon: FaBuilding,       color: 'text-indigo-500',  bg: 'bg-indigo-50',  border: 'group-hover:border-indigo-200', category: 'Enterprise' },
  FaMobileAlt:     { icon: FaMobileAlt,      color: 'text-violet-500',  bg: 'bg-violet-50',  border: 'group-hover:border-violet-200', category: 'Mobile & Apps' },
  FaProjectDiagram:{ icon: FaProjectDiagram, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'group-hover:border-emerald-200', category: 'Cloud & DevOps' },
  FaPencilRuler:   { icon: FaPencilRuler,    color: 'text-rose-500',    bg: 'bg-rose-50',    border: 'group-hover:border-rose-200', category: 'UI/UX Design' },
  FaServer:        { icon: FaServer,         color: 'text-orange-500',  bg: 'bg-orange-50',  border: 'group-hover:border-orange-200', category: 'Cloud & DevOps' },
  FaBrain:         { icon: FaBrain,          color: 'text-pink-500',    bg: 'bg-pink-50',    border: 'group-hover:border-pink-200', category: 'AI & ML' },
};

const categories = ['All', 'Web & SaaS', 'Mobile & Apps', 'Cloud & DevOps', 'AI & ML', 'Enterprise'];

function ServiceCard({ service, index, onSelect }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const meta = iconMap[service.icon] || iconMap.FaLaptopCode;
  const IconComp = meta.icon;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(service)}
      className={`group relative bg-white rounded-2xl p-7 border border-slate-100/90 flex flex-col h-full cursor-pointer
        transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1.5 ${meta.border}`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-all duration-300
        ${meta.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100`}
      />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-6">
        <div className={`w-13 h-13 rounded-2xl ${meta.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
          style={{ width: '52px', height: '52px' }}
        >
          <IconComp size={22} className={meta.color} />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
          {meta.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[18px] font-extrabold text-[#0B1F6B] mb-3 leading-tight group-hover:text-[#1A56DB] transition-colors"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>

      {/* Features List */}
      <ul className="space-y-2 mb-7">
        {service.features.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-600">
            <FiCheckCircle className={`${meta.color} mt-0.5 flex-shrink-0`} size={13} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Trigger Link */}
      <div
        className={`inline-flex items-center gap-2 text-[13px] font-bold ${meta.color} transition-all mt-auto group/link`}
      >
        Explore Specifications
        <FiArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
      </div>
    </motion.div>
  );
}

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  const meta = iconMap[service.icon] || iconMap.FaLaptopCode;
  const IconComp = meta.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <FiX size={18} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
            <IconComp size={26} className={meta.color} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A56DB]">{meta.category}</span>
            <h3 className="text-2xl font-extrabold text-[#0B1F6B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {service.title}
            </h3>
          </div>
        </div>

        <p className="text-slate-600 text-base leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h4 className="text-sm font-bold text-[#0B1F6B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <FiZap className="text-amber-500" /> Key Features & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs font-semibold">
                  <FiCheckCircle className={meta.color} size={15} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
            <FiShield className="text-[#1A56DB] text-lg flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              All {service.title} projects come with dedicated project management, CI/CD pipeline automation, automated testing, and 24/7 post-launch maintenance.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A56DB] text-white text-sm font-bold rounded-xl hover:bg-[#1545B8] transition-all shadow-md shadow-blue-200"
          >
            Request Proposal for {service.title}
            <FiArrowRight size={14} />
          </Link>
          <button
            onClick={onClose}
            className="px-6 py-3.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.services);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (items.length === 0) dispatch(fetchServices());
  }, [dispatch, items.length]);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(s => {
        const meta = iconMap[s.icon];
        return meta && meta.category === selectedCategory;
      });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAFBFF]">
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
            Engineering Excellence
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Comprehensive Software<br />Engineering Services
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            End-to-end software development tailored to accelerate business growth and ensure enterprise resilience.
          </p>
          <div className="flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-[#0B1F6B] text-sm font-semibold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all group bg-white shadow-sm"
            >
              Full Services Overview
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:border-blue-200 hover:text-[#1A56DB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 p-7 flex flex-col gap-4 bg-white">
                <div className="w-13 h-13 rounded-2xl shimmer" style={{ width: '52px', height: '52px' }} />
                <div className="h-5 w-2/3 rounded-lg shimmer" />
                <div className="h-3.5 w-full rounded shimmer" />
                <div className="h-3.5 w-5/6 rounded shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((s, i) => (
                <ServiceCard key={s._id} service={s} index={i} onSelect={setSelectedService} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
