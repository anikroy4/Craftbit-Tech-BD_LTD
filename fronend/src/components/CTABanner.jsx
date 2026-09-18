import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function CTABanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundImage: 'url(/cta-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F6B]/95 via-[#0B1F6B]/85 to-[#1A56DB]/70" />

          {/* Glowing orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-cyan-500/15 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-10 md:px-16 py-16">

            {/* Left text */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Projects
              </div>
              <h2
                className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ready to Build Something
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"> Extraordinary?</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                Let's turn your vision into a world-class digital product. Book a free 30-minute discovery call with our team today.
              </p>
            </div>

            {/* Right CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#1A56DB] text-sm font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-2xl group"
              >
                Start a Project
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:hello@craftbittechbd.com"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 border border-white/25 text-white text-sm font-semibold rounded-2xl hover:bg-white/15 hover:border-white/40 transition-all"
              >
                <FiCalendar size={15} />
                Book a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
