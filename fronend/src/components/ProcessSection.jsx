import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiCode, FiCheckSquare, FiCheckCircle } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Discovery & Architecture',
    description: 'We analyze your business objectives, map out domain logic, and formulate a future-proof system architecture.',
    deliverables: ['System Architecture', 'UI Wireframes', 'Tech Stack Mapping'],
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    number: '02',
    icon: FiCode,
    title: 'Agile Development',
    description: 'Our senior engineers build your product in transparent 2-week sprints with continuous staging deployments.',
    deliverables: ['Bi-Weekly Demos', 'Clean Codebase', 'API Integration'],
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    number: '03',
    icon: FiCheckSquare,
    title: 'QA & Security Audits',
    description: 'Comprehensive automated unit testing, end-to-end integration tests, and security vulnerability scanning.',
    deliverables: ['Automated Tests', 'Security Compliance', 'Load Testing'],
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    number: '04',
    icon: FaRocket,
    title: 'Deployment & SLA Support',
    description: 'Seamless cloud deployment with automated CI/CD pipelines, real-time APM monitoring, and 24/7 SLA maintenance.',
    deliverables: ['Zero-Downtime Launch', 'Live Monitoring', '24/7 Support'],
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

export default function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            How We Execute
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Engineering Methodology
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A battle-tested 4-stage process engineered for speed, quality, and complete transparency.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 to-amber-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center bg-white rounded-3xl p-7 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
              >
                {/* Icon circle */}
                <div className={`relative w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  {/* Number badge */}
                  <div className="absolute -top-2.5 -right-2.5 px-2.5 py-0.5 rounded-full bg-[#0B1F6B] text-white text-[10px] font-extrabold shadow-md">
                    {step.number}
                  </div>
                  <step.icon size={30} className={step.color} />
                </div>

                <h3
                  className="text-[17px] font-extrabold text-[#0B1F6B] mb-3 leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 flex-grow">
                  {step.description}
                </p>

                {/* Deliverables Tags */}
                <div className="w-full pt-4 border-t border-slate-100/80 space-y-2 text-left">
                  {step.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                      <FiCheckCircle size={13} className={step.color} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
