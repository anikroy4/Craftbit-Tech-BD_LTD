import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaFigma,
} from 'react-icons/fa';
import {
  SiMongodb, SiExpress, SiRedux, SiTailwindcss, SiTypescript,
  SiPostgresql, SiFirebase, SiGraphql, SiKubernetes, SiNextdotjs,
} from 'react-icons/si';

const techStack = [
  { icon: <FaReact />,        name: 'React.js',   category: 'Frontend', color: '#61DAFB' },
  { icon: <SiNextdotjs />,    name: 'Next.js',    category: 'Frontend', color: '#000000' },
  { icon: <SiRedux />,        name: 'Redux',      category: 'Frontend', color: '#764ABC' },
  { icon: <SiTailwindcss />,  name: 'Tailwind',   category: 'Frontend', color: '#06B6D4' },
  { icon: <SiTypescript />,   name: 'TypeScript', category: 'Frontend', color: '#3178C6' },
  { icon: <FaNodeJs />,       name: 'Node.js',    category: 'Backend',  color: '#339933' },
  { icon: <SiExpress />,      name: 'Express',    category: 'Backend',  color: '#000000' },
  { icon: <SiGraphql />,      name: 'GraphQL',    category: 'Backend',  color: '#E10098' },
  { icon: <SiMongodb />,      name: 'MongoDB',    category: 'Database', color: '#47A248' },
  { icon: <SiPostgresql />,   name: 'PostgreSQL', category: 'Database', color: '#336791' },
  { icon: <SiFirebase />,     name: 'Firebase',   category: 'Database', color: '#FFCA28' },
  { icon: <FaDocker />,       name: 'Docker',     category: 'DevOps',   color: '#2496ED' },
  { icon: <SiKubernetes />,   name: 'Kubernetes', category: 'DevOps',   color: '#326CE5' },
  { icon: <FaAws />,          name: 'AWS',        category: 'DevOps',   color: '#FF9900' },
  { icon: <FaGitAlt />,       name: 'Git',        category: 'DevOps',   color: '#F05032' },
  { icon: <FaFigma />,        name: 'Figma',      category: 'Design',   color: '#F24E1E' },
];

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Design'];
const categoryColors = {
  Frontend: { text: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-100' },
  Backend:  { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  Database: { text: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100' },
  DevOps:   { text: 'text-orange-600',  bg: 'bg-orange-50',  border: 'border-orange-100' },
  Design:   { text: 'text-rose-600',    bg: 'bg-rose-50',    border: 'border-rose-100' },
};

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            Our Stack
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Technologies We Master
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Battle-tested tools and frameworks that power scalable, production-ready software.
          </p>
        </motion.div>

        {/* Row 1 Marquee → */}
        <div className="relative overflow-hidden mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap gap-4" style={{ width: 'max-content' }}>
            {[...techStack.slice(0, 8), ...techStack.slice(0, 8)].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-default">
                <span className="text-xl" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee ← */}
        <div className="relative overflow-hidden mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-4" style={{ width: 'max-content' }}>
            {[...techStack.slice(8), ...techStack.slice(8)].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-default">
                <span className="text-xl" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat) => {
            const c = categoryColors[cat];
            const items = techStack.filter((t) => t.category === cat);
            return (
              <div
                key={cat}
                className={`rounded-2xl p-5 border ${c.border} ${c.bg} transition-all duration-300 hover:shadow-lg`}
              >
                <h4 className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${c.text} mb-4`}>
                  {cat}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((t) => (
                    <li key={t.name} className="flex items-center gap-2.5">
                      <span className="text-base" style={{ color: t.color }}>{t.icon}</span>
                      <span className="text-[12.5px] font-semibold text-slate-600">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
