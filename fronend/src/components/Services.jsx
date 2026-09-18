import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../features/services/servicesSlice';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  FaLaptopCode, FaCloudUploadAlt, FaBuilding, FaMobileAlt,
  FaProjectDiagram, FaPencilRuler, FaServer, FaBrain,
} from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const iconMap = {
  FaLaptopCode:    { icon: FaLaptopCode,    color: 'text-blue-500',    bg: 'bg-blue-50',    border: 'group-hover:border-blue-200' },
  FaCloudUploadAlt:{ icon: FaCloudUploadAlt, color: 'text-cyan-500',    bg: 'bg-cyan-50',    border: 'group-hover:border-cyan-200' },
  FaBuilding:      { icon: FaBuilding,       color: 'text-indigo-500',  bg: 'bg-indigo-50',  border: 'group-hover:border-indigo-200' },
  FaMobileAlt:     { icon: FaMobileAlt,      color: 'text-violet-500',  bg: 'bg-violet-50',  border: 'group-hover:border-violet-200' },
  FaProjectDiagram:{ icon: FaProjectDiagram, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'group-hover:border-emerald-200' },
  FaPencilRuler:   { icon: FaPencilRuler,    color: 'text-rose-500',    bg: 'bg-rose-50',    border: 'group-hover:border-rose-200' },
  FaServer:        { icon: FaServer,         color: 'text-orange-500',  bg: 'bg-orange-50',  border: 'group-hover:border-orange-200' },
  FaBrain:         { icon: FaBrain,          color: 'text-pink-500',    bg: 'bg-pink-50',    border: 'group-hover:border-pink-200' },
};

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const meta = iconMap[service.icon] || iconMap.FaLaptopCode;
  const IconComp = meta.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white rounded-2xl p-7 border border-slate-100 flex flex-col h-full
        transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 ${meta.border}`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-all duration-300
        ${meta.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100`}
      />

      {/* Icon */}
      <div className={`w-13 h-13 rounded-2xl ${meta.bg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
        style={{ width: '52px', height: '52px' }}
      >
        <IconComp size={22} className={meta.color} />
      </div>

      {/* Title */}
      <h3
        className="text-[18px] font-extrabold text-[#0B1F6B] mb-3 leading-tight"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-7">
        {service.features.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-600">
            <FiCheckCircle className={`${meta.color} mt-0.5 flex-shrink-0`} size={13} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/services"
        className={`inline-flex items-center gap-2 text-[13px] font-bold ${meta.color} transition-all mt-auto group/link`}
      >
        Learn More
        <FiArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-100 p-7 flex flex-col gap-4">
      <div className="w-13 h-13 rounded-2xl shimmer" style={{ width: '52px', height: '52px' }} />
      <div className="h-5 w-2/3 rounded-lg shimmer" />
      <div className="h-3.5 w-full rounded shimmer" />
      <div className="h-3.5 w-5/6 rounded shimmer" />
      <div className="h-3.5 w-4/6 rounded shimmer" />
    </div>
  );
}

export default function Services() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.services);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (items.length === 0) dispatch(fetchServices());
  }, [dispatch, items.length]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
              What We Do
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] leading-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Comprehensive Software<br />Engineering Services
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              From idea to deployment — we cover the full development lifecycle with expert teams and proven processes.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-[#0B1F6B] text-sm font-semibold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all shrink-0 group"
          >
            All Services
            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s, i) => (
              <ServiceCard key={s._id} service={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
