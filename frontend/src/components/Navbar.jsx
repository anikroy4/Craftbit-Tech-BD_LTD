import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiLayers, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        {/* Brand Logo */}
        <Link to="/" className="brand group">
          <img 
            src="/logo.png" 
            alt="CraftBit Tech BD Logo" 
            className="brand-logo-img"
          />
          <div className="brand-text">
            CraftBit <span className="text-sky-400">Tech BD</span>
            <div className="brand-sub">LTD</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink 
                to="/" 
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/portfolio" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
            <li className="mobile-cta">
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary flex items-center justify-center gap-2 w-full"
                style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
              >
                <span>Get a Free Quote</span>
                <FiArrowRight size={15} />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Action & Mobile Hamburger */}
        <div className="nav-actions">
          {/* <div className="status-pill hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">Accepting Q3/Q4 Projects</span>
          </div> */}

          <Link 
            to="/contact" 
            className="btn-primary desktop-quote-btn" 
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
          >
            <span>Get a Quote</span>
            <FiArrowRight size={15} />
          </Link>

          <button 
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
