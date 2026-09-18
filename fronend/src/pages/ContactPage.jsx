import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import FAQSection from '../components/FAQSection';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-24 bg-[#0B1F6B] overflow-hidden text-center">
        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-10 pointer-events-none">
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1.5 mb-6 border border-white/20 bg-white/5 rounded-full backdrop-blur-sm"
          >
            <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase">Start a Conversation</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Let's Engineer Your Next Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl leading-relaxed mx-auto"
          >
            Tell us about your requirements. Our software leads will schedule a discovery call and provide a free scope & architecture consultation.
          </motion.p>
        </div>
      </section>

      {/* Main Contact Form */}
      <ContactForm />

      {/* Office Locations */}
      <section className="py-20 bg-[#F7F9FC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center mx-auto mb-4">
                <FiMapPin size={22} />
              </div>
              <h4 className="font-extrabold text-[#0B1F6B] text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Main Headquarters</h4>
              <p className="text-slate-500 text-sm">Dhaka, Bangladesh</p>
              <p className="text-slate-400 text-xs mt-2">Serving clients across 15+ countries worldwide</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <FiMail size={22} />
              </div>
              <h4 className="font-extrabold text-[#0B1F6B] text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Direct Inquiries</h4>
              <p className="text-[#1A56DB] font-semibold text-sm">hello@craftbittechbd.com</p>
              <p className="text-slate-400 text-xs mt-2">Guaranteed response within 24 hours</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
                <FiPhone size={22} />
              </div>
              <h4 className="font-extrabold text-[#0B1F6B] text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Customer Support</h4>
              <p className="text-slate-700 font-semibold text-sm">+880 1XXX-XXXXXX</p>
              <p className="text-slate-400 text-xs mt-2">Sun–Thu from 9:00 AM – 6:00 PM BST</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
