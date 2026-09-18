import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Team from '../components/Team';
import { FaArrowRight } from 'react-icons/fa';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 bg-[#0B1F6B] overflow-hidden text-left">
        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-10 pointer-events-none">
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-6 border border-white/20 bg-white/5 rounded-full"
          >
            <span className="text-xs font-semibold tracking-wide text-white uppercase">The People</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Meet Our Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10"
          >
            A passionate team of engineers, designers, and architects committed to building world-class software.
          </motion.p>
        </div>
      </section>

      <Team />

      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F6B] mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Want to Join Us?
          </h2>
          <p className="text-[#64748B] mb-10 text-lg max-w-2xl mx-auto">
            We are always looking for talented individuals to join our growing team.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white font-semibold rounded-lg hover:bg-[#1545B8] transition-colors">
            Get in Touch <FaArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
