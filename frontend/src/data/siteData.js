// ─── NAVIGATION ─────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'About',      href: '#about' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Contact',    href: '#contact' },
];

// ─── HERO ────────────────────────────────────────────────────────────────────
export const heroData = {
  badge: 'MERN Stack Experts · Bangladesh',
  headline: ['Building', 'Digital', 'Futures'],
  subheadline: 'Pixel-perfect web & mobile solutions powered by the MERN stack. We craft scalable, performant, and beautiful software that drives business growth.',
  cta: { primary: 'Start a Project', secondary: 'View Our Work' },
  stats: [
    { value: 120, suffix: '+', label: 'Projects Delivered' },
    { value: 50,  suffix: '+', label: 'Happy Clients' },
    { value: 5,   suffix: '+', label: 'Years of Experience' },
    { value: 99,  suffix: '%', label: 'Client Satisfaction' },
  ],
};

// ─── SERVICES ────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    icon: 'Monitor',
    color: 'blue',
    title: 'Full-Stack Web Development',
    description: 'End-to-end web applications built with the MERN stack — MongoDB, Express.js, React, and Node.js — optimized for speed and scale.',
    features: ['React & Next.js SPAs', 'REST & GraphQL APIs', 'Database Architecture', 'Server-Side Rendering'],
  },
  {
    id: 2,
    icon: 'Smartphone',
    color: 'purple',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps with React Native that deliver native performance on both iOS and Android from a single codebase.',
    features: ['React Native Apps', 'Expo Framework', 'Push Notifications', 'App Store Deployment'],
  },
  {
    id: 3,
    icon: 'Cloud',
    color: 'cyan',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure on AWS, GCP, and Azure with CI/CD pipelines, containerization, and zero-downtime deployments.',
    features: ['AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
  },
  {
    id: 4,
    icon: 'Bot',
    color: 'emerald',
    title: 'AI & Automation',
    description: 'Intelligent automation solutions and AI-powered features integrated into your existing workflow to save time and reduce errors.',
    features: ['ChatGPT Integration', 'Process Automation', 'Data Analytics', 'Machine Learning APIs'],
  },
  {
    id: 5,
    icon: 'ShieldCheck',
    color: 'orange',
    title: 'Cybersecurity',
    description: 'Comprehensive security audits, penetration testing, and implementation of best-practice security protocols for your applications.',
    features: ['Security Audits', 'Penetration Testing', 'OWASP Compliance', 'SSL & Encryption'],
  },
  {
    id: 6,
    icon: 'BarChart3',
    color: 'pink',
    title: 'UI/UX Design',
    description: 'User-centered design that converts visitors into customers. From wireframes to pixel-perfect Figma prototypes and implementation.',
    features: ['Figma Prototypes', 'Design Systems', 'User Research', 'A/B Testing'],
  },
];

// ─── ABOUT ────────────────────────────────────────────────────────────────────
export const aboutData = {
  badge: 'About Us',
  headline: 'Crafting Code, Building Futures',
  description: 'CraftBit Tech BD is a Dhaka-based software agency founded by a team of passionate engineers and designers. We specialize in the MERN stack and deliver world-class digital products for startups, SMEs, and enterprises globally.',
  mission: 'Our mission is to empower businesses through innovative technology — transforming complex challenges into elegant, scalable digital solutions.',
  values: [
    { icon: 'Zap',     title: 'Speed',      desc: 'We ship fast without compromising quality.' },
    { icon: 'Code2',   title: 'Clean Code', desc: 'Maintainable, tested, and documented code always.' },
    { icon: 'Users',   title: 'Teamwork',   desc: 'Collaborative approach, transparent communication.' },
    { icon: 'Trophy',  title: 'Excellence', desc: 'We never settle for "good enough."' },
  ],
  team: [
    { name: 'Rafiul Islam',    role: 'CEO & Lead Architect',    initials: 'RI', color: 'blue' },
    { name: 'Tasnim Akter',    role: 'Head of UI/UX Design',    initials: 'TA', color: 'purple' },
    { name: 'Mehedi Hasan',    role: 'Senior MERN Developer',   initials: 'MH', color: 'cyan' },
    { name: 'Nusrat Jahan',    role: 'DevOps & Cloud Engineer', initials: 'NJ', color: 'emerald' },
  ],
};

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
export const portfolioCategories = ['All', 'Web App', 'Mobile', 'E-Commerce', 'SaaS'];

export const projects = [
  {
    id: 1,
    title: 'ShopBD — E-Commerce Platform',
    category: 'E-Commerce',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    color: 'blue',
    link: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'TaskFlow — Project Manager',
    category: 'SaaS',
    tech: ['React', 'Express', 'Socket.io', 'Redis'],
    description: 'Real-time collaborative project management SaaS with Kanban boards and team workspaces.',
    color: 'purple',
    link: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'MediCare BD — Health App',
    category: 'Mobile',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    description: 'Doctor appointment booking app with telemedicine, prescriptions, and health records.',
    color: 'emerald',
    link: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'EduVerse — Learning Platform',
    category: 'Web App',
    tech: ['Next.js', 'MongoDB', 'AWS S3', 'Stripe'],
    description: 'Online learning platform with video courses, quizzes, certificates, and live classes.',
    color: 'orange',
    link: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'RentEasy — Property Portal',
    category: 'Web App',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Maps API'],
    description: 'Property listing and rental platform with map search, virtual tours, and booking system.',
    color: 'cyan',
    link: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'FoodRush — Delivery App',
    category: 'Mobile',
    tech: ['React Native', 'Express', 'MongoDB', 'FCM'],
    description: 'Food delivery mobile app with live order tracking, multi-restaurant support, and loyalty rewards.',
    color: 'pink',
    link: '#',
    featured: false,
  },
];

