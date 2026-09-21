import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiArrowRight, FiCpu, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';
import { getServiceIcon } from '../components/IconHelper';

export default function ServicesPage() {
  const services = useSelector((state) => state.app.services);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Enterprise Engineering Services | CraftBit Tech BD LTD</title>
        <meta name="description" content="Explore our full suite of software development services with transparent pricing tiers, deliverables, and architecture blueprints." />
      </Helmet>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiCpu size={13} />
              <span>Specialized Practice Areas</span>
            </div>
            <h1 className="section-title">Enterprise Software <span className="gradient-text">Engineering Services</span></h1>
            <p className="section-subtitle">
              We provide full-lifecycle technical services spanning custom development, microservices, cloud migrations, and AI agent integrations.
            </p>
          </div>

          <div className="services-grid">
            {services.map((item) => (
              <div key={item.id} className="service-card group">
                {/* Service Card Image Banner */}
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
                      From ${item.baseCost?.toLocaleString() || '1,500'}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start mb-4 mt-2">
                  <div className="service-icon">{getServiceIcon(item.iconKey, { size: 22 })}</div>
                  <span className="badge" style={{ marginBottom: 0 }}>{item.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 grow">{item.desc}</p>

                {/* Duration & Pricing Strip */}
                <div className="service-meta-strip">
                  <div className="service-meta-item">
                    <span className="service-meta-label">Est. Timeline</span>
                    <span className="service-meta-value service-meta-duration">
                      <FiClock size={13} className="shrink-0" />
                      <span>{item.typicalDuration || '3 - 6 Weeks'}</span>
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

                <div className="service-deliverables-box">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
                    Technical Deliverables
                  </h4>
                  <ul className="service-features" style={{ borderTop: 'none', paddingTop: 0 }}>
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <FiCheckCircle className="text-sky-400 shrink-0" size={14} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <Link to={`/contact?service=${encodeURIComponent(item.title)}`} className="btn-primary w-full justify-center text-xs sm:text-sm py-2.5">
                    <span>Inquire About {item.title}</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Development Methodology */}
          <div className="workflow-container">
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <div className="badge flex items-center gap-1.5 mx-auto">
                <FiTrendingUp size={13} />
                <span>Our Engineering Workflow</span>
              </div>
              <h2 className="section-title">How We <span className="gradient-text">Deliver Value</span></h2>
              <p className="section-subtitle">A transparent, battle-tested 4-step agile engineering delivery framework.</p>
            </div>

            <div className="workflow-grid">
              <div className="workflow-step-card">
                <span className="step-num">01</span>
                <h4 className="text-white font-bold text-lg my-2">Discovery & Architecture</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Technical feasibility research, database schema design, and cloud infrastructure blueprinting.</p>
              </div>

              <div className="workflow-step-card">
                <span className="step-num">02</span>
                <h4 className="text-white font-bold text-lg my-2">Agile Sprint Dev</h4>
                <p className="text-slate-400 text-sm leading-relaxed">2-week sprint cycles with live staging deployments, pull request reviews, and automated testing.</p>
              </div>

              <div className="workflow-step-card">
                <span className="step-num">03</span>
                <h4 className="text-white font-bold text-lg my-2">Security & QA Hardening</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Load stress testing, penetration verification, vulnerability patches, and cross-device QA validation.</p>
              </div>

              <div className="workflow-step-card">
                <span className="step-num">04</span>
                <h4 className="text-white font-bold text-lg my-2">Launch & 24/7 SLA</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Zero-downtime blue/green DNS routing, cloud monitoring alerts, and ongoing maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
