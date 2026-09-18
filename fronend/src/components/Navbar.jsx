import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNav, closeNav, setScrolled } from '../features/ui/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const links = [
  { to: '/',          label: 'Home' },
  { to: '/services',  label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about',     label: 'About' },
  { to: '/team',      label: 'Team' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { navOpen, scrolled } = useSelector((s) => s.ui);

  useEffect(() => {
    const onScroll = () => dispatch(setScrolled(window.scrollY > 40));
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [dispatch]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm py-0'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between" style={{ height: '72px' }}>

        {/* Logo */}
        <Link to="/" onClick={() => dispatch(closeNav())}
          className="flex items-center gap-3 group shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-sm transition-all duration-300 ${scrolled ? 'bg-[#1A56DB]' : 'bg-white/20 border border-white/30'}`}>
            CB
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-[15px] font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#0B1F6B]' : 'text-white'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              CraftBit <span className={scrolled ? 'text-[#1A56DB]' : 'text-blue-300'}>Tech BD</span>
            </span>
            <span className={`text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-slate-400' : 'text-white/50'}`}>
              Software Excellence
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-[13.5px] font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? scrolled ? 'text-[#1A56DB] bg-blue-50' : 'text-white bg-white/15'
                    : scrolled
                      ? 'text-slate-600 hover:text-[#1A56DB] hover:bg-slate-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link to="/contact"
            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
              scrolled
                ? 'bg-[#1A56DB] text-white hover:bg-[#1545B8] shadow-sm hover:shadow-lg hover:shadow-blue-200'
                : 'bg-white text-[#1A56DB] hover:bg-blue-50'
            }`}
          >
            Start a Project →
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => dispatch(toggleNav())}
          className={`lg:hidden p-2.5 rounded-xl transition-colors ${
            scrolled ? 'text-[#0B1F6B] hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {navOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {links.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  onClick={() => dispatch(closeNav())}
                  className={({ isActive }) =>
                    `px-4 py-3 text-[15px] font-semibold rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#1A56DB]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#1A56DB]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => dispatch(closeNav())}
                className="mt-3 px-5 py-3.5 text-center text-[15px] font-bold rounded-xl bg-[#1A56DB] text-white hover:bg-[#1545B8] transition-colors shadow-lg shadow-blue-200">
                Start a Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
