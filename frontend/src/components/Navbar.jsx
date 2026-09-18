import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <motion.a
              href="#home"
              onClick={() => handleNav('#home')}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon mark */}
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm tracking-tight">CB</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-800 text-[17px] text-white tracking-tight">
                  CraftBit
                </span>
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-blue-400">
                  Tech BD
                </span>
              </div>
            </motion.a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`nav-link relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    active === link.href
                      ? 'text-blue-400'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => handleNav('#contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl btn-glow transition-colors duration-200"
              >
                Hire Us
                <span className="text-blue-200">→</span>
              </motion.button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/40 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#060c14]/95 backdrop-blur-xl border-b border-blue-500/10 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    active === link.href
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-3 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl text-center btn-glow"
              >
                Hire Us →
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
