import { useDispatch, useSelector } from 'react-redux';
import { updateField, submitContact, resetForm } from '../features/contact/contactSlice';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMapPin, FiMail, FiPhone, FiClock, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const contactInfo = [
  { icon: FiMapPin,  label: 'Address', value: 'Dhaka, Bangladesh',          color: 'text-blue-500',    bg: 'bg-blue-50' },
  { icon: FiMail,    label: 'Email',   value: 'hello@craftbittechbd.com',    color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: FiPhone,   label: 'Phone',   value: '+880 1XXX-XXXXXX',            color: 'text-violet-500',  bg: 'bg-violet-50' },
  { icon: FiClock,   label: 'Hours',   value: 'Sun–Thu: 9AM – 6PM',          color: 'text-amber-500',   bg: 'bg-amber-50' },
];

const services = [
  'Custom Software Development',
  'SaaS Product Development',
  'Enterprise Web Application',
  'Mobile App Development',
  'API & Microservices',
  'UI/UX Design',
  'Cloud & DevOps',
  'AI & Machine Learning',
  'General Inquiry',
];

export default function ContactForm() {
  const dispatch = useDispatch();
  const { formData, loading, success, error } = useSelector((s) => s.contact);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (success) {
      toast.success("Message sent! We'll get back to you within 24 hours. 🚀");
      setTimeout(() => dispatch(resetForm()), 5000);
    }
    if (error) toast.error(error);
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    dispatch(submitContact(formData));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
            Get In Touch
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Start Your Next Project
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Info Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Dark card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1F6B] to-[#0f2882] p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3
                  className="text-2xl font-extrabold mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  CraftBit Tech BD
                </h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  We respond to all project inquiries within one business day.
                </p>

                <div className="space-y-5">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                        <item.icon size={16} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.18em] mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-semibold text-sm text-white/90">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick perks */}
            <div className="rounded-2xl border border-slate-100 bg-[#FAFBFF] p-6">
              <h4 className="text-sm font-extrabold text-[#0B1F6B] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Why Choose Us?
              </h4>
              {[
                'Free project consultation',
                'Detailed proposal within 24h',
                'Flexible engagement models',
                'Dedicated project manager',
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 mb-3 last:mb-0">
                  <FiCheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-600 text-[13px] font-medium">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-slate-100 bg-[#FAFBFF] p-8 md:p-10">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <FiCheckCircle size={36} className="text-emerald-500" />
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-[#0B1F6B] mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 text-base">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name" value={formData.name} onChange={handleChange}
                        placeholder="John Smith"
                        className="input-elegant"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email" type="email" value={formData.email} onChange={handleChange}
                        placeholder="john@company.com"
                        className="input-elegant"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2">
                        Phone Number
                      </label>
                      <input
                        name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="input-elegant"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2">
                        Service Required *
                      </label>
                      <select
                        name="subject" value={formData.subject} onChange={handleChange}
                        className="input-elegant"
                        required
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange}
                      placeholder="Tell us about your project — goals, timeline, budget, tech requirements..."
                      rows={5}
                      className="input-elegant resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-[#1A56DB] text-white font-bold text-[15px] rounded-2xl hover:bg-[#1545B8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-400 text-[12px] mt-2">
                    🔒 Your information is 100% secure and never shared.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
