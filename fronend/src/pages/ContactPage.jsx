import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 bg-[#0B1F6B] overflow-hidden text-left">
        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-10 pointer-events-none">
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
          <div className="w-px h-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-6 border border-white/20 bg-white/5 rounded-full"
          >
            <span className="text-xs font-semibold tracking-wide text-white uppercase">Get In Touch</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Let's Work Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl"
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <ContactForm />

      <section className="h-72 bg-[#F7F9FC] flex items-center justify-center border-t border-[#E2E8F0]">
        <div className="text-center text-[#64748B]">
          <FaMapMarkerAlt className="text-4xl text-[#1A56DB] mb-4 mx-auto" />
          <p className="font-semibold text-[#111827]">Dhaka, Bangladesh</p>
          <p className="text-sm mt-1">Find us on Google Maps</p>
        </div>
      </section>
    </div>
  );
}
