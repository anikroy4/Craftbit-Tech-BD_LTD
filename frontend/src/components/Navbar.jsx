import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiX, FiArrowRight, FiSun, FiMoon } from 'react-icons/fi';
import { toggleThemeMode } from '../redux/appSlice';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.app.themeMode);

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
            <li className="mobile-cta flex flex-col gap-3">
              <button
                type="button"
                onClick={() => dispatch(toggleThemeMode())}
                className="btn-secondary flex items-center justify-center gap-2 w-full"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
                aria-label="Toggle dark/light theme"
              >
                {themeMode === 'light' ? (
                  <>
                    <FiMoon size={16} className="text-indigo-400" />
                    <span>Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <FiSun size={16} className="text-amber-400" />
                    <span>Switch to Light Mode</span>
                  </>
                )}
              </button>
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
          {/* Theme Mode Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => dispatch(toggleThemeMode())}
            title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {themeMode === 'light' ? (
              <FiMoon size={18} className="text-indigo-600 transition-transform hover:-rotate-12" />
            ) : (
              <FiSun size={18} className="text-amber-300 transition-transform hover:rotate-45" />
            )}
          </button>

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
