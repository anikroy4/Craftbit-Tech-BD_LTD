import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { heroData } from "../data/siteData";

const TYPING_WORDS = [
  "Web Applications",
  "Mobile Apps",
  "SaaS Products",
  "Digital Futures",
];

function TypingText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        70,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      // Wrap in timeout so state updates happen asynchronously, not inline in effect body
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
      }, 50);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="cursor-blink text-blue-400">|</span>
    </span>
  );
}

function StatCard({ stat }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl lg:text-4xl font-black font-display text-white">
        {inView ? (
          <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
        ) : (
          `0${stat.suffix}`
        )}
      </div>
      <div className="text-sm text-slate-400 mt-1 font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
}

// Floating tech badge
function TechBadge({ name, color, delay, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="absolute hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold float-anim"
      style={{
        left: x,
        top: y,
        background: `rgba(${color}, 0.12)`,
        border: `1px solid rgba(${color}, 0.3)`,
        animationDelay: `${delay * 0.5}s`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: `rgb(${color})` }}
      />
      <span style={{ color: `rgb(${color})` }}>{name}</span>
    </motion.div>
  );
}

const TECH_BADGES = [
  { name: "React", color: "97, 218, 251", delay: 0.2, x: "5%", y: "15%" },
  { name: "Node.js", color: "51, 153, 51", delay: 0.4, x: "8%", y: "75%" },
  { name: "MongoDB", color: "71, 162, 72", delay: 0.6, x: "88%", y: "20%" },
  { name: "TypeScript", color: "49, 120, 198", delay: 0.3, x: "85%", y: "70%" },
  { name: "Next.js", color: "200, 200, 200", delay: 0.5, x: "3%", y: "45%" },
  { name: "AWS", color: "255, 153, 0", delay: 0.7, x: "91%", y: "45%" },
];

export default function Hero() {
  const heroRef = useRef(null);

  const scrollDown = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-100 h-100 rounded-full bg-violet-600/8 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-75  rounded-full bg-cyan-600/6 blur-[80px]" />
      </div>

      {/* Floating tech badges */}
      {TECH_BADGES.map((b) => (
        <TechBadge key={b.name} {...b} />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {heroData.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-white mb-4"
        >
          We Build
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-8 min-h-[1.1em]"
        >
          <TypingText />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 text-balance"
        >
          {heroData.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-2xl btn-glow transition-colors duration-200"
          >
            Start a Project
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>
          <motion.button
            onClick={() =>
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-white font-semibold text-base rounded-2xl transition-all duration-200"
          >
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400/40 transition-colors">
              <Play size={12} className="translate-x-0.5 text-blue-400" />
            </span>
            View Our Work
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          {heroData.stats.map((stat, i) => (
            <div
              key={i}
              className={`relative ${i < heroData.stats.length - 1 ? "after:hidden sm:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-white/10" : ""}`}
            >
              <StatCard stat={stat} />
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-xs font-medium text-slate-500 uppercase tracking-widest"
        >
          Trusted by companies in 🇺🇸 USA · 🇬🇧 UK · 🇮🇳 India · 🇦🇪 UAE · 🇩🇪
          Germany
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
