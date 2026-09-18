import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, setActiveIndex } from '../features/testimonials/testimonialsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const defaultAvatars = [
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=25',
  'https://i.pravatar.cc/80?img=47',
  'https://i.pravatar.cc/80?img=33',
];

export default function Testimonials() {
  const dispatch = useDispatch();
  const { items, loading, activeIndex } = useSelector((s) => s.testimonials);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (items.length === 0) dispatch(fetchTestimonials());
  }, [dispatch, items.length]);

  if (loading || items.length === 0) return null;

  const current = items[activeIndex];

  const handlePrev = () => {
    dispatch(setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1));
  };
  const handleNext = () => {
    dispatch(setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1));
  };

  return (
    <>
      <section className="py-24 md:py-32 bg-[#FAFBFF] overflow-hidden mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full py-24 md:py-32 bg-[#FAFBFF] overflow-hidden mx-auto flex flex-col items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                  Client Love
                </div>
                <h2
                  className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  What Our Clients Say
                </h2>
              </motion.div>

              {/* Main testimonial card */}
              <div className="relative max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative bg-white rounded-3xl p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-100"
                  >
                    {/* Decorative quote */}
                    <div className="absolute top-8 right-10 text-[#1A56DB]/6 pointer-events-none">
                      <FaQuoteLeft size={80} />
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-1.5 mb-8">
                      {[...Array(current.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400" size={18} />
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-center text-[#111827] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                      "{current.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={current.avatar || defaultAvatars[activeIndex % defaultAvatars.length]}
                        alt={current.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-100"
                      />
                      <div className="text-center">
                        <p className="font-extrabold text-[#0B1F6B] text-[16px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {current.name}
                        </p>
                        <p className="text-slate-400 text-sm mt-0.5">
                          {current.role}{current.company ? `, ${current.company}` : ''}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Desktop Navigation */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-8 w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-2xl items-center justify-center hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all shadow-md hover:shadow-lg z-10"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-8 w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-2xl items-center justify-center hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all shadow-md hover:shadow-lg z-10"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>

              {/* Dots & Mobile Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="sm:hidden w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center hover:border-[#1A56DB] hover:text-[#1A56DB]"
                >
                  <FiChevronLeft size={18} />
                </button>
                <div className="flex justify-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => dispatch(setActiveIndex(i))}
                      className={`rounded-full transition-all duration-300 ${i === activeIndex
                          ? 'w-8 h-2.5 bg-[#1A56DB]'
                          : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="sm:hidden w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center hover:border-[#1A56DB] hover:text-[#1A56DB]"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              {/* Trust indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-3 mt-12 text-slate-400 text-sm"
              >
                <div className="flex -space-x-2">
                  {defaultAvatars.map((av, i) => (
                    <img key={i} src={av} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <span className="font-medium">Trusted by <strong className="text-[#0B1F6B]">50+ clients</strong> worldwide</span>
              </motion.div>
            </div>
          </section>

        </>