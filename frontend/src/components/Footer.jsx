import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../data/siteData';
import {
  FaGithub, FaLinkedin, FaFacebook, FaTwitter,
} from 'react-icons/fa';

const socialIconMap = { Github: FaGithub, Linkedin: FaLinkedin, Facebook: FaFacebook, Twitter: FaTwitter };

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile Apps',     href: '#services' },
      { label: 'Cloud & DevOps',  href: '#services' },
      { label: 'AI & Automation', href: '#services' },
      { label: 'UI/UX Design',    href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',   href: '#about' },
      { label: 'Portfolio',  href: '#portfolio' },
      { label: 'Tech Stack', href: '#tech' },
      { label: 'Careers',    href: '#contact' },
      { label: 'Blog',       href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '#' },
      { label: 'Terms of Service',  href: '#' },
      { label: 'Cookie Policy',     href: '#' },
      { label: 'Refund Policy',     href: '#' },
    ],
  },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-6 opacity-30" />
                  <div className="relative w-9 h-9 bg-linear-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-sm tracking-tight">CB</span>
                  </div>
                </div>
                <div>
                  <div className="font-display font-800 text-[17px] text-white tracking-tight leading-none">CraftBit</div>
                  <div className="text-[10px] font-semibold tracking-[2px] uppercase text-blue-400">Tech BD</div>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-5">
                Building world-class digital products with the MERN stack.
                Your trusted technology partner from Bangladesh to the world.
              </p>

              {/* Social */}
              <div className="flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = socialIconMap[s.icon];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-[1.5px] mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter strip */}
          <div className="glass-card p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-display font-700 text-white text-sm mb-0.5">Stay Updated</div>
              <div className="text-xs text-slate-400">Get the latest news and updates from CraftBit Tech BD</div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 bg-white/4 border border-white/10 focus:border-blue-500/50 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl btn-glow transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} CraftBit Tech BD Ltd. All rights reserved.
              Built with ❤️ in Dhaka, Bangladesh.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
              <button
                onClick={scrollTop}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200"
                aria-label="Back to top"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
