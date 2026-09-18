import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const whyUs = [
  { icon: <FaCheckCircle />, title: 'End-to-End Delivery', desc: 'From discovery to deployment and beyond — we own the full lifecycle.' },
  { icon: <FaCheckCircle />, title: 'Agile & Transparent', desc: 'Weekly sprints, real-time updates, and clear communication at every step.' },
  { icon: <FaCheckCircle />, title: 'Scalable Architecture', desc: 'We build for growth — microservices, cloud-native, and future-proof tech.' },
  { icon: <FaCheckCircle />, title: 'Dedicated Support', desc: '24/7 post-launch support, SLAs, and continuous performance monitoring.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
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
            <span className="text-xs font-semibold tracking-wide text-white uppercase">What We Offer</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Software Engineering Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10"
          >
            From idea to production — we deliver robust, scalable software that drives business results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white font-semibold rounded-lg hover:bg-[#1545B8] transition-colors">
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </section>

      <Services />

      <section className="py-20 md:py-28 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12 max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#1A56DB] mb-3">Why CraftBit</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Why Choose Us?
            </h2>
            <p className="text-[#64748B] text-lg">
              We don't just write code — we solve problems with precision, creativity, and accountability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-8 bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-[#1A56DB] text-xl mt-1 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1F6B] mb-2">{item.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F6B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Build Something Great?
          </h2>
          <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto">
            Tell us about your project and get a free consultation within 24 hours.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white font-semibold rounded-lg hover:bg-[#1545B8] transition-colors">
            Start Your Project Today <FaArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
