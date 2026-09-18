import { motion } from 'framer-motion';
import Team from '../components/Team';
import CTABanner from '../components/CTABanner';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-24 bg-[#0B1F6B] overflow-hidden text-center">
        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-10 pointer-events-none">
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1.5 mb-6 border border-white/20 bg-white/5 rounded-full backdrop-blur-sm"
          >
            <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase">The Leadership & Engineering Team</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Meet Our Software Engineers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed mx-auto"
          >
            A passionate team of senior developers, system architects, and UX designers dedicated to building digital excellence.
          </motion.p>
        </div>
      </section>

      <Team />

      <CTABanner />
    </div>
  );
}
