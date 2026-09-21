import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FiZap, FiCode, FiShield, FiUsers, FiAward, 
  FiCheckCircle, FiArrowRight, FiTarget, FiGlobe, 
  FiLinkedin, FiGithub, FiTrendingUp, FiCpu, 
  FiLayers, FiServer, FiLock, FiGitPullRequest 
} from 'react-icons/fi';

export default function AboutPage() {
  const team = [
    { 
      name: 'Anik Roy', 
      role: 'CEO & Principal Architect', 
      exp: '2+ Years Exp', 
      focus: 'MERN Stack, React Native & CI/CD Pipelines',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    { 
      name: 'Tasnim Akter', 
      role: 'Head of UI/UX & Design', 
      exp: '6+ Years Exp', 
      focus: 'Figma Design Systems & Human-Centered UX',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    { 
      name: 'Mehedi Hasan', 
      role: 'Lead Full-Stack Engineer', 
      exp: '5+ Years Exp', 
      focus: 'React 19, NestJS, GraphQL & Redis Cache',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    { 
      name: 'Nusrat Jahan', 
      role: 'Senior Cloud & DevOps Engineer', 
      exp: '5+ Years Exp', 
      focus: 'Kubernetes Orchestration, AWS & Zero-Downtime CI/CD',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  ];

  const milestones = [
    { 
      year: '2021', 
      title: 'Agency Inception', 
      desc: 'Founded in Dhaka with a core team of senior full-stack developers committed to clean code.' 
    },
    { 
      year: '2022', 
      title: 'First 50 Global Deliverables', 
      desc: 'Scaled operations to serve enterprise clients in the UK, USA, Canada, and UAE.' 
    },
    { 
      year: '2024', 
      title: 'AI & Cloud Practice', 
      desc: 'Launched enterprise AI agent integration, LLM fine-tuning, and multi-cloud infrastructure.' 
    },
    { 
      year: '2026', 
      title: '150+ Enterprise Milestones', 
      desc: 'Recognized as one of the premier modern software delivery partners operating from Bangladesh.' 
    }
  ];

  const coreValues = [
    {
      icon: FiZap,
      title: 'High Velocity Execution',
      desc: 'Agile 2-week sprint cycles with continuous deployment, ensuring rapid feedback and zero bottlenecks.'
    },
    {
      icon: FiCode,
      title: 'Clean Code Standard',
      desc: 'Strict TypeScript typing, modular architecture, comprehensive test coverage, and self-documenting codebases.'
    },
    {
      icon: FiShield,
      title: 'Hardened Security',
      desc: 'OWASP Top 10 compliance, end-to-end TLS encryption, automated vulnerability scanners, and strict data governance.'
    },
    {
      icon: FiUsers,
      title: 'Direct Senior Comms',
      desc: 'No account-manager layers. Direct communication with the lead software architects engineering your systems.'
    }
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>About Us & Technical Leadership | CraftBit Tech BD LTD</title>
        <meta name="description" content="Learn about CraftBit Tech BD Ltd, our leadership team, company milestones, and engineering values." />
      </Helmet>

      {/* ── Hero Section ── */}
      <section className="section pt-4 pb-16">
        <div className="container">
          <div className="section-header mb-14">
            <div className="badge flex items-center gap-1.5 mx-auto mb-4">
              <FiAward className="text-sky-400" size={13} />
              <span>Who We Are</span>
            </div>
            <h1 className="section-title mb-4">
              Built On Technical <span className="gradient-text">Excellence</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              CraftBit Tech BD Ltd combines deep architectural rigor with rapid agile execution to build software that scales reliably.
            </p>
          </div>

          {/* ── Brand Story & Identity Showcase ── */}
          <div className="about-grid about-grid-hero items-center">
            <div className="about-text">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-400 mb-4">
                <FiTarget size={13} />
                <span>Our Engineering Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-tight">
                CraftBit Tech BD LTD From Dhaka, Bangladesh
              </h2>
              <p className="mb-4 leading-relaxed">
                CraftBit Tech BD was established by engineers who believe software craftsmanship should prioritize clean architecture, strict security, and unmatched speed over shortcuts.
              </p>
              <p className="mb-6 leading-relaxed">
                From modern single-page applications to distributed database infrastructures handling millions of requests, our multidisciplinary team takes complete ownership of your technology roadmap.
              </p>
              
              {/* Value Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <FiCheckCircle className="text-sky-400 shrink-0" size={16} />
                  <span>100% Intellectual Property Handover</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <FiCheckCircle className="text-sky-400 shrink-0" size={16} />
                  <span>Government Registered Tech Entity</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <FiCheckCircle className="text-sky-400 shrink-0" size={16} />
                  <span>Transparent Daily Sprint Visibility</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <FiCheckCircle className="text-sky-400 shrink-0" size={16} />
                  <span>Guaranteed SLA & Post-Launch Care</span>
                </div>
              </div>

              {/* Verified Metrics Counter */}
              <div className="about-stats-strip">
                <div className="about-stat-box">
                  <h3 className="about-stat-num">150+</h3>
                  <p className="about-stat-label">Delivered Products</p>
                </div>
                <div className="about-stat-box">
                  <h3 className="about-stat-num">99.4%</h3>
                  <p className="about-stat-label">Retention Rate</p>
                </div>
                <div className="about-stat-box">
                  <h3 className="about-stat-num">24/7</h3>
                  <p className="about-stat-label">Technical Support</p>
                </div>
                <div className="about-stat-box">
                  <h3 className="about-stat-num">12+</h3>
                  <p className="about-stat-label">Global Countries</p>
                </div>
              </div>
            </div>

            {/* Brand Logo Card & Identity Badge */}
            <div className="about-visual-column">
              <div className="about-brand-showcase-card group">
                <div className="about-brand-logo-frame">
                  <img 
                    src="/logo.png" 
                    alt="CraftBit Tech BD LTD Master Brand Identity" 
                    className="about-showcase-logo group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center mt-6 px-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                    Smart • Simple • Scalable
                  </span>
                  <p className="text-xs text-slate-400 mt-2">
                    Official Brand Identity & Technology Trademark
                  </p>
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Dhaka Headquartered • Globally Deployed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Engineering Values Grid ── */}
          <div className="about-section-block">
            <div className="about-section-header">
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiTrendingUp className="text-sky-400" size={13} />
                <span>Our Principles</span>
              </div>
              <h2 className="section-title">
                Core <span className="gradient-text">Engineering Values</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                The pillars guiding how we architect code, communicate with clients, and deliver products.
              </p>
            </div>

            <div className="about-values-grid">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="about-value-card group">
                    <div className="about-value-icon-box">
                      <Icon className="text-sky-400 group-hover:text-white transition-colors" size={22} />
                    </div>
                    <h3 className="about-value-title">{val.title}</h3>
                    <p className="about-value-desc">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Enterprise IT Capabilities & Specialized Divisions ── */}
          <div className="about-section-block">
            <div className="about-section-header">
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiCpu className="text-sky-400" size={13} />
                <span>What We Do</span>
              </div>
              <h2 className="section-title">
                Enterprise <span className="gradient-text">IT & Engineering Capabilities</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                CraftBit Tech BD operates 4 specialized technical practices providing turnkey digital solutions from concept to cloud.
              </p>
            </div>

            <div className="about-practices-grid">
              <div className="about-practice-card">
                <div className="about-practice-header">
                  <div className="about-practice-icon-wrap">
                    <FiLayers className="text-sky-400" size={22} />
                  </div>
                  <span className="about-practice-badge">Division 01</span>
                </div>
                <h3 className="about-practice-title">Custom Software Engineering</h3>
                <p className="about-practice-desc">
                  Full-cycle product engineering spanning multi-tenant SaaS platforms, high-throughput microservices, and enterprise web applications with sub-second response times.
                </p>
                <div className="about-practice-tags">
                  <span>React 19 / Next.js</span>
                  <span>Node.js / NestJS</span>
                  <span>GraphQL</span>
                  <span>PostgreSQL / MongoDB</span>
                </div>
              </div>

              <div className="about-practice-card">
                <div className="about-practice-header">
                  <div className="about-practice-icon-wrap">
                    <FiServer className="text-sky-400" size={22} />
                  </div>
                  <span className="about-practice-badge">Division 02</span>
                </div>
                <h3 className="about-practice-title">Cloud Infrastructure & DevOps</h3>
                <p className="about-practice-desc">
                  Automated cloud orchestration on AWS, GCP, and Azure. We build auto-scaling Kubernetes clusters, zero-downtime CI/CD delivery pipelines, and comprehensive APM monitoring.
                </p>
                <div className="about-practice-tags">
                  <span>AWS / GCP / Azure</span>
                  <span>Docker & K8s</span>
                  <span>Terraform IaC</span>
                  <span>GitHub Actions CI/CD</span>
                </div>
              </div>

              <div className="about-practice-card">
                <div className="about-practice-header">
                  <div className="about-practice-icon-wrap">
                    <FiCpu className="text-sky-400" size={22} />
                  </div>
                  <span className="about-practice-badge">Division 03</span>
                </div>
                <h3 className="about-practice-title">AI Automation & Autonomous Agents</h3>
                <p className="about-practice-desc">
                  Production-grade LLM integrations, Retrieval-Augmented Generation (RAG) vector pipelines, and intelligent conversational agents that streamline complex business operations.
                </p>
                <div className="about-practice-tags">
                  <span>LangChain / LlamaIndex</span>
                  <span>Pinecone / pgvector</span>
                  <span>Claude & OpenAI APIs</span>
                  <span>Agentic Workflows</span>
                </div>
              </div>

              <div className="about-practice-card">
                <div className="about-practice-header">
                  <div className="about-practice-icon-wrap">
                    <FiLock className="text-sky-400" size={22} />
                  </div>
                  <span className="about-practice-badge">Division 04</span>
                </div>
                <h3 className="about-practice-title">Cybersecurity & Code Auditing</h3>
                <p className="about-practice-desc">
                  Proactive defense with OWASP Top 10 penetration testing, automated static/dynamic vulnerability scans, PCI-DSS / GDPR compliance consulting, and hardened API gateways.
                </p>
                <div className="about-practice-tags">
                  <span>OWASP Compliance</span>
                  <span>Penetration Testing</span>
                  <span>TLS / AES-256</span>
                  <span>SOC-2 Preparation</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4-Stage Agile Delivery Lifecycle ── */}
          <div className="about-section-block">
            <div className="about-section-header">
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiGitPullRequest className="text-sky-400" size={13} />
                <span>Our Methodology</span>
              </div>
              <h2 className="section-title">
                The CraftBit <span className="gradient-text">Delivery Engine</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                A predictable, transparent engineering lifecycle designed to eliminate scope creep and ensure on-time delivery.
              </p>
            </div>

            <div className="about-process-grid">
              <div className="about-process-card">
                <span className="about-process-step">Step 01</span>
                <h3 className="about-process-title">Architecture Discovery</h3>
                <p className="about-process-desc">
                  We analyze your business workflows, define technical requirements, model system architecture, and establish sprint deliverables.
                </p>
                <span className="about-process-deliverable">Output: Technical Blueprint & PRD</span>
              </div>

              <div className="about-process-card">
                <span className="about-process-step">Step 02</span>
                <h3 className="about-process-title">Sprint Execution</h3>
                <p className="about-process-desc">
                  2-week agile sprint cycles with automated test suites, Git feature branches, and direct access to senior engineers in daily standups.
                </p>
                <span className="about-process-deliverable">Output: Working Staging Builds</span>
              </div>

              <div className="about-process-card">
                <span className="about-process-step">Step 03</span>
                <h3 className="about-process-title">QA & Security Hardening</h3>
                <p className="about-process-desc">
                  Rigorous automated regression testing, cross-browser audits, load tests under simulated peak traffic, and vulnerability scanning.
                </p>
                <span className="about-process-deliverable">Output: Verified Clean Audit Report</span>
              </div>

              <div className="about-process-card">
                <span className="about-process-step">Step 04</span>
                <h3 className="about-process-title">Launch & SLA Support</h3>
                <p className="about-process-desc">
                  Zero-downtime production deployment, complete intellectual property and source code handover, and 24/7 SLA infrastructure monitoring.
                </p>
                <span className="about-process-deliverable">Output: 100% IP Handover & 24/7 Care</span>
              </div>
            </div>
          </div>

          {/* ── Company Timeline / Milestones ── */}
          <div className="about-section-block">
            <div className="about-section-header">
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiGlobe className="text-sky-400" size={13} />
                <span>Our Growth Journey</span>
              </div>
              <h2 className="section-title">
                Company <span className="gradient-text">Milestones</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                From a Dhaka software studio to an internationally trusted engineering partner.
              </p>
            </div>

            <div className="about-milestones-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="about-milestone-card group">
                  <div className="about-milestone-top">
                    <span className="about-milestone-year">{m.year}</span>
                    <span className="about-milestone-badge">Stage {idx + 1}</span>
                  </div>
                  <h3 className="about-milestone-title">{m.title}</h3>
                  <p className="about-milestone-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Technical Leadership Team ── */}
          <div className="about-section-block">
            <div className="about-section-header">
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiUsers className="text-sky-400" size={13} />
                <span>Technical Leadership</span>
              </div>
              <h2 className="section-title">
                Meet Our <span className="gradient-text">Core Architects</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Senior technical leads who oversee every line of code deployed to production.
              </p>
            </div>

            <div className="about-team-grid">
              {team.map((member, idx) => (
                <div key={idx} className="about-team-card group">
                  <div className="about-team-avatar-wrap">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="about-team-avatar-img"
                      loading="lazy"
                    />
                    <div className="about-team-socials">
                      <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="about-team-social-btn">
                        <FiLinkedin size={14} />
                      </a>
                      <a href={member.github} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="about-team-social-btn">
                        <FiGithub size={14} />
                      </a>
                    </div>
                  </div>
                  <div className="about-team-content">
                    <h3 className="about-team-name">{member.name}</h3>
                    <p className="about-team-role">{member.role}</p>
                    <span className="about-team-exp-badge">{member.exp}</span>
                    <p className="about-team-focus">
                      <strong>Focus:</strong> {member.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom Call To Action Banner ── */}
          <div className="about-cta-banner">
            <div className="about-cta-content">
              <h3 className="about-cta-heading">Ready To Build With Silicon Valley Rigor?</h3>
              <p className="about-cta-sub">
                Book a confidential 30-minute discovery session with our tech leads and get a free architectural roadmap within 48 hours.
              </p>
            </div>
            <div className="about-cta-action">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                <span>Start Your Project</span>
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
