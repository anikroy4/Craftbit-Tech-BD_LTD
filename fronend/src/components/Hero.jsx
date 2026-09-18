import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiCode, FiCpu, FiGlobe, FiLayers } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const badges = ['React 19', 'Node.js', 'MongoDB', 'Next.js 15', 'TypeScript', 'AWS Cloud', 'Docker', 'GraphQL', 'Python AI', 'Kubernetes'];

const trustPoints = [
  '150+ Enterprise Projects Delivered',
  '50+ Global Happy Clients',
  '99.9% Uptime & SLA Guarantee',
];

const floatingTech = [
  { icon: FiCode, label: 'React 19', pos: 'top-8 -left-6', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
  { icon: FiCpu, label: 'AI & Data', pos: 'bottom-20 -left-8', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
  { icon: FiGlobe, label: 'AWS Cloud', pos: 'top-16 -right-6', color: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  { icon: FiLayers, label: 'Microservices', pos: 'bottom-10 -right-6', color: 'bg-violet-500/20 text-violet-300 border-violet-400/30' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#071343] via-[#0B1F6B] to-[#050E34]"
    mx-auto >
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Glowing atmospheric light orbs */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-blue-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-10 left-1/3 w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 flex flex-col lg:flex-row items-center gap-14 lg:gap-16">

        {/* ── Left Content ── */}
        <div className="flex-1 text-left">

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 border border-white/15 bg-white/5 rounded-full backdrop-blur-md shadow-lg shadow-black/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-bold tracking-[0.16em] text-white/90 uppercase flex items-center gap-1.5">
              Top Software Engineering Agency <HiSparkles size={12} className="text-cyan-300" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-extrabold text-white leading-[1.06] mb-7 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We Engineer
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
              World-Class
            </span>
            <br />
            Digital Solutions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white/70 max-w-xl mb-9 leading-relaxed font-normal"
          >
            CraftBit Tech BD transforms high-ambition ideas into high-performance web platforms, enterprise SaaS, and AI-driven applications for global industry leaders.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-10"
          >
            {trustPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-white/85 text-xs sm:text-sm font-semibold">
                <FiCheckCircle className="text-cyan-400 flex-shrink-0" size={16} />
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
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0B1F6B] text-sm font-bold rounded-2xl hover:bg-cyan-50 hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-300 group"
            >
              Start Your Project
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white text-sm font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Explore Our Work
            </Link>
          </motion.div>
        </div>

        {/* ── Right: AI & Tech Visual ── */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          {/* Ambient Glow behind image */}
          <div className="absolute inset-2 bg-gradient-to-tr from-blue-600/30 to-cyan-400/20 rounded-3xl blur-2xl" />

          {/* Main Hero Card Container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#091852]/80 backdrop-blur-xl animate-float">
            <img
              src="/hero-visual.jpg"
              alt="CraftBit Tech Software Engineering Dashboard"
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />

            {/* Subtle Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#050E34] via-[#050E34]/60 to-transparent pointer-events-none" />

            {/* Floating Tech Badges */}
            {floatingTech.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.15 }}
                className={`hidden sm:flex absolute ${item.pos} items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md border ${item.color} shadow-lg pointer-events-none z-20`}
              >
                <item.icon size={15} />
                <span className="text-xs font-bold whitespace-nowrap">{item.label}</span>
              </motion.div>
            ))}

            {/* Bottom floating stat widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3.5 border border-white/20 text-white z-20"
            >
              <div className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>150+</div>
              <div className="text-[11px] text-cyan-200 font-semibold uppercase tracking-wider">Completed Projects</div>
            </motion.div>

            {/* Top Right Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute top-6 right-6 glass rounded-2xl px-4 py-2.5 border border-white/20 text-white z-20"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11.5px] font-bold text-white/90">Accepting Q3/Q4 Projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Marquee Bottom Strip ── */}
      <div className="absolute bottom-0 w-full border-t border-white/10 bg-[#040C2C]/80 backdrop-blur-md overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...badges, ...badges, ...badges].map((b, i) => (
            <span key={i} className="text-[11px] font-bold font-mono text-cyan-200/50 mx-7 uppercase tracking-[0.22em] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-cyan-400/40" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
