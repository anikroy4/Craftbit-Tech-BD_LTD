import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialDummyServices = [
  {
    _id: 's1',
    title: 'Custom Software Development',
    description: 'We architect and engineer bespoke software solutions tailored to your business needs — from MVP validation to enterprise-grade web platforms.',
    icon: 'FaLaptopCode',
    features: ['Requirements Analysis & Scoping', 'Modular Clean Architecture', 'Agile 2-Week Sprints', 'Automated QA & Load Testing', 'Post-Launch SLA Support'],
    color: '#0073E6',
    order: 1,
  },
  {
    _id: 's2',
    title: 'SaaS Product Development',
    description: 'End-to-end multi-tenant SaaS engineering with automated subscription billing, granular RBAC permissions, and auto-scaling cloud backends.',
    icon: 'FaCloudUploadAlt',
    features: ['Multi-Tenant Database Design', 'Stripe / Paddle Billing', 'Real-Time Telemetry Analytics', 'Role-Based Access Control', 'Automated Microservices'],
    color: '#00C6FF',
    order: 2,
  },
  {
    _id: 's3',
    title: 'Enterprise Web Applications',
    description: 'Robust, secure, and resilient web applications built for enterprises with complex data workflows, high traffic, and legacy system integrations.',
    icon: 'FaBuilding',
    features: ['Custom ERP & CRM Solutions', 'Workflow Orchestration', 'Enterprise SSO & SAML', 'Audit Logging & Compliance', 'Zero-Downtime Deployment'],
    color: '#6C63FF',
    order: 3,
  },
  {
    _id: 's4',
    title: 'Mobile App Development',
    description: 'Cross-platform iOS and Android applications engineered with React Native and Flutter for buttery 60fps performance and native experience.',
    icon: 'FaMobileAlt',
    features: ['React Native & Flutter', 'Offline-First SQLite Cache', 'Biometric & Push Notifications', 'App Store & Play Store CI/CD', 'Real-Time Sync'],
    color: '#00D4AA',
    order: 4,
  },
  {
    _id: 's5',
    title: 'API & Microservices Architecture',
    description: 'Ultra-fast RESTful and GraphQL APIs designed with distributed event messaging, rate limiting, token rotation, and interactive documentation.',
    icon: 'FaProjectDiagram',
    features: ['High-Throughput GraphQL & REST', 'Docker Microservices Mesh', 'Kong / Traefik API Gateways', 'OAuth 2.0 & JWT Security', 'OpenAPI 3.0 Documentation'],
    color: '#FF6B35',
    order: 5,
  },
  {
    _id: 's6',
    title: 'UI/UX Design & Design Systems',
    description: 'User-centered, conversion-driven interface design from wireframes and interactive Figma prototypes to complete Tailwind component systems.',
    icon: 'FaPencilRuler',
    features: ['User Persona & Journey Maps', 'Interactive Figma Prototypes', 'Production Design Systems', 'WCAG 2.1 AA Accessibility', 'Usability Testing'],
    color: '#E91E8C',
    order: 6,
  },
  {
    _id: 's7',
    title: 'Cloud & DevOps Engineering',
    description: 'Automated CI/CD deployment pipelines, infrastructure as code with Terraform, container orchestration with Kubernetes, and 24/7 server monitoring.',
    icon: 'FaServer',
    features: ['AWS / GCP / Azure Architecture', 'Docker & Kubernetes Clusters', 'GitHub Actions / GitLab CI', 'Terraform & Ansible IaC', '99.99% Availability SLA'],
    color: '#FF9500',
    order: 7,
  },
  {
    _id: 's8',
    title: 'AI & Machine Learning Integration',
    description: 'Empower your software with state-of-the-art AI — conversational LLM agents, intelligent search, predictive analytics, and automated classification.',
    icon: 'FaBrain',
    features: ['LLM & RAG Knowledge Search', 'AI Customer Chatbots', 'Predictive Sales Forecasting', 'Computer Vision & OCR', 'Vector Database Indexing'],
    color: '#9C27B0',
    order: 8,
  },
];

export const fetchServices = createAsyncThunk('services/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/services');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: initialDummyServices,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.items = action.payload;
        }
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep initialDummyServices on error
      });
  },
});

export default servicesSlice.reducer;
