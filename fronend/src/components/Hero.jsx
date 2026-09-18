import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiZap } from 'react-icons/fi';
import { HiOutlineCheckCircle } from 'react-icons/hi';

const badges = ['React', 'Node.js', 'MongoDB', 'Next.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'Figma', 'Kubernetes'];

const trustPoints = [
  '150+ Projects Delivered',
  '50+ Happy Clients',
  '15+ Countries Served',
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0B1F6B] via-[#0f2882] to-[#0B1F6B]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* ── Left Content ── */}
        <div className="flex-1 text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 border border-white/20 bg-white/8 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-white/90 uppercase">
              Top Software Company · Bangladesh
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-extrabold text-white leading-[1.08] mb-7 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We Engineer
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              World-Class
            </span>
            <br />
            Software
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white/60 max-w-lg mb-8 leading-relaxed"
          >
            CraftBit Tech BD delivers cutting-edge custom software, SaaS products, and enterprise solutions for startups and corporations worldwide.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10"
          >
            {trustPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-white/75 text-sm font-medium">
                <HiOutlineCheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
                {p}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#1A56DB] text-sm font-bold rounded-2xl hover:bg-blue-50 transition-all duration-200 shadow-2xl shadow-black/20 group"
            >
              Start a Project
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>

        {/* ── Right: AI Visual ── */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-4 bg-blue-400/20 rounded-3xl blur-2xl" />

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-float">
            <img
              src="/hero-visual.jpg"
              alt="Software Engineering Dashboard"
              className="w-full h-auto object-cover"
            />
            {/* Overlay gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1F6B]/80 to-transparent" />

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3 text-white"
            >
              <div className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>150+</div>
              <div className="text-[11px] text-white/70 font-semibold uppercase tracking-wider">Projects Delivered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute top-6 right-6 glass rounded-2xl px-5 py-3 text-white"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[12px] font-bold text-white/90">Available for Projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Tech Marquee Bottom Strip ── */}
      <div className="absolute bottom-0 w-full border-t border-white/8 bg-black/15 backdrop-blur-sm overflow-hidden py-3.5">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...badges, ...badges].map((b, i) => (
            <span key={i} className="text-[11px] font-bold font-mono text-white/30 mx-8 uppercase tracking-[0.2em]">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
