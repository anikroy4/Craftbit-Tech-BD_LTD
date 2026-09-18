import { motion } from 'framer-motion';
import Stats from '../components/Stats';
import TechStack from '../components/TechStack';
import ProcessSection from '../components/ProcessSection';
import CTABanner from '../components/CTABanner';
import { FiAward, FiTarget, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const values = [
  { icon: FiAward, title: 'Engineering Rigor', desc: 'We adhere to clean code principles, test automation, and robust architectural patterns.' },
  { icon: FiTarget, title: 'Results-Oriented', desc: 'Every line of code is measured by the business velocity and value it unlocks for our clients.' },
  { icon: FiUsers, title: 'Transparent Collaboration', desc: 'Direct access to senior engineers with weekly video standups and continuous communication.' },
  { icon: FiTrendingUp, title: 'Built to Scale', desc: 'Cloud-native infrastructure and microservices designed to effortlessly handle exponential growth.' },
];

export default function AboutPage() {
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
            <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase">Our Story & DNA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            About CraftBit Tech BD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed mx-auto"
          >
            We are a premier software engineering firm dedicated to building high-performance, simple, and scalable digital solutions for world-class enterprises.
          </motion.p>
        </div>
      </section>

      {/* Mission & Team Showcase */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            {/* Left Narrative */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F6B] mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Empowering Global Enterprises Through Advanced Engineering
              </h2>
              <p className="text-[#64748B] text-base sm:text-lg leading-relaxed mb-6">
                CraftBit Tech BD was founded with an unyielding mission: to bridge the gap between complex enterprise challenges and elegant, hyper-scalable software solutions.
              </p>
              <p className="text-[#64748B] text-base sm:text-lg leading-relaxed mb-8">
                Over the past 6+ years, our agile engineering teams have delivered 150+ mission-critical platforms for startups, Fortune 500 partners, and agencies across 15+ countries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-[#0B1F6B] font-extrabold text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Mission</h3>
                  <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">To engineer world-class software that empowers businesses to scale with speed and certainty.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-[#0B1F6B] font-extrabold text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Vision</h3>
                  <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">To be the most trusted international software engineering firm delivering pure technical excellence.</p>
                </div>
              </div>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  alt="CraftBit Tech BD Software Engineering Team"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F6B]/80 via-transparent to-transparent" />
                
                {/* Floating Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold text-[#1A56DB] uppercase tracking-wider">Top Engineering Culture</p>
                    <p className="text-sm font-extrabold text-[#0B1F6B]">Agile • Collaborative • Transparent</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <FiCheckCircle size={14} /> 100% On-Time
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
              Core Principles
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F6B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Values That Drive Our Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#FAFBFF] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1A56DB] flex items-center justify-center mb-6">
                  <v.icon size={24} />
                </div>
                <h4 className="font-extrabold text-[#0B1F6B] text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      
      <TechStack />

      <ProcessSection />

      <CTABanner />
    </div>
  );
}
