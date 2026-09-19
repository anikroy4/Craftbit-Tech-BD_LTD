import { Helmet } from 'react-helmet-async';
import { FiZap, FiCode, FiShield, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';

export default function AboutPage() {
  const team = [
    { 
      name: 'Rafiul Islam', 
      role: 'CEO & Principal Architect', 
      exp: '8+ Years Exp', 
      focus: 'MERN, Microservices, AWS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Tasnim Akter', 
      role: 'Head of UI/UX & Design', 
      exp: '6+ Years Exp', 
      focus: 'Design Systems, User Research',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Mehedi Hasan', 
      role: 'Lead Full-Stack Engineer', 
      exp: '5+ Years Exp', 
      focus: 'React, Node, GraphQL, Redis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Nusrat Jahan', 
      role: 'Senior Cloud & DevOps Engineer', 
      exp: '5+ Years Exp', 
      focus: 'Kubernetes, CI/CD, Azure',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const milestones = [
    { year: '2021', title: 'Agency Inception', desc: 'Founded in Dhaka with a core team of senior full-stack developers.' },
    { year: '2022', title: 'First 50 Global Projects', desc: 'Scaled operations to serve enterprise clients in the UK, USA, and UAE.' },
    { year: '2024', title: 'AI & Cloud Expansion', desc: 'Launched enterprise AI agent integration practice and Kubernetes cloud solutions.' },
    { year: '2026', title: '150+ Milestones', desc: 'Recognized as one of the premier modern software delivery partners in Bangladesh.' }
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>About Us & Technical Leadership | CraftBit Tech BD LTD</title>
        <meta name="description" content="Learn about CraftBit Tech BD Ltd, our leadership team, company milestones, and engineering values." />
      </Helmet>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiAward size={13} />
              <span>Who We Are</span>
            </div>
            <h1 className="section-title">Built On Technical <span className="gradient-text">Excellence</span></h1>
            <p className="section-subtitle">
              CraftBit Tech BD Ltd combines deep architectural rigor with rapid agile execution to build software that scales reliably.
            </p>
          </div>

          <div className="about-grid mb-16">
            <div className="about-text">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                Engineering Silicon Valley Caliber Software From Dhaka
              </h2>
              <p>
                CraftBit Tech BD was established by passionate engineers who believed that software craftsmanship should prioritize clean architecture, strict security, and unmatched speed over shortcuts.
              </p>
              <p>
                From modern single-page applications to distributed database infrastructures handling millions of requests, our multidisciplinary team takes complete ownership of your technology roadmap.
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-10 mt-6 pt-4 border-t border-white/10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-sky-400">150+</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">Delivered Products</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-sky-400">99.4%</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">Retention Rate</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-sky-400">24/7</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">Technical Support</p>
                </div>
              </div>
            </div>

            <div className="about-visual-column">
              <div className="about-brand-showcase-card">
                <div className="about-brand-logo-frame">
                  <img 
                    src="/logo.png" 
                    alt="CraftBit Tech BD" 
                    className="about-showcase-logo"
                  />
                </div>
                <div className="text-center mt-4">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Smart • Simple • Scalable</span>
                  <p className="text-xs text-slate-400 mt-1">Official Brand Identity & Technology Trademark</p>
                </div>
              </div>

              <div className="values-grid">
                <div className="value-box">
                  <div className="flex items-center gap-2 mb-2">
                    <FiZap className="text-sky-400" size={18} />
                    <h4 className="text-white font-bold text-base">High Velocity</h4>
                  </div>
                  <p>Agile 2-week iterations with continuous integration for immediate feedback.</p>
                </div>
                <div className="value-box">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCode className="text-sky-400" size={18} />
                    <h4 className="text-white font-bold text-base">Clean Code</h4>
                  </div>
                  <p>Test-driven development, modular codebases, and maintainable architectures.</p>
                </div>
                <div className="value-box">
                  <div className="flex items-center gap-2 mb-2">
                    <FiShield className="text-sky-400" size={18} />
                    <h4 className="text-white font-bold text-base">Hardened Security</h4>
                  </div>
                  <p>OWASP compliance, data encryption at rest and in transit, and role-based ACLs.</p>
                </div>
                <div className="value-box">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUsers className="text-sky-400" size={18} />
                    <h4 className="text-white font-bold text-base">Direct Comms</h4>
                  </div>
                  <p>No middlemen — direct interaction with lead developers and architects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Milestones */}
          <div className="mb-16">
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiAward size={13} />
                <span>Our Journey</span>
              </div>
              <h2 className="section-title">Company <span className="gradient-text">Milestones</span></h2>
            </div>

            <div className="milestones-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="milestone-card">
                  <span className="milestone-year">{m.year}</span>
                  <h3 className="milestone-title">{m.title}</h3>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiUsers size={13} />
                <span>Technical Leadership</span>
              </div>
              <h2 className="section-title">Meet Our <span className="gradient-text">Core Architects</span></h2>
              <p className="section-subtitle">Senior technical leaders who oversee every line of code deployed to production.</p>
            </div>

            <div className="team-grid">
              {team.map((member, idx) => (
                <div key={idx} className="team-card group">
                  <div className="team-avatar overflow-hidden border-2 border-sky-400/30 group-hover:border-sky-400 transition-all p-0">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <span className="team-exp">{member.exp}</span>
                  <p className="team-focus">
                    <strong>Specialization:</strong> {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