// ─── TECH STACK ──────────────────────────────────────────────────────────────
export const techCategories = [
  {
    name: 'Frontend',
    icon: 'Layout',
    techs: [
      { name: 'React',       level: 98 },
      { name: 'Next.js',     level: 95 },
      { name: 'TypeScript',  level: 92 },
      { name: 'Tailwind CSS',level: 97 },
      { name: 'Redux',       level: 90 },
      { name: 'Framer Motion',level: 85 },
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    techs: [
      { name: 'Node.js',     level: 96 },
      { name: 'Express.js',  level: 95 },
      { name: 'GraphQL',     level: 88 },
      { name: 'REST APIs',   level: 98 },
      { name: 'Socket.io',   level: 90 },
      { name: 'JWT / Auth',  level: 94 },
    ],
  },
  {
    name: 'Database',
    icon: 'Database',
    techs: [
      { name: 'MongoDB',     level: 96 },
      { name: 'Mongoose',    level: 95 },
      { name: 'PostgreSQL',  level: 87 },
      { name: 'Redis',       level: 85 },
      { name: 'Firebase',    level: 88 },
      { name: 'Prisma ORM',  level: 83 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: 'Cloud',
    techs: [
      { name: 'AWS',         level: 88 },
      { name: 'Docker',      level: 90 },
      { name: 'GitHub CI/CD',level: 92 },
      { name: 'Nginx',       level: 85 },
      { name: 'Vercel',      level: 95 },
      { name: 'Linux',       level: 88 },
    ],
  },
];

export const techLogos = [
  { name: 'MongoDB',    color: '#47A248', letter: 'M' },
  { name: 'Express',    color: '#ffffff', letter: 'Ex' },
  { name: 'React',      color: '#61DAFB', letter: 'Re' },
  { name: 'Node.js',    color: '#339933', letter: 'N' },
  { name: 'Next.js',    color: '#ffffff', letter: 'Nx' },
  { name: 'TypeScript', color: '#3178C6', letter: 'TS' },
  { name: 'Tailwind',   color: '#06B6D4', letter: 'TW' },
  { name: 'Docker',     color: '#2496ED', letter: 'D' },
  { name: 'AWS',        color: '#FF9900', letter: 'AWS' },
  { name: 'Redux',      color: '#764ABC', letter: 'Rx' },
  { name: 'GraphQL',    color: '#E10098', letter: 'GQL' },
  { name: 'PostgreSQL', color: '#4169E1', letter: 'PG' },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    role: 'CTO, NexaTech UK',
    avatar: 'AT',
    color: 'blue',
    rating: 5,
    text: 'CraftBit Tech BD delivered our entire SaaS platform in record time. The code quality was exceptional — clean, well-documented, and easily maintainable. They exceeded every expectation.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Founder, EduStartup India',
    avatar: 'PS',
    color: 'purple',
    rating: 5,
    text: 'Our learning platform handles 10,000+ concurrent users flawlessly. The team\'s deep MERN expertise and proactive communication made the entire development journey smooth and stress-free.',
  },
  {
    id: 3,
    name: 'Mohammed Al-Rashid',
    role: 'CEO, Gulf Retail Group',
    avatar: 'MR',
    color: 'cyan',
    rating: 5,
    text: 'The e-commerce platform they built for us increased sales by 340% in the first quarter. Their attention to UI/UX details and backend performance is truly world-class.',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Product Manager, FinTech USA',
    avatar: 'SW',
    color: 'emerald',
    rating: 5,
    text: 'From complex API integrations to beautiful UI animations, CraftBit handled everything perfectly. They feel less like a vendor and more like a long-term technology partner.',
  },
  {
    id: 5,
    name: 'Thomas Mueller',
    role: 'Director, MediaGroup Germany',
    avatar: 'TM',
    color: 'orange',
    rating: 5,
    text: 'Outstanding results — our web application performance improved by 60% after CraftBit\'s optimization work. The team is highly skilled, responsive, and incredibly professional.',
  },
];

// ─── CONTACT ─────────────────────────────────────────────────────────────────
export const contactInfo = [
  {
    icon: 'MapPin',
    label: 'Office',
    value: 'Dhaka, Bangladesh',
    sub: 'House 12, Road 5, Banani, Dhaka 1213',
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'hello@craftbittechbd.com',
    sub: 'We reply within 2 hours',
  },
  {
    icon: 'Phone',
    label: 'Phone',
    value: '+880 1700-000000',
    sub: 'Sun – Thu, 9am – 7pm BST',
  },
  {
    icon: 'Globe',
    label: 'Website',
    value: 'www.craftbittechbd.com',
    sub: 'Available 24/7',
  },
];

export const socialLinks = [
  { name: 'GitHub',    icon: 'Github',    href: 'https://github.com/craftbittechbd' },
  { name: 'LinkedIn',  icon: 'Linkedin',  href: 'https://linkedin.com/company/craftbittechbd' },
  { name: 'Facebook',  icon: 'Facebook',  href: 'https://facebook.com/craftbittechbd' },
  { name: 'Twitter',   icon: 'Twitter',   href: 'https://twitter.com/craftbittechbd' },
];
