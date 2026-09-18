import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiCode, FiCheckSquare, FiRocket } from 'react-icons/fi';

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Discovery & Planning',
    description: 'We dive deep into your business goals, technical requirements, and user needs to craft a precise project roadmap.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    number: '02',
    icon: FiCode,
    title: 'Design & Development',
    description: 'Our engineers and designers work in agile sprints — shipping iterative, high-quality code with continuous feedback loops.',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    number: '03',
    icon: FiCheckSquare,
    title: 'Testing & QA',
    description: 'Rigorous automated and manual testing ensures your product is bulletproof before it reaches your users.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    number: '04',
    icon: FiRocket,
    title: 'Launch & Support',
    description: 'We handle deployment, monitoring, and provide ongoing maintenance so your software runs flawlessly at scale.',
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
            How We Work
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Proven Development Process
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A structured, transparent workflow that delivers on time, every time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`relative w-[104px] h-[104px] rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center mb-7 group-hover:scale-105 transition-all`}>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                    <span className="text-[10px] font-extrabold text-[#0B1F6B]">{step.number}</span>
                  </div>
                  <step.icon size={36} className={step.color} />
                </div>

                <h3
                  className="text-[17px] font-extrabold text-[#0B1F6B] mb-3 leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
