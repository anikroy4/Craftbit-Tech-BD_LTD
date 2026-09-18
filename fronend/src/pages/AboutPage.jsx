import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Stats from '../components/Stats';
import TechStack from '../components/TechStack';
import { FaArrowRight } from 'react-icons/fa';

export default function AboutPage() {
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
            <span className="text-xs font-semibold tracking-wide text-white uppercase">Our Story</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            About CraftBit Tech BD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10"
          >
            We are a top-tier software company dedicated to building smart, simple, and scalable solutions for businesses worldwide.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#1A56DB] mb-3">Who We Are</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F6B] mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Empowering Businesses Through Technology
              </h2>
              <p className="text-[#64748B] text-lg leading-relaxed mb-6">
                CraftBit Tech BD was founded with a clear mission: to bridge the gap between complex business challenges and elegant, scalable software solutions. Over the past 6+ years, we have grown into a trusted technology partner for startups, enterprises, and agencies across 15+ countries.
              </p>
              <p className="text-[#64748B] text-lg leading-relaxed mb-8">
                We believe in code that works, design that engages, and partnerships that last.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
                <h3 className="text-[#0B1F6B] font-bold text-xl mb-2">Our Mission</h3>
                <p className="text-[#64748B] text-sm">To build software that empowers businesses to scale and thrive in the digital age.</p>
              </div>
              <div className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E2E8F0] shadow-sm mt-8">
                <h3 className="text-[#0B1F6B] font-bold text-xl mb-2">Our Vision</h3>
                <p className="text-[#64748B] text-sm">To be the most trusted technology partner in the global software industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      
      <TechStack />

      <section className="py-20 bg-[#0B1F6B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Build Something Great?
          </h2>
          <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto">
            Let us help you turn your vision into reality.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white font-semibold rounded-lg hover:bg-[#1545B8] transition-colors">
            Start Your Project <FaArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
