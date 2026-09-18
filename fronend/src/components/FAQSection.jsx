import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    q: 'How long does it typically take to build a custom web application?',
    a: 'Timelines vary based on complexity. A typical MVP takes 6–12 weeks, while enterprise-grade platforms may take 3–6 months. We provide a detailed timeline estimate during our initial consultation.',
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'We specialize in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and Kubernetes. Our full-stack teams are also experienced with GraphQL, Redis, and microservices architectures.',
  },
  {
    q: 'Do you offer post-launch support and maintenance?',
    a: 'Absolutely. We offer flexible support packages including bug fixes, feature updates, performance monitoring, and security patches — ensuring your product stays robust long after launch.',
  },
  {
    q: 'How do you handle project communication and transparency?',
    a: 'We use Slack, Jira, and weekly video standups. You\'ll have a dedicated project manager and real-time access to your project board. No surprises — full transparency at every stage.',
  },
  {
    q: 'Can you work with an existing codebase or only greenfield projects?',
    a: 'We work with both. Our team frequently joins ongoing projects for code audits, refactoring, feature additions, or full modernization of legacy systems.',
  },
  {
    q: 'What does your pricing model look like?',
    a: 'We offer fixed-price contracts for well-scoped projects and time-and-materials for evolving requirements. We provide transparent quotes with no hidden fees — everything is agreed upon upfront.',
  },
  {
    q: 'Do you sign NDAs and protect client IP?',
    a: 'Yes, we routinely sign NDAs before project discussions. All intellectual property developed for your project belongs entirely to you. Our contracts clearly state full IP transfer.',
  },
  {
    q: 'Are you able to build and deploy mobile applications?',
    a: 'Yes. We build native iOS and Android apps using React Native, as well as Flutter for cross-platform needs. Our mobile apps are optimized for performance, offline support, and app store compliance.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-[#1A56DB]/30 bg-blue-50/30 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
      >
        <span
          className={`text-[15px] font-bold leading-snug transition-colors ${
            isOpen ? 'text-[#1A56DB]' : 'text-[#0B1F6B]'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {question}
        </span>
        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-[#1A56DB] text-white rotate-0' : 'bg-slate-100 text-slate-500'
        }`}>
          {isOpen ? <FiMinus size={15} /> : <FiPlus size={15} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-7 pb-6">
              <p className="text-slate-500 text-[14px] leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
            FAQ
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before starting your project with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 text-sm mb-4">
            Still have questions? We're happy to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A56DB] text-white text-sm font-bold rounded-2xl hover:bg-[#1545B8] transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
