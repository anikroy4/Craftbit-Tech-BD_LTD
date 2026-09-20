import { createSlice } from '@reduxjs/toolkit';

const initialServices = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    desc: 'Scalable, high-performance web applications built with modern architectures: MongoDB, Express, React 19, and Node.js.',
    iconKey: 'web',
    category: 'Engineering',
    rating: 4.9,
    baseCost: 2500,
    typicalDuration: '3 - 6 Weeks',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    features: ['Modern React 19 & Next.js', 'REST & GraphQL High-Speed APIs', 'Database Sharding & Optimization', 'JWT & OAuth2 Secure Authentication']
  },
  {
    id: 'mobile-dev',
    title: 'Cross-Platform Mobile Apps',
    desc: 'Fluid, 60fps iOS and Android applications with native device integrations and offline-first capabilities.',
    iconKey: 'mobile',
    category: 'Mobile',
    rating: 4.8,
    baseCost: 3500,
    typicalDuration: '4 - 8 Weeks',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    features: ['React Native & Expo Ecosystem', 'Fluid Native UI Animations', 'Secure Biometric Auth', 'Automated App Store CI/CD']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    desc: 'Robust, zero-downtime infrastructure provisioning on AWS, GCP, and Azure with Kubernetes clusters.',
    iconKey: 'cloud',
    category: 'Cloud',
    rating: 5.0,
    baseCost: 2000,
    typicalDuration: '2 - 4 Weeks',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    features: ['Terraform Infrastructure as Code', 'Docker & Kubernetes Pods', 'GitHub Actions CI/CD Pipelines', '24/7 APM & Log Monitoring']
  },
  {
    id: 'ai-ml',
    title: 'AI Automation & Agents',
    desc: 'Custom LLM workflows, conversational AI copilots, and predictive machine learning models tailored to company data.',
    iconKey: 'ai',
    category: 'AI',
    rating: 4.9,
    baseCost: 4000,
    typicalDuration: '4 - 7 Weeks',
    image: '/ai-agents-showcase.jpg',
    features: ['OpenAI & Claude API Tooling', 'RAG Knowledge Bases & Vector DBs', 'Custom Agentic Automation', 'Data Pipeline ETL Engineering']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Auditing',
    desc: 'Penetration testing, source code auditing, compliance certification prep, and hardened infrastructure.',
    iconKey: 'security',
    category: 'Security',
    rating: 4.9,
    baseCost: 1800,
    typicalDuration: '2 - 3 Weeks',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    features: ['OWASP Top 10 Pen-Testing', 'Static & Dynamic Code Analysis', 'SSL/TLS & AES-256 Encryption', 'Vulnerability Assessment Reports']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    desc: 'Interactive Figma design systems, customer journey mapping, user research, and high-conversion prototypes.',
    iconKey: 'design',
    category: 'Design',
    rating: 4.8,
    baseCost: 1500,
    typicalDuration: '2 - 4 Weeks',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    features: ['High-Fidelity Figma Systems', 'Usability Testing & Heatmaps', 'Interactive Prototyping', 'Design-to-Code Precision']
  }
];

const initialProjects = [
  {
    id: 'shopbd',
    title: 'ShopBD Multivendor Marketplace',
    category: 'Web',
    desc: 'Enterprise multivendor marketplace handling 100,000+ daily sessions with automated merchant settlements.',
    tech: ['React 19', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    iconKey: 'cart',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    client: 'Apex Retail BD',
    stats: '+340% Sales Velocity'
  },
  {
    id: 'taskflow',
    title: 'TaskFlow SaaS Workspace',
    category: 'SaaS',
    desc: 'Real-time collaborative project management suite with Kanban boards, Gantt charts, and live team audio rooms.',
    tech: ['React', 'Express', 'Socket.io', 'PostgreSQL', 'Docker'],
    iconKey: 'kanban',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    client: 'Nexa Global UK',
    stats: '50k+ Daily Active Users'
  },
  {
    id: 'medipulse',
    title: 'MediPulse Telemedicine Platform',
    category: 'Mobile',
    desc: 'Patient care ecosystem with encrypted video consultation, digital prescriptions, and vital stats tracking.',
    tech: ['React Native', 'Node.js', 'WebRTC', 'AWS S3'],
    iconKey: 'health',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    client: 'Dhaka Health Services',
    stats: '120k+ Consultations'
  },
  {
    id: 'edusphere',
    title: 'EduSphere Interactive LMS',
    category: 'Web',
    desc: 'Interactive streaming education portal with live quizzes, AI grading assistance, and accredited diplomas.',
    tech: ['Next.js', 'MongoDB', 'AWS CloudFront', 'Tailwind'],
    iconKey: 'edu',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    client: 'EduLearn Academy',
    stats: '99.98% Uptime'
  },
  {
    id: 'payswift',
    title: 'PaySwift FinTech Gateway',
    category: 'SaaS',
    desc: 'PCI-DSS certified multi-currency payment infrastructure routing transactions across South Asia and Europe.',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    iconKey: 'fintech',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    client: 'PaySwift Financials',
    stats: '$12M+ Monthly Volume'
  },
  {
    id: 'foodcourier',
    title: 'FoodCourier Rapid Delivery',
    category: 'Mobile',
    desc: 'Ultra-fast food dispatch system featuring live sub-second GPS rider telemetry and dynamic route optimization.',
    tech: ['React Native', 'Express', 'Google Maps API', 'Firebase'],
    iconKey: 'delivery',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    client: 'Express Eats BD',
    stats: '< 25min Avg Delivery'
  }
];

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cb_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  }
  return 'dark';
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    portfolioFilter: 'All',
    searchQuery: '',
    services: initialServices,
    projects: initialProjects,
    quoteRequests: [],
    themeMode: getInitialTheme(),
  },
  reducers: {
    setPortfolioFilter(state, action) {
      state.portfolioFilter = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    submitQuoteRequest(state, action) {
      state.quoteRequests.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString()
      });
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
    }
  }
});

export const { setPortfolioFilter, setSearchQuery, submitQuoteRequest, toggleThemeMode } = appSlice.actions;
export default appSlice.reducer;

