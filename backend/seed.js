/**
 * seed.js — Seeds MongoDB with all services & projects from the frontend Redux store.
 * Run once: `npm run seed`
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Service from './models/Service.js';
import Project from './models/Project.js';

const services = [
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
    features: ['Modern React 19 & Next.js', 'REST & GraphQL High-Speed APIs', 'Database Sharding & Optimization', 'JWT & OAuth2 Secure Authentication'],
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
    features: ['React Native & Expo Ecosystem', 'Fluid Native UI Animations', 'Secure Biometric Auth', 'Automated App Store CI/CD'],
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
    features: ['Terraform Infrastructure as Code', 'Docker & Kubernetes Pods', 'GitHub Actions CI/CD Pipelines', '24/7 APM & Log Monitoring'],
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
    features: ['OpenAI & Claude API Tooling', 'RAG Knowledge Bases & Vector DBs', 'Custom Agentic Automation', 'Data Pipeline ETL Engineering'],
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
    features: ['OWASP Top 10 Pen-Testing', 'Static & Dynamic Code Analysis', 'SSL/TLS & AES-256 Encryption', 'Vulnerability Assessment Reports'],
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
    features: ['High-Fidelity Figma Systems', 'Usability Testing & Heatmaps', 'Interactive Prototyping', 'Design-to-Code Precision'],
  },
  {
    id: 'ecommerce-platforms',
    title: 'E-Commerce & Digital Commerce',
    desc: 'High-conversion multivendor marketplaces, custom storefronts, payment gateways, and automated cart checkout pipelines.',
    iconKey: 'cart',
    category: 'Commerce',
    rating: 4.9,
    baseCost: 3000,
    typicalDuration: '4 - 7 Weeks',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    features: ['Custom Checkout & Cart Engines', 'Stripe, bKash & Nagad Gateways', 'Real-Time Inventory Management', 'Automated Order Fulfillment'],
  },
];

const projects = [
  {
    id: 'shopbd',
    title: 'ShopBD Multivendor Marketplace',
    category: 'Web',
    desc: 'Enterprise multivendor marketplace handling 100,000+ daily sessions with automated merchant settlements.',
    tech: ['React 19', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    iconKey: 'cart',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    client: 'Apex Retail BD',
    stats: '+340% Sales Velocity',
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
    stats: '50k+ Daily Active Users',
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
    stats: '120k+ Consultations',
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
    stats: '99.98% Uptime',
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
    stats: '$12M+ Monthly Volume',
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
    stats: '< 25min Avg Delivery',
  },
];

import User from './models/User.js';
import QuoteRequest from './models/QuoteRequest.js';

const initialUsers = [
  {
    name: 'Anik Roy',
    email: 'superadmin@craftbit.com',
    role: 'superadmin',
    status: 'active',
  },
  {
    name: 'Mehedi Hasan',
    email: 'admin@craftbit.com',
    role: 'admin',
    status: 'active',
  },
  {
    name: 'Tasnim Akter',
    email: 'moderator@craftbit.com',
    role: 'moderator',
    status: 'active',
  },
];

const initialQuotes = [
  {
    name: 'Alex Johnson',
    email: 'alex@enterprise-cloud.io',
    service: 'Full-Stack Web Development',
    budget: '$15,000 - $50,000',
    message: 'We require a high-throughput microservices SaaS application with multi-tenant architecture and real-time dashboard.',
    status: 'new',
  },
  {
    name: 'Sadia Rahman',
    email: 'sadia@fintechpulse.com',
    service: 'AI Automation & Agents',
    budget: '$5,000 - $15,000',
    message: 'Looking to integrate custom AI agents for customer support automation and financial record analysis.',
    status: 'reviewed',
  },
  {
    name: 'David Miller',
    email: 'david@meditech-global.org',
    service: 'Cross-Platform Mobile Apps',
    budget: '$15,000 - $50,000',
    message: 'Need an iOS & Android app built with React Native and WebRTC for digital patient triage.',
    status: 'replied',
  },
];

const seed = async () => {
  await connectDB();

  console.log('🌱 Seeding database...');

  // Clear existing data
  await Service.deleteMany({});
  await Project.deleteMany({});
  await User.deleteMany({});
  await QuoteRequest.deleteMany({});
  console.log('🗑️  Cleared existing collections');

  // Insert fresh seed data
  await Service.insertMany(services);
  console.log(`✅ Inserted ${services.length} services`);

  await Project.insertMany(projects);
  console.log(`✅ Inserted ${projects.length} projects`);

  await User.insertMany(initialUsers);
  console.log(`✅ Inserted ${initialUsers.length} initial dashboard users`);

  await QuoteRequest.insertMany(initialQuotes);
  console.log(`✅ Inserted ${initialQuotes.length} sample quotes`);

  console.log('🎉 Database seeded successfully!');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});

