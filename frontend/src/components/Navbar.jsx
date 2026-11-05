import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiX, FiArrowRight, FiSun, FiMoon, FiLock, FiLogOut, FiShield, FiUser } from 'react-icons/fi';
import { toggleThemeMode, logoutUser } from '../redux/appSlice';
import { toast } from 'sonner';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const { themeMode, currentUser, isAuthenticated } = useSelector((state) => state.app);

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
            {/* Dashboard: ONLY visible if authenticated with an authorized role (admin, superadmin, moderator) */}
            {isAuthenticated && currentUser && ['superadmin', 'admin', 'moderator'].includes(currentUser.role) && (
              <li>
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `nav-link flex items-center gap-1.5 ${isActive ? 'active text-sky-400' : ''}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
            )}
            <li className="mobile-cta flex flex-col gap-3">
              {isAuthenticated && currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="status-pill flex items-center justify-center gap-2 w-full text-center">
                    <span>{currentUser.role === 'superadmin' ? '👑' : currentUser.role === 'admin' ? '🛡️' : '⚖️'}</span>
                    <span>Logged in as <strong>{currentUser.name}</strong> ({currentUser.role})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(logoutUser());
                      setMobileMenuOpen(false);
                      toast.info('Signed out of portal');
                    }}
                    className="action-btn-danger flex items-center justify-center gap-2 w-full"
                    style={{ padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                  >
                    <FiLogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary flex items-center justify-center gap-1.5 flex-1"
                    style={{ padding: '0.75rem 1rem', fontSize: '0.88rem' }}
                  >
                    <FiLock size={14} className="text-sky-400" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/join"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary flex items-center justify-center gap-1.5 flex-1"
                    style={{ padding: '0.75rem 1rem', fontSize: '0.88rem', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                  >
                    <FiUser size={14} className="text-sky-400" />
                    <span>Join Team</span>
                  </Link>
                </div>
              )}

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
          {/* Auth Button or User Pill */}
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="status-pill flex items-center gap-1.5"
                title={`Logged in as ${currentUser.name} (${currentUser.role})`}
                style={{ padding: '0.35rem 0.85rem' }}
              >
                <span>{currentUser.role === 'superadmin' ? '👑' : currentUser.role === 'admin' ? '🛡️' : '⚖️'}</span>
                <span className="font-bold text-white text-xs max-w-[85px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => { dispatch(logoutUser()); toast.info('Signed out'); }}
                className="modal-close-btn"
                style={{ width: '32px', height: '32px' }}
                title="Sign out of portal"
                aria-label="Logout"
              >
                <FiLogOut size={14} className="text-rose-400" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login"
                className="action-btn flex items-center gap-1.5"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              >
                <FiLock size={12} className="text-sky-400" />
                <span>Sign In</span>
              </Link>
              <Link 
                to="/join"
                className="action-btn flex items-center gap-1.5"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
              >
                <FiUser size={12} className="text-sky-400" />
                <span>Join</span>
              </Link>
            </div>
          )}

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
