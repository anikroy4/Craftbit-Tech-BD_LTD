import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PortfolioCardGrid from "../components/PortfolioCardGrid";
import ContactForm from "../components/ContactForm";
import { getServiceIcon } from "../components/IconHelper";

function AnimatedCounter({ end, decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const step = (currentTime) => {
              const progress = Math.min((currentTime - startTime) / duration, 1);
              // Ease out quad
              const easeOut = progress * (2 - progress);
              const currentVal = easeOut * end;
              setCount(decimals > 0 ? parseFloat(currentVal.toFixed(decimals)) : Math.floor(currentVal));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(end);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, decimals, duration]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}</span>;
}
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
  FiServer,
  FiLayers,
  FiDatabase,
  FiCloud,
  FiTerminal,
  FiTarget,
  FiLock,
  FiTrendingUp,
  FiHeadphones,
  FiRepeat,
  FiHelpCircle,
  FiPlus,
  FiMinus,
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
  SiFastapi,
  SiPytorch,
  SiGithubactions,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export default function Home() {
  const services = useSelector((state) => state.app.services);
  const [activeTechCategory, setActiveTechCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
              <h3>
                <AnimatedCounter end={150} duration={2200} />+
              </h3>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-item">
              <h3>
                <AnimatedCounter end={99.4} decimals={1} duration={2200} />%
              </h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>
                <AnimatedCounter end={25} duration={2200} />+
              </h3>
              <p>Tech Specialists</p>
            </div>
            <div className="stat-item">
              <h3>
                <AnimatedCounter end={12} duration={2200} />+
              </h3>
              <p>Global Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Technology Stack & Architecture Section ── */}
      <section className="tech-stack-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: "1.75rem" }}>
            <div className="badge flex items-center gap-2 mx-auto">
              <FiCode className="text-sky-400" size={14} />
              <span className="text-sm font-medium text-sky-400">
                Modern Engineering Ecosystem
              </span>
            </div>
            <h2 className="section-title">
              Core <span className="gradient-text">Technology Stack</span>
            </h2>
            <p className="section-subtitle">
              Enterprise battle-tested frameworks, cloud infrastructure, and AI
              runtimes powering our mission-critical deliverables.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="tech-category-tabs">
            {[
              { id: "all", label: "All Technologies", icon: FiLayers },
              { id: "frontend", label: "Frontend & Mobile", icon: FiCode },
              { id: "backend", label: "Backend & APIs", icon: FiServer },
              { id: "ai", label: "AI & Machine Learning", icon: FiCpu },
              { id: "cloud", label: "Cloud & DevOps", icon: FiCloud },
              { id: "database", label: "Databases & Cache", icon: FiDatabase },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTechCategory(tab.id)}
                  className={`tech-tab-btn ${activeTechCategory === tab.id ? "active" : ""}`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Technology Stack Grid */}
          <div className="tech-cards-grid">
            {[
              {
                category: "frontend",
                catLabel: "Frontend",
                name: "React 19 & Next.js 15",
                icon: SiReact,
                iconColor: "text-sky-400",
                desc: "Server-side rendering, React Server Components, high performance and SEO-first web applications.",
                status: "Production Ready",
                level: "Core Standard",
              },
              {
                category: "frontend",
                catLabel: "Language",
                name: "TypeScript 5.x",
                icon: SiTypescript,
                iconColor: "text-blue-400",
                desc: "Strict type safety, end-to-end DX integrity, compile-time validation across full stacks.",
                status: "100% Typed",
                level: "Standard",
              },
              {
                category: "frontend",
                catLabel: "Mobile",
                name: "Flutter & React Native",
                icon: SiFlutter,
                iconColor: "text-cyan-400",
                desc: "Pixel-perfect multi-platform native mobile applications running seamlessly on iOS and Android.",
                status: "Cross Platform",
                level: "60 FPS Native",
              },
              {
                category: "frontend",
                catLabel: "Styling",
                name: "Tailwind CSS & UI Kits",
                icon: SiTailwindcss,
                iconColor: "text-teal-400",
                desc: "Modern responsive utility styling, atomic design tokens, accessible Headless UI primitives.",
                status: "Optimized",
                level: "CSS Engine",
              },
              {
                category: "backend",
                catLabel: "Backend",
                name: "Node.js & NestJS",
                icon: SiNodedotjs,
                iconColor: "text-emerald-400",
                desc: "Event-driven asynchronous microservices, enterprise architecture with modular dependency injection.",
                status: "High Concurrency",
                level: "Tier-1 Backend",
              },
              {
                category: "backend",
                catLabel: "APIs",
                name: "FastAPI & Python",
                icon: SiFastapi,
                iconColor: "text-teal-400",
                desc: "Lightning fast ASGI microservices, automatic Swagger OpenAPI schema documentation and validation.",
                status: "Async Python",
                level: "Microservices",
              },
              {
                category: "backend",
                catLabel: "Data Protocol",
                name: "GraphQL & REST APIs",
                icon: SiGraphql,
                iconColor: "text-pink-400",
                desc: "Decoupled strongly typed data querying, zero over-fetching, high bandwidth efficiency.",
                status: "Declarative",
                level: "Enterprise API",
              },
              {
                category: "ai",
                catLabel: "AI Automation",
                name: "OpenAI & LLM Runtimes",
                icon: FiCpu,
                iconColor: "text-emerald-300",
                desc: "Autonomous AI agents, Retrieval-Augmented Generation (RAG), vector semantics and tool execution.",
                status: "Agentic AI",
                level: "GenAI Suite",
              },
              {
                category: "ai",
                catLabel: "Deep Learning",
                name: "PyTorch & TensorFlow",
                icon: SiPytorch,
                iconColor: "text-orange-400",
                desc: "Custom predictive models, NLP transformers, automated inference pipelines and fine-tuning.",
                status: "GPU Accelerated",
                level: "ML Ops",
              },
              {
                category: "cloud",
                catLabel: "Cloud Platform",
                name: "Amazon Web Services (AWS)",
                icon: FaAws,
                iconColor: "text-amber-400",
                desc: "ECS, Lambda serverless, S3, RDS, CloudFront CDN and multi-zone resilient architecture.",
                status: "99.99% SLA",
                level: "Cloud Partner",
              },
              {
                category: "cloud",
                catLabel: "Containerization",
                name: "Docker & Kubernetes",
                icon: SiKubernetes,
                iconColor: "text-indigo-400",
                desc: "Immutable OCI container orchestration, auto-scaling clusters, zero-downtime rolling deploys.",
                status: "Cloud Native",
                level: "Orchestration",
              },
              {
                category: "cloud",
                catLabel: "CI/CD DevOps",
                name: "GitHub Actions & Pipelines",
                icon: SiGithubactions,
                iconColor: "text-sky-300",
                desc: "Automated test suites, static vulnerability security scans, instant staging & prod deployments.",
                status: "Automated",
                level: "Zero Friction",
              },
              {
                category: "database",
                catLabel: "Relational DB",
                name: "PostgreSQL & Supabase",
                icon: SiPostgresql,
                iconColor: "text-sky-400",
                desc: "ACID compliant relational storage, pgvector semantic search, indexing, row-level security.",
                status: "High Integrity",
                level: "Primary SQL",
              },
              {
                category: "database",
                catLabel: "Document Store",
                name: "MongoDB & NoSQL",
                icon: SiMongodb,
                iconColor: "text-emerald-500",
                desc: "Dynamic schema modeling, flexible document storage, rapid iteration and horizontal sharding.",
                status: "High Throughput",
                level: "NoSQL DB",
              },
              {
                category: "database",
                catLabel: "In-Memory Cache",
                name: "Redis & Key-Value",
                icon: SiRedis,
                iconColor: "text-red-400",
                desc: "Sub-millisecond latency cache layer, distributed session locks, pub/sub queues and rate limiting.",
                status: "< 1ms Latency",
                level: "Cache Tier",
              },
            ]
              .filter(
                (item) =>
                  activeTechCategory === "all" ||
                  item.category === activeTechCategory
              )
              .map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="tech-spec-card group">
                    <div className="tech-spec-glow-orb"></div>
                    <div className="tech-spec-header">
                      <div className="tech-spec-icon-wrap">
                        <ItemIcon className={`${item.iconColor} tech-spec-icon`} size={24} />
                      </div>
                      <div className="tech-spec-title-group">
                        <span className="tech-spec-category-tag">{item.catLabel}</span>
                        <h3 className="tech-spec-title">{item.name}</h3>
                      </div>
                    </div>
                    <p className="tech-spec-desc">{item.desc}</p>
                    <div className="tech-spec-bottom">
                      <span className="tech-spec-status">
                        <span className="tech-spec-dot"></span>
                        {item.status}
                      </span>
                      <span className="tech-spec-level">{item.level}</span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Architecture Pillars & Enterprise Engineering Standards */}
          <div className="tech-architecture-pillars">
            <div className="architecture-pillar-card">
              <div className="pillar-icon-box">
                <FiZap size={20} />
              </div>
              <div className="pillar-text">
                <h4>Ultra-Low Latency & High Speed</h4>
                <p>
                  Optimized bundles, edge CDN routing, and sub-second API responses ensure unmatched UX performance.
                </p>
              </div>
            </div>

            <div className="architecture-pillar-card">
              <div className="pillar-icon-box">
                <FiShield size={20} />
              </div>
              <div className="pillar-text">
                <h4>Enterprise Security & Compliance</h4>
                <p>
                  End-to-end TLS encryption, automated OWASP checks, role-based access control, and strict data governance.
                </p>
              </div>
            </div>

            <div className="architecture-pillar-card">
              <div className="pillar-icon-box">
                <FiCloud size={20} />
              </div>
              <div className="pillar-text">
                <h4>Infinite Cloud Scalability</h4>
                <p>
                  Elastic microservices engineered to auto-scale seamlessly from 1,000 to 1,000,000+ concurrent requests.
                </p>
              </div>
            </div>

            <div className="architecture-pillar-card">
              <div className="pillar-icon-box">
                <FiTerminal size={20} />
              </div>
              <div className="pillar-text">
                <h4>Automated CI/CD & Reliability</h4>
                <p>
                  Automated test suites, continuous deployment, and zero-downtime releases keep your product always available.
                </p>
              </div>
            </div>
          </div>

          {/* Continuous Infinite Tech Stream at Bottom */}
          <div className="tech-bottom-slider-area">
            <div className="tech-slider-wrapper" style={{ marginTop: "0.5rem", padding: "0.5rem 0" }}>
              <div className="tech-slider-mask overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing">
                <div className="tech-slider-track">
                  {[
                    { name: "React 19", icon: SiReact, color: "text-sky-400" },
                    { name: "Next.js 15", icon: SiNextdotjs, color: "text-white" },
                    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
                    { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-400" },
                    { name: "Python / AI", icon: SiPython, color: "text-yellow-400" },
                    { name: "Flutter", icon: SiFlutter, color: "text-cyan-400" },
                    { name: "AWS Cloud", icon: FaAws, color: "text-amber-400" },
                    { name: "Docker", icon: SiDocker, color: "text-blue-400" },
                    { name: "Kubernetes", icon: SiKubernetes, color: "text-indigo-400" },
                    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
                    { name: "MongoDB", icon: SiMongodb, color: "text-emerald-500" },
                    { name: "Redis", icon: SiRedis, color: "text-red-400" },
                    { name: "FastAPI", icon: SiFastapi, color: "text-teal-400" },
                    { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
                    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
                    // Repeat for seamless loop
                    { name: "React 19", icon: SiReact, color: "text-sky-400" },
                    { name: "Next.js 15", icon: SiNextdotjs, color: "text-white" },
                    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
                    { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-400" },
                    { name: "Python / AI", icon: SiPython, color: "text-yellow-400" },
                    { name: "Flutter", icon: SiFlutter, color: "text-cyan-400" },
                    { name: "AWS Cloud", icon: FaAws, color: "text-amber-400" },
                    { name: "Docker", icon: SiDocker, color: "text-blue-400" },
                    { name: "Kubernetes", icon: SiKubernetes, color: "text-indigo-400" },
                    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
                    { name: "MongoDB", icon: SiMongodb, color: "text-emerald-500" },
                    { name: "Redis", icon: SiRedis, color: "text-red-400" },
                    { name: "FastAPI", icon: SiFastapi, color: "text-teal-400" },
                    { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
                    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
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

      {/* ── Why Work With Us / The Right Technology Partner Section ── */}
      <section className="section why-work-section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiTarget className="text-sky-400" size={13} />
              <span>Strategic Partnership</span>
            </div>
            <h2 className="section-title">
              Why Work With Us
            </h2>
            <p className="section-subtitle why-work-lead">
              The Right Technology Partner Makes All The Difference.
            </p>
            <p className="section-subtitle" style={{ marginTop: "0.35rem" }}>
              We transcend conventional outsourcing. We embed directly with your leadership team to design, engineer, and deploy high-velocity digital products with institutional-grade discipline.
            </p>
          </div>

          <div className="why-work-grid">
            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiZap size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">High Velocity</div>
                <h3 className="why-work-card-title">Accelerated Time-to-Market</h3>
                <p className="why-work-card-desc">
                  Our battle-tested CI/CD workflows and modular component ecosystems shave weeks off delivery cycles without accumulating technical debt.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Bi-weekly production releases & continuous demo cycles</span>
                </div>
              </div>
            </div>

            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiLock size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">Full Ownership</div>
                <h3 className="why-work-card-title">100% IP & Source Code Transfer</h3>
                <p className="why-work-card-desc">
                  You own every commit, design token, pipeline, and database schema from day one. Backed by strict bilateral NDAs and secure IP assignment.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Complete Git repository ownership & clean handoffs</span>
                </div>
              </div>
            </div>

            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiCode size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">Senior Talent</div>
                <h3 className="why-work-card-title">Top 3% Dedicated Engineers</h3>
                <p className="why-work-card-desc">
                  No junior handoffs or unvetted freelancers. You collaborate directly with principal architects and seasoned full-stack engineers.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Direct communication via Slack, Teams & weekly sprints</span>
                </div>
              </div>
            </div>

            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiTrendingUp size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">Predictable ROI</div>
                <h3 className="why-work-card-title">Transparent & Milestone-Based</h3>
                <p className="why-work-card-desc">
                  No hidden fees, no scope surprises. Clear fixed-sprint pricing or dedicated team models with transparent time logs and budget tracking.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Clear deliverables with defined acceptance criteria</span>
                </div>
              </div>
            </div>

            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiCloud size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">Cloud Native</div>
                <h3 className="why-work-card-title">Resilient Architecture</h3>
                <p className="why-work-card-desc">
                  Systems built from the ground up to withstand massive user surges. High availability, auto-scaling, and multi-region disaster recovery.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>99.99% uptime target with automated failover</span>
                </div>
              </div>
            </div>

            <div className="why-work-card group">
              <div className="why-work-icon-box">
                <FiHeadphones size={22} />
              </div>
              <div className="why-work-card-content">
                <div className="why-work-tag">Post-Launch</div>
                <h3 className="why-work-card-title">Long-Term Maintenance & SLA</h3>
                <p className="why-work-card-desc">
                  We stand by everything we ship. Comprehensive warranty, active monitoring, security patch management, and continuous feature roadmapping.
                </p>
                <div className="why-work-benefit">
                  <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>24/7 incident response & continuous performance audits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Trust Banner / Call to Action */}
          <div className="why-work-cta-strip">
            <div className="why-work-cta-text">
              <h3>Ready to scale your next mission-critical engineering project?</h3>
              <p>Schedule a technical discovery session with our lead architects. We'll audit your requirements and provide an architectural blueprint within 48 hours.</p>
            </div>
            <div className="why-work-cta-actions">
              <Link to="/contact" className="btn-primary flex items-center gap-2">
                <span>Talk To An Architect</span>
                <FiArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-secondary flex items-center gap-2">
                <span>Explore Solutions</span>
                <FiRepeat size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQ) Section ── */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiHelpCircle className="text-sky-400" size={13} />
              <span>Got Questions?</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to know about our engineering process, pricing models, intellectual property ownership, and collaboration standards.
            </p>
          </div>

          <div className="faq-wrapper">
            {[
              {
                q: "How do you ensure project quality and maintain velocity?",
                a: "We operate on 2-week Agile sprint cadences with automated CI/CD pipelines, strict code reviews, and automated unit/integration tests. Every sprint ends with a live staging demo so you have complete visibility over deliverables and can validate features before production deployment.",
              },
              {
                q: "Who owns the intellectual property (IP) and source code?",
                a: "You own 100% of the intellectual property, repositories, architectural schemas, and deployment pipelines from day one. We sign enforceable bilateral non-disclosure agreements (NDAs) and IP assignment contracts before any code is authored.",
              },
              {
                q: "What engagement models and pricing structures do you offer?",
                a: "We offer two transparent models tailored to your project scope: (1) Milestone-Based Fixed Scope for well-defined deliverables and MVPs with predictable budgets, and (2) Dedicated Engineering Teams / Retainers for rapid scaling, continuous iteration, and long-term product roadmaps.",
              },
              {
                q: "How does communication and timezone overlap work for international clients?",
                a: "Our tech leads and architects provide minimum 4-6 hours of daily working overlap with North American, European, and Asia-Pacific time zones. We collaborate daily via dedicated Slack or Microsoft Teams channels, hold weekly video sprints on Google Meet or Zoom, and provide asynchronous Jira/Trello board visibility.",
              },
              {
                q: "What happens after the product is launched to production?",
                a: "We provide comprehensive 30 to 90-day post-launch warranty and hypercare monitoring for all deliverables. Beyond warranty, we offer ongoing SLA maintenance packages including 24/7 uptime monitoring, cloud cost optimization, continuous security patch management, and iterative feature scaling.",
              },
              {
                q: "Can you take over or modernize an existing legacy codebase?",
                a: "Yes. We frequently conduct deep codebase audits, security assessments, and performance profiling on legacy applications. We prepare a detailed refactoring roadmap and can migrate monoliths into modern Next.js/React frontends with microservices or serverless cloud backends without disrupting live user traffic.",
              },
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-footer-help">
            <p>
              Have a question that isn't answered here?{" "}
              <a href="#contact" className="text-sky-400 font-semibold hover:underline">
                Contact our engineering team directly
              </a>{" "}
              and we'll respond within 24 hours.
            </p>
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
