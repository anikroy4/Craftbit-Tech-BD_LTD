import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/siteData';

const avatarColors = {
  blue:    'from-blue-600 to-blue-400',
  purple:  'from-violet-600 to-violet-400',
  cyan:    'from-cyan-600 to-cyan-400',
  emerald: 'from-emerald-600 to-emerald-400',
  orange:  'from-orange-600 to-orange-400',
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 });

  const go = useCallback((direction) => {
    setDir(direction);
    setCurrent((c) =>
      direction === 1
        ? (c + 1) % testimonials.length
        : (c - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go]);

  const t = testimonials[current];

  const variants = {
    enter: (d)  => ({ opacity: 0, x: d > 0 ? 60  : -60 }),
    center:      { opacity: 1, x: 0 },
    exit: (d)   => ({ opacity: 0, x: d > 0 ? -60 : 60  }),
  };

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      {/* Glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Testimonials
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Don't take our word for it — hear directly from our clients around the world.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* Quote icon bg */}
            <Quote
              size={120}
              className="absolute top-6 right-6 text-blue-500/5"
              strokeWidth={1}
            />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 font-medium italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColors[t.color]} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-display font-700 text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="absolute bottom-8 right-8 sm:right-12 flex items-center gap-3">
              {/* Dots */}
              <div className="flex items-center gap-1.5 mr-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? 'w-5 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full border border-white/10 hover:border-blue-500/40 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full border border-white/10 hover:border-blue-500/40 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Avatar strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 gap-3"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[t.color]} flex items-center justify-center text-white text-xs font-black transition-all duration-300 ${
                i === current ? 'scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-[#020408]' : 'opacity-50 hover:opacity-80'
              }`}
            >
              {t.avatar}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
