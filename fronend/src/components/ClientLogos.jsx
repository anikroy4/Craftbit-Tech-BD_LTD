import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Client logos as stylized text badges (SVG-based)
const clients = [
  { name: 'TechCorp',   color: '#1A56DB' },
  { name: 'BuildFast',  color: '#0B1F6B' },
  { name: 'Nexus AI',   color: '#6366F1' },
  { name: 'CloudBase',  color: '#0891B2' },
  { name: 'DataFlow',   color: '#059669' },
  { name: 'StartupX',  color: '#DC2626' },
  { name: 'Fintech BD', color: '#D97706' },
  { name: 'MediaPro',  color: '#7C3AED' },
  { name: 'EduSphere',  color: '#0284C7' },
  { name: 'LogiTrack',  color: '#16A34A' },
];

function LogoBadge({ client }) {
  return (
    <div className="flex items-center gap-2.5 px-7 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm mx-3 cursor-default select-none">
      {/* Colored dot as "logo mark" */}
      <div
        className="w-5 h-5 rounded-md flex-shrink-0"
        style={{ backgroundColor: client.color }}
      />
      <span className="text-[13px] font-bold text-slate-500 whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100 overflow-hidden mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
            Trusted by companies worldwide
          </p>
        </motion.div>
      </div>

      {/* Slow marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-slow" style={{ width: 'max-content' }}>
          {[...clients, ...clients, ...clients].map((client, i) => (
            <LogoBadge key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
