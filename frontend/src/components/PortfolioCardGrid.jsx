import { useDispatch, useSelector } from 'react-redux';
import { setPortfolioFilter } from '../redux/appSlice';
import { getProjectIcon } from './IconHelper';
import { 
  FiTrendingUp, FiGlobe, FiSmartphone, FiCloud, FiGrid, FiCode 
} from 'react-icons/fi';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiStripe, SiRedis, 
  SiPostgresql, SiDocker, SiWebrtc, 
  SiNextdotjs, SiTailwindcss, SiKubernetes, SiFirebase, 
  SiGooglemaps 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';

const techIconMap = {
  'React': SiReact,
  'React 19': SiReact,
  'React Native': SiReact,
  'Node.js': SiNodedotjs,
  'MongoDB': SiMongodb,
  'Stripe': SiStripe,
  'Redis': SiRedis,
  'Express': FiCode,
  'Socket.io': FiCode,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'WebRTC': SiWebrtc,
  'AWS S3': FaAws,
  'AWS CloudFront': FaAws,
  'Next.js': SiNextdotjs,
  'Tailwind': SiTailwindcss,
  'Kubernetes': SiKubernetes,
  'Firebase': SiFirebase,
  'Google Maps': SiGooglemaps,
};

export default function PortfolioCardGrid({ showFilter = true, limit = null }) {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.app.portfolioFilter);
  const projects = useSelector((state) => state.app.projects);

  const filteredProjects = currentFilter === 'All'
    ? projects
    : projects.filter(p => p.category === currentFilter);

  const displayList = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div>
      {showFilter && (
        <div className="filter-tabs">
          {[
            { id: 'All', label: 'All Work', icon: FiGrid },
            { id: 'Web', label: 'Web Apps', icon: FiGlobe },
            { id: 'Mobile', label: 'Mobile Apps', icon: FiSmartphone },
            { id: 'SaaS', label: 'SaaS & Cloud', icon: FiCloud },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = currentFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => dispatch(setPortfolioFilter(cat.id))}
                className={`tab-btn flex items-center gap-2 ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="portfolio-grid">
        {displayList.map((proj) => (
          <div key={proj.id} className="project-card group">
            <div className="project-thumb">
              {proj.image ? (
                <>
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="project-thumb-img"
                    loading="lazy"
                  />
                  <div className="project-thumb-overlay"></div>
                  <div className="project-thumb-inner relative z-10">
                    <div className="project-thumb-icon">
                      {getProjectIcon(proj.iconKey, { size: 22 })}
                    </div>
                    <span className="project-client-badge">{proj.client}</span>
                  </div>
                </>
              ) : (
                <div className="project-thumb-inner">
                  <div className="project-thumb-icon">
                    {getProjectIcon(proj.iconKey, { size: 24 })}
                  </div>
                  <span className="project-client-badge">{proj.client}</span>
                </div>
              )}
            </div>

            <div className="project-body">
              <div className="flex justify-between items-center mb-2">
                <span className="project-tag">{proj.category}</span>
                <span className="project-metric flex items-center gap-1">
                  <FiTrendingUp size={12} className="text-emerald-400" />
                  {proj.stats}
                </span>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>

              <div className="project-tech">
                {proj.tech.map((t, tIdx) => {
                  const TechIcon = techIconMap[t] || FiCode;
                  return (
                    <span key={tIdx} className="tech-chip flex items-center gap-1.5">
                      <TechIcon size={12} className="text-sky-400" />
                      <span>{t}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
