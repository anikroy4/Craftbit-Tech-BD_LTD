import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PortfolioCardGrid from "../components/PortfolioCardGrid";
import ContactForm from "../components/ContactForm";
import { getServiceIcon } from "../components/IconHelper";
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiZap,
  FiCode,
  FiUsers,
  FiAward,
  FiGlobe,
  FiCpu,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiFlutter,
  SiKubernetes,
  SiTailwindcss,
  SiRedis,
  SiGraphql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export default function Home() {
  const services = useSelector((state) => state.app.services);

  return (
    <div className="home-page">
      <Helmet>
        <title>
          CraftBit Tech BD LTD | Enterprise Software & Cloud Engineering
        </title>
        <meta
          name="description"
          content="Leading software development agency in Bangladesh specializing in Full-Stack Web Development, Mobile Apps, Cloud Infrastructure, and AI Automation."
        />
      </Helmet>

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="container hero-content">
          <div className="badge flex items-center gap-1.5 mx-auto">
            <FiZap className="text-sky-400" size={13} />
            <span>Leading Software & IT Agency in Bangladesh</span>
          </div>

          <h1 className="hero-title">
            Architecting <span className="gradient-text">World-Class</span>{" "}
            Software & Cloud Systems
          </h1>

          <p className="hero-desc">
            CraftBit Tech BD LTD is a premier full-cycle software agency
            delivering high-velocity web platforms, mobile apps, and scalable
            cloud architectures for businesses globally.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              <span>Start Your Project</span>
              <FiArrowRight size={16} />
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              Explore Case Studies
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="stat-item">
              <h3>150+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-item">
              <h3>99.4%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>25+</h3>
              <p>Tech Specialists</p>
            </div>
            <div className="stat-item">
              <h3>12+</h3>
              <p>Global Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Technology Stack & Architecture Section ── */}
      <section className="tech-stack-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiCode className="text-sky-400" size={13} />
              <span>Modern Engineering Ecosystem</span>
            </div>
            <h2 className="section-title">
              Core <span className="gradient-text">Technology Stack</span>
            </h2>
            <p className="section-subtitle">
              Enterprise battle-tested frameworks, cloud infrastructure, and AI
              runtimes powering our mission-critical deliverables.
            </p>
          </div>

          <div className="tech-slider-wrapper" style={{ marginTop: "0" }}>
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                Production-Grade Tech Matrix
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Hover to pause • Drag / swipe to browse
              </span>
            </div>

            <div className="tech-slider-mask overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing">
              <div className="tech-slider-track">
                {[
                  { name: "React 19", icon: SiReact, color: "text-sky-400" },
                  {
                    name: "Next.js 15",
                    icon: SiNextdotjs,
                    color: "text-white",
                  },
                  {
                    name: "TypeScript",
                    icon: SiTypescript,
                    color: "text-blue-400",
                  },
                  {
                    name: "Node.js",
                    icon: SiNodedotjs,
                    color: "text-emerald-400",
                  },
                  {
                    name: "Python / AI",
                    icon: SiPython,
                    color: "text-yellow-400",
                  },
                  { name: "Flutter", icon: SiFlutter, color: "text-cyan-400" },
                  { name: "AWS Cloud", icon: FaAws, color: "text-amber-400" },
                  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
                  {
                    name: "Kubernetes",
                    icon: SiKubernetes,
                    color: "text-indigo-400",
                  },
                  {
                    name: "PostgreSQL",
                    icon: SiPostgresql,
                    color: "text-sky-500",
                  },
                  {
                    name: "MongoDB",
                    icon: SiMongodb,
                    color: "text-emerald-500",
                  },
                  { name: "Redis", icon: SiRedis, color: "text-red-400" },
                  { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
                  {
                    name: "Tailwind CSS",
                    icon: SiTailwindcss,
                    color: "text-teal-400",
                  },
                  // Duplicate for seamless infinite slide loop
                  { name: "React 19", icon: SiReact, color: "text-sky-400" },
                  {
                    name: "Next.js 15",
                    icon: SiNextdotjs,
                    color: "text-white",
                  },
                  {
                    name: "TypeScript",
                    icon: SiTypescript,
                    color: "text-blue-400",
                  },
                  {
                    name: "Node.js",
                    icon: SiNodedotjs,
                    color: "text-emerald-400",
                  },
                  {
                    name: "Python / AI",
                    icon: SiPython,
                    color: "text-yellow-400",
                  },
                  { name: "Flutter", icon: SiFlutter, color: "text-cyan-400" },
                  { name: "AWS Cloud", icon: FaAws, color: "text-amber-400" },
                  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
                  {
                    name: "Kubernetes",
                    icon: SiKubernetes,
                    color: "text-indigo-400",
                  },
                  {
                    name: "PostgreSQL",
                    icon: SiPostgresql,
                    color: "text-sky-500",
                  },
                  {
                    name: "MongoDB",
                    icon: SiMongodb,
                    color: "text-emerald-500",
                  },
                  { name: "Redis", icon: SiRedis, color: "text-red-400" },
                  { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
                  {
                    name: "Tailwind CSS",
                    icon: SiTailwindcss,
                    color: "text-teal-400",
                  },
                ].map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div key={idx} className="tech-slide-badge group">
                      <Icon
                        className={`${tech.color} shrink-0 group-hover:scale-110 transition-transform`}
                        size={18}
                      />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiCpu className="text-sky-400" size={13} />
              <span>Our Capabilities</span>
            </div>
            <h2 className="section-title">
              Solutions Built For <span className="gradient-text">Growth</span>
            </h2>
            <p className="section-subtitle">
              From MVP design to enterprise cloud systems, we build software
              engineered for speed, durability, and business return.
            </p>
          </div>

          <div className="services-grid">
            {services.map((item) => (
              <div key={item.id} className="service-card group">
                {item.image && (
                  <div className="service-card-image-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="service-card-img"
                      loading="lazy"
                    />
                    <div className="service-card-img-overlay"></div>
                    <span className="service-price-pill">
                      From ${item.baseCost?.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start mb-3 mt-2">
                  <div className="service-icon">
                    {getServiceIcon(item.iconKey, { size: 22 })}
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                {/* Duration & Pricing Strip */}
                <div className="service-meta-strip">
                  <div className="service-meta-item">
                    <span className="service-meta-label">Est. Timeline</span>
                    <span className="service-meta-value service-meta-duration">
                      <FiClock size={13} className="shrink-0" />
                      <span>{item.typicalDuration || "3 - 6 Weeks"}</span>
                    </span>
                  </div>
                  <div className="service-meta-item">
                    <span className="service-meta-label">Investment</span>
                    <span className="service-meta-value service-meta-price">
                      <FiDollarSign size={13} className="shrink-0" />
                      <span>Starting ${item.baseCost?.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                <ul className="service-features">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <FiCheckCircle
                        className="text-sky-400 shrink-0"
                        size={14}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              to="/services"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>View Detailed Service Breakdown</span>
              <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Portfolio Section ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiGlobe className="text-sky-400" size={13} />
              <span>Featured Work</span>
            </div>
            <h2 className="section-title">
              Engineered For <span className="gradient-text">Impact</span>
            </h2>
            <p className="section-subtitle">
              Interactive filterable showcase of our recent production web
              applications, SaaS platforms, and mobile apps.
            </p>
          </div>

          <PortfolioCardGrid showFilter={true} limit={6} />

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link
              to="/portfolio"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>View Full Portfolio Archive</span>
              <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Value Proposition Section ── */}
      <section className="section section-alt">
        <div className="container about-grid">
          <div className="about-text">
            <div className="badge flex items-center gap-1.5">
              <FiAward className="text-sky-400" size={13} />
              <span>Why Choose Us</span>
            </div>
            <h2>
              Pioneering Software Engineering in{" "}
              <span className="gradient-text">Bangladesh</span>
            </h2>
            <p>
              Founded with the vision to deliver Silicon-Valley caliber
              engineering from Dhaka to businesses worldwide, CraftBit Tech BD
              Ltd brings together elite software engineers, UI/UX researchers,
              and DevOps architects.
            </p>
            <p>
              We don't just write code; we partner with your business from day
              zero to architect durable software that scales effortlessly with
              your user growth.
            </p>
            <div className="about-actions">
              <Link
                to="/about"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Learn More About Us</span>
                <FiArrowRight size={15} />
              </Link>
              <Link
                to="/services"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span>Explore All Services</span>
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="about-visual-column">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="CraftBit Tech BD Engineering Team"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-transparent flex items-end p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-400 uppercase tracking-wider block">
                      Elite Engineering Culture
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block truncate sm:overflow-visible">
                      Dhaka R&D Center & Cloud Lab
                    </span>
                  </div>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0 whitespace-nowrap">
                    Active Sprint 42
                  </span>
                </div>
              </div>
            </div>

            <div className="values-grid">
              <div className="value-box">
                <div className="value-box-icon-wrap">
                  <FiZap size={18} />
                </div>
                <h4>High Velocity</h4>
                <p>
                  Agile sprints designed to launch your MVP weeks ahead of
                  schedule.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box-icon-wrap">
                  <FiCode size={18} />
                </div>
                <h4>Clean Code</h4>
                <p>
                  Strictly typed, modular, documented architectures that make
                  scaling effortless.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box-icon-wrap">
                  <FiShield size={18} />
                </div>
                <h4>Security First</h4>
                <p>
                  Top-tier data encryption and compliance safeguards built in
                  from line one.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box-icon-wrap">
                  <FiUsers size={18} />
                </div>
                <h4>Direct Comms</h4>
                <p>
                  Real-time transparency with dedicated tech leads and daily
                  Slack updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiMail className="text-sky-400" size={13} />
              <span>Get In Touch</span>
            </div>
            <h2 className="section-title">
              Let's Build Something{" "}
              <span className="gradient-text">Remarkable</span>
            </h2>
            <p className="section-subtitle">
              Ready to turn your vision into a scalable reality? Get in touch
              with our tech leads today.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="info-card-title">Dhaka Headquarters</h4>
                  <p className="info-card-desc">
                    15-A/A1, Lane 2, Gopibagh, Dhaka-1203, Bangladesh
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="info-card-title">Direct Email</h4>
                  <a
                    href="mailto:craftbittechbd@gmail.com"
                    className="info-card-desc hover:text-sky-400 transition-colors"
                  >
                    craftbittechbd@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 className="info-card-title">Direct Call / WhatsApp</h4>
                  <a
                    href="tel:01774381687"
                    className="info-card-desc hover:text-sky-400 transition-colors"
                  >
                    01774381687
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="info-card-title">Operating Hours</h4>
                  <p className="info-card-desc">
                    Sunday – Thursday: 9:00 AM – 7:00 PM BST
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
