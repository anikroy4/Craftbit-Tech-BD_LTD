import { Link } from 'react-router-dom';
import { 
  FiGithub, FiLinkedin, FiFacebook, FiTwitter, FiMail, 
  FiPhone, FiMapPin, FiArrowUp, FiHeart
} from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="brand mb-4 inline-flex items-center">
              <img 
                src="/logo.png" 
                alt="CraftBit Tech BD Logo" 
                className="brand-logo-img"
              />
              <div className="brand-text">
                CraftBit <span className="text-sky-400">Tech BD</span>
                <span className="brand-sub">LTD</span>
              </div>
            </Link>
            <p className="footer-desc">
              Pioneering high-velocity software engineering, scalable cloud systems, and next-gen AI automation from Dhaka, Bangladesh to global enterprises.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <FiGithub size={17} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <FiLinkedin size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                <FiFacebook size={17} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
                <FiTwitter size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/services">Software Services</Link></li>
              <li><Link to="/portfolio">Selected Case Studies</Link></li>
              <li><Link to="/about">About & Leadership</Link></li>
              <li><Link to="/contact">Request Estimate</Link></li>
            </ul>
          </div>

          {/* Core Tech Offerings */}
          <div>
            <h4 className="footer-col-title">Core Services</h4>
            <ul className="footer-links">
              <li>Full-Stack Web Development</li>
              <li>React Native Mobile Apps</li>
              <li>AWS Cloud & DevOps Automation</li>
              <li>Custom LLM & AI Agents</li>
              <li>Cybersecurity Hardening</li>
              <li>Figma UI/UX Design Systems</li>
            </ul>
          </div>

          {/* Dhaka Headquarters */}
          <div>
            <h4 className="footer-col-title">Dhaka Office</h4>
            <div className="footer-contact-items">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <FiMapPin className="text-sky-400 mt-0.5 shrink-0" size={16} />
                <span className="leading-snug">15-A/A1, Lane 2, Gopibagh, Dhaka-1203, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiMail className="text-sky-400 shrink-0" size={16} />
                <a href="mailto:craftbittechbd@gmail.com" className="hover:text-white transition-colors">
                  craftbittechbd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiPhone className="text-sky-400 shrink-0" size={16} />
                <a href="tel:01774381687" className="hover:text-white transition-colors">
                  01774381687
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} CraftBit Tech BD Ltd. Built with</span>
            <FiHeart className="text-rose-500 shrink-0 inline-block" size={14} />
            <span>in Dhaka, Bangladesh.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Scroll to top">
              <FiArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
