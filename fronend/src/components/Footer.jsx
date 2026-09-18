import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub, FiInstagram, FiArrowRight, FiMail } from 'react-icons/fi';
import { useState } from 'react';

const footerLinks = {
  Company: [
    { label: 'About Us',  to: '/about' },
    { label: 'Our Team',  to: '/team' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Contact',   to: '/contact' },
  ],
  Services: [
    { label: 'Web Development',   to: '/services' },
    { label: 'Mobile Apps',       to: '/services' },
    { label: 'Cloud & DevOps',    to: '/services' },
    { label: 'AI & ML Solutions', to: '/services' },
    { label: 'UI/UX Design',      to: '/services' },
  ],
};

const socials = [
  { icon: FiFacebook,  href: '#', label: 'Facebook' },
  { icon: FiTwitter,   href: '#', label: 'Twitter' },
  { icon: FiLinkedin,  href: '#', label: 'LinkedIn' },
  { icon: FiGithub,    href: '#', label: 'GitHub' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    setEmail('');
    // Newsletter submission would go here
  };

  return (
    <footer className="bg-[#060F35] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#1A56DB] flex items-center justify-center font-extrabold text-white text-sm">
                CB
              </div>
              <span
                className="text-[15px] font-extrabold text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                CraftBit Tech BD
              </span>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-7">
              A top-rated software company delivering world-class custom software, SaaS products, and enterprise solutions from Bangladesh.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#1A56DB] hover:border-[#1A56DB] transition-all duration-200"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30 mb-6">
                {group}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30 mb-6">
              Newsletter
            </h4>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Get insights on software engineering and tech trends delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#1A56DB] transition-colors">
                <FiMail size={14} className="text-white/30 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-transparent text-white text-sm flex-1 outline-none placeholder-white/25"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A56DB] text-white text-sm font-semibold rounded-xl hover:bg-[#1545B8] transition-colors group"
              >
                Subscribe
                <FiArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            <p className="text-white/25 text-[11px] mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {year} CraftBit Tech BD Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, i) => (
              <span key={item} className="flex items-center">
                <a href="#" className="text-white/30 hover:text-white/70 text-xs transition-colors">
                  {item}
                </a>
                {i < 2 && <span className="text-white/15 mx-3">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
