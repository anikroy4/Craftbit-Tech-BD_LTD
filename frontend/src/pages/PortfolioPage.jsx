import PortfolioCardGrid from '../components/PortfolioCardGrid';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiGrid, FiArrowRight } from 'react-icons/fi';

export default function PortfolioPage() {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Portfolio & Case Studies | Craftbit Tech BD LTD</title>
        <meta name="description" content="Explore our client projects across Web, Mobile, and Cloud/SaaS systems delivered by Craftbit Tech BD Ltd." />
      </Helmet>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiGrid size={13} />
              <span>Engineering Showcase</span>
            </div>
            <h1 className="section-title">Selected Client <span className="gradient-text">Case Studies</span></h1>
            <p className="section-subtitle">
              Browse through enterprise applications, SaaS platforms, and mobile apps built and maintained by the Craftbit Tech BD team.
            </p>
          </div>

          <PortfolioCardGrid showFilter={true} />

          <div className="portfolio-cta-banner">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Have a Custom Product in Mind?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6 text-sm sm:text-base leading-relaxed">
              Whether you are an early-stage startup looking to build an MVP or an established enterprise requiring scalable cloud transformation, our engineers are ready to build.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              <span>Schedule An Architecture Consultation</span>
              <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
