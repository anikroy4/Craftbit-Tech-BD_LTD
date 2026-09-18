import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiGlobe, FiBriefcase, FiAward } from 'react-icons/fi';

const stats = [
  { number: 150, suffix: '+', label: 'Projects Delivered', icon: FiBriefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  { number: 50,  suffix: '+', label: 'Happy Clients',      icon: FiUsers,     color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { number: 15,  suffix: '+', label: 'Countries Served',   icon: FiGlobe,     color: 'text-violet-500',  bg: 'bg-violet-50' },
  { number: 6,   suffix: '+', label: 'Years Experience',   icon: FiAward,     color: 'text-amber-500',   bg: 'bg-amber-50' },
];

function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="rounded-2xl border border-slate-100 bg-white p-6 lg:p-8 transition-all duration-300 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 text-center">
                {/* Icon */}
                <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <s.icon size={22} className={s.color} />
                </div>

                {/* Number */}
                <div
                  className="text-4xl lg:text-5xl font-extrabold text-[#0B1F6B] mb-2 tabular-nums"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Counter target={s.number} suffix={s.suffix} inView={inView} />
                </div>

                {/* Label */}
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
                  {s.label}
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 ${s.color.replace('text-', 'bg-')} rounded-full transition-all duration-500 group-hover:w-16`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
