import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import ProcessSection from '../components/ProcessSection';
import FAQSection from '../components/FAQSection';
import CTABanner from '../components/CTABanner';
import { FaCheckCircle } from 'react-icons/fa';

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
            <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase">What We Offer</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Software Engineering Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed mx-auto"
          >
            From concept to production — we deliver robust, scalable software that drives real business results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A56DB] text-white font-bold rounded-xl hover:bg-[#1545B8] transition-all shadow-lg shadow-blue-900/30">
              Get a Free Technical Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Services />

      <ProcessSection />

      <section className="py-20 md:py-28 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-3">Why CraftBit</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Why Leading Companies Choose Us
            </h2>
            <p className="text-[#64748B] text-lg">
              We solve complex engineering challenges with precision, speed, and continuous accountability.
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
                className="flex gap-4 p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-[#1A56DB] text-xl mt-1 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1F6B] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <CTABanner />
    </div>
  );
}
