import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Portfolio from '../components/Portfolio';
import { FaArrowRight } from 'react-icons/fa';

export default function PortfolioPage() {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-6 border border-white/20 bg-white/5 rounded-full"
          >
            <span className="text-xs font-semibold tracking-wide text-white uppercase">Our Work</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Featured Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10"
          >
            Real-world software solutions we've built for clients across industries and continents.
          </motion.p>
        </div>
      </section>

      <Portfolio />

      <section className="py-20 bg-[#0B1F6B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Have a Project in Mind?
          </h2>
          <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto">
            Let's turn your idea into a powerful digital product.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white font-semibold rounded-lg hover:bg-[#1545B8] transition-colors">
            Let's Talk <FaArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
