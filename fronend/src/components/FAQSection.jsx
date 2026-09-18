import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPlus, FiMinus, FiSearch, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    q: 'How long does it typically take to build a custom web application?',
    a: 'Timelines vary based on complexity. A typical MVP takes 4–8 weeks, while enterprise-grade platforms may take 3–6 months. We provide a detailed timeline estimate during our initial consultation.',
    category: 'Timeline & Process',
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'We specialize in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and Kubernetes. Our full-stack teams are also experienced with GraphQL, Redis, and microservices architectures.',
    category: 'Technology',
  },
  {
    q: 'Do you offer post-launch support and maintenance?',
    a: 'Definitely. We offer flexible support packages including 24/7 SLA monitoring, bug fixes, feature updates, performance optimizations, and security patches.',
    category: 'Support & Maintenance',
  },
  {
    q: 'How do you handle project communication and transparency?',
    a: 'We use Slack, Jira, and weekly video standups. You\'ll have a dedicated project manager and real-time access to your project board. No surprises — full transparency at every stage.',
    category: 'Timeline & Process',
  },
  {
    q: 'Can you work with an existing codebase or only greenfield projects?',
    a: 'We work with both. Our team frequently joins ongoing projects for code audits, refactoring, feature additions, or full modernization of legacy systems.',
    category: 'Technology',
  },
  {
    q: 'What does your pricing model look like?',
    a: 'We offer fixed-price contracts for well-scoped projects and time-and-materials for evolving requirements. We provide transparent quotes with no hidden fees — everything is agreed upon upfront.',
    category: 'Pricing & IP',
  },
  {
    q: 'Do you sign NDAs and protect client IP?',
    a: 'Yes, we routinely sign NDAs before project discussions. All intellectual property developed for your project belongs entirely to you upon final handover.',
    category: 'Pricing & IP',
  },
  {
    q: 'Are you able to build and deploy mobile applications?',
    a: 'Yes. We build native iOS and Android apps using React Native, as well as Flutter for cross-platform needs with offline sync and app store compliance.',
    category: 'Technology',
  },
];

const categories = ['All', 'Timeline & Process', 'Technology', 'Pricing & IP', 'Support & Maintenance'];

function FAQItem({ question, answer, category, isOpen, onToggle, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-[#1A56DB]/40 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-7 py-5.5 text-left"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A56DB]">{category}</span>
          <span
            className={`text-[15px] font-bold leading-snug transition-colors ${
              isOpen ? 'text-[#1A56DB]' : 'text-[#0B1F6B]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {question}
          </span>
        </div>
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
            <div className="px-7 pb-6 pt-1 border-t border-slate-100/60">
              <p className="text-slate-600 text-[14px] leading-relaxed">
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
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    const matchesSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            Client Knowledge Base
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Clear answers regarding our development process, tech stack, pricing, and SLA terms.
          </p>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-[#1A56DB] focus:ring-4 focus:ring-blue-50 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-100'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-[#1A56DB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <FiHelpCircle size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-semibold">No questions found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                index={i}
                question={faq.q}
                answer={faq.a}
                category={faq.category}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        )}

        {/* Bottom Contact Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-14 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#0B1F6B] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Have a Specific Question for Our Tech Leads?
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Our software architects are online to review your project specs and answer any questions.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A56DB] text-white text-sm font-bold rounded-2xl hover:bg-[#1545B8] transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200"
          >
            Ask Us Directly
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
