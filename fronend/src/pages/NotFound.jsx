import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #F8FAFF 0%, #E8EEF8 100%)' }}>
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <div className="text-[120px] md:text-[160px] font-extrabold leading-none"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif',
              backgroundImage: 'linear-gradient(135deg, #0073E6, #00C6FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text' }}>
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FaExclamationTriangle className="text-2xl text-orange-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1F6B] mb-3"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Page Not Found
          </h2>
          <p className="text-[#64748B] text-base leading-relaxed mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#0073E6] to-[#00C6FF] text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-400/30 hover:scale-105 transition-all duration-300">
              <FaHome /> Back to Home
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0073E6] border border-blue-200 font-bold rounded-full hover:shadow-md hover:scale-105 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

