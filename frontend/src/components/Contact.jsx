import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Mail, Phone, Globe, Send, CheckCircle2 } from 'lucide-react';
import { contactInfo, socialLinks } from '../data/siteData';
import {
  FaGithub, FaLinkedin, FaFacebook, FaTwitter,
} from 'react-icons/fa';

const iconMap  = { MapPin, Mail, Phone, Globe };
const socialIconMap = { Github: FaGithub, Linkedin: FaLinkedin, Facebook: FaFacebook, Twitter: FaTwitter };

const SERVICES = [
  'Full-Stack Web Development',
  'Mobile App Development',
  'Cloud & DevOps',
  'AI & Automation',
  'UI/UX Design',
  'Other',
];

function InputField({ label, id, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-blue-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white/4 border border-white/10 hover:border-white/20 focus:border-blue-500/60 focus:bg-white/6 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });

  const handle = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Get In Touch
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Have a project in mind? We'd love to hear about it. Send us a message
            and we'll get back to you within 2 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Left: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {contactInfo.map((info, i) => {
              const Icon = iconMap[info.icon];
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass-card p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-sm font-medium text-white">{info.value}</div>
                    <div className="text-xs text-slate-400">{info.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Social links */}
            <div className="glass-card p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass-card p-5 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-slate-300 font-medium">
                Currently accepting new projects
              </span>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 size={56} className="text-emerald-400 mb-5" />
                  <h3 className="font-display font-black text-2xl text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-400 max-w-sm">
                    Thanks for reaching out. We'll review your project details and get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }); }}
                    className="mt-6 px-5 py-2.5 border border-white/10 hover:border-blue-500/30 text-slate-300 hover:text-white text-sm rounded-xl transition-all duration-200"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Full Name" id="name" value={form.name} onChange={handle('name')} placeholder="John Doe" required />
                    <InputField label="Email Address" id="email" type="email" value={form.email} onChange={handle('email')} placeholder="john@example.com" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Company" id="company" value={form.company} onChange={handle('company')} placeholder="Your Company" />
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={handle('service')}
                        className="w-full px-4 py-3 bg-white/4 border border-white/10 hover:border-white/20 focus:border-blue-500/60 rounded-xl text-white text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0f1f35]">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s} className="bg-[#0f1f35]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['< $1K', '$1K–$5K', '$5K–$20K', '$20K+', 'Not sure'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, budget: b }))}
                          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                            form.budget === b
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-white/4 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Project Details <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={handle('message')}
                      placeholder="Tell us about your project — goals, timeline, tech requirements, etc."
                      required
                      className="w-full px-4 py-3 bg-white/4 border border-white/10 hover:border-white/20 focus:border-blue-500/60 focus:bg-white/6 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl btn-glow transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
