import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeam } from '../features/team/teamSlice';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const defaultPhotos = [
  'https://i.pravatar.cc/200?img=11',
  'https://i.pravatar.cc/200?img=32',
  'https://i.pravatar.cc/200?img=56',
  'https://i.pravatar.cc/200?img=47',
  'https://i.pravatar.cc/200?img=24',
  'https://i.pravatar.cc/200?img=68',
];

function TeamCard({ member, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const photo = member.photo || defaultPhotos[index % defaultPhotos.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
        <img
          src={photo}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F6B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Social links (appear on hover) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {member.social?.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-[#1A56DB] hover:border-[#1A56DB] transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FiLinkedin size={15} />
            </a>
          )}
          {member.social?.github && (
            <a href={member.social.github} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-slate-900 hover:border-slate-900 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={15} />
            </a>
          )}
          {member.social?.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-sky-500 hover:border-sky-500 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FiTwitter size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3
          className="text-[17px] font-extrabold text-[#0B1F6B] mb-1 leading-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {member.name}
        </h3>
        <p className="text-[#1A56DB] text-[12.5px] font-bold uppercase tracking-wider mb-3">
          {member.role}
        </p>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-5 line-clamp-2">
          {member.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {(member.skills || []).slice(0, 3).map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-semibold rounded-lg border border-slate-100">
              {skill}
            </span>
          ))}
          {(member.skills || []).length > 3 && (
            <span className="px-2.5 py-1 bg-blue-50 text-[#1A56DB] text-[11px] font-semibold rounded-lg border border-blue-100">
              +{member.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.team);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (items.length === 0) dispatch(fetchTeam());
  }, [dispatch, items.length]);

  return (
    <section id="team" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A56DB] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
              The People
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#0B1F6B] mb-4 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Meet Our Expert Team
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              A passionate team of engineers, designers, and architects committed to building world-class software.
            </p>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-[#0B1F6B] text-sm font-semibold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all shrink-0 group"
          >
            Full Team
            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
                <div className="h-56 shimmer" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-40 shimmer rounded" />
                  <div className="h-3 w-28 shimmer rounded" />
                  <div className="h-3 w-full shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((member, i) => (
              <TeamCard key={member._id} member={member} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
