import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaFigma, FaPython,
} from 'react-icons/fa';
import {
  SiMongodb, SiExpress, SiRedux, SiTailwindcss, SiTypescript,
  SiPostgresql, SiFirebase, SiGraphql, SiKubernetes, SiNextdotjs, SiRedis,
} from 'react-icons/si';

const techStack = [
  { icon: <FaReact />,        name: 'React.js',   category: 'Frontend', color: '#61DAFB', level: '98% Proficiency' },
  { icon: <SiNextdotjs />,    name: 'Next.js 15', category: 'Frontend', color: '#000000', level: '95% Proficiency' },
  { icon: <SiTypescript />,   name: 'TypeScript', category: 'Frontend', color: '#3178C6', level: '96% Proficiency' },
  { icon: <SiRedux />,        name: 'Redux Toolkit',category: 'Frontend',color: '#764ABC', level: '92% Proficiency' },
  { icon: <SiTailwindcss />,  name: 'Tailwind CSS',category: 'Frontend',color: '#06B6D4', level: '99% Proficiency' },
  { icon: <FaNodeJs />,       name: 'Node.js',    category: 'Backend',  color: '#339933', level: '97% Proficiency' },
  { icon: <SiExpress />,      name: 'Express.js', category: 'Backend',  color: '#000000', level: '95% Proficiency' },
  { icon: <FaPython />,       name: 'Python / AI', category: 'Backend', color: '#3776AB', level: '90% Proficiency' },
  { icon: <SiGraphql />,      name: 'GraphQL',    category: 'Backend',  color: '#E10098', level: '88% Proficiency' },
  { icon: <SiMongodb />,      name: 'MongoDB',    category: 'Database', color: '#47A248', level: '96% Proficiency' },
  { icon: <SiPostgresql />,   name: 'PostgreSQL', category: 'Database', color: '#336791', level: '94% Proficiency' },
  { icon: <SiRedis />,        name: 'Redis Cache',category: 'Database', color: '#DC382D', level: '91% Proficiency' },
  { icon: <SiFirebase />,     name: 'Firebase',   category: 'Database', color: '#FFCA28', level: '92% Proficiency' },
  { icon: <FaDocker />,       name: 'Docker',     category: 'DevOps',   color: '#2496ED', level: '94% Proficiency' },
  { icon: <SiKubernetes />,   name: 'Kubernetes', category: 'DevOps',   color: '#326CE5', level: '88% Proficiency' },
  { icon: <FaAws />,          name: 'AWS Cloud',  category: 'DevOps',   color: '#FF9900', level: '95% Proficiency' },
  { icon: <FaGitAlt />,       name: 'Git / CI/CD',category: 'DevOps',   color: '#F05032', level: '98% Proficiency' },
  { icon: <FaFigma />,        name: 'Figma UI',   category: 'Design',   color: '#F24E1E', level: '93% Proficiency' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Design'];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredTech = activeTab === 'All'
    ? techStack
    : techStack.filter(t => t.category === activeTab);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            Modern Tech Ecosystem
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Battle-Tested Tech Stack
          </h2>
          <p className="text-slate-500 text-lg">
            We build with cutting-edge, enterprise-grade frameworks designed for maximum speed, security, and scalability.
          </p>
        </motion.div>

        {/* Continuous Bi-directional Marquees */}
        <div className="relative overflow-hidden mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap gap-4" style={{ width: 'max-content' }}>
            {[...techStack.slice(0, 9), ...techStack.slice(0, 9)].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-default">
                <span className="text-xl" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-4" style={{ width: 'max-content' }}>
            {[...techStack.slice(9), ...techStack.slice(9)].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-default">
                <span className="text-xl" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-[#0B1F6B] text-white shadow-lg shadow-indigo-900/20'
                  : 'bg-slate-50 text-slate-600 border border-slate-200/70 hover:bg-slate-100 hover:text-[#0B1F6B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Grid Display */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-slate-50/70 rounded-2xl p-5 border border-slate-100/90 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/60 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform"
                  style={{ color: tech.color }}
                >
                  {tech.icon}
                </div>
                <h4 className="text-xs font-extrabold text-[#0B1F6B] mb-1">{tech.name}</h4>
                <span className="text-[10px] text-slate-400 font-semibold">{tech.level}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
