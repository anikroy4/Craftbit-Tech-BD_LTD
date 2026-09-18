import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialDummyProjects = [
  {
    _id: '1',
    title: 'NexaERP – Enterprise Resource Platform',
    description: 'A comprehensive cloud ERP for global manufacturing covering supply chain, HR, inventory, automated accounting, and executive analytics.',
    category: 'fullstack',
    tech: ['React 19', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'Docker', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'CloudDesk – AI-Powered B2B SaaS Helpdesk',
    description: 'Multi-tenant customer support platform with AI ticket summarization, automated routing, SLA escalation, and omnichannel chat widgets.',
    category: 'fullstack',
    tech: ['Next.js 15', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 2,
  },
  {
    _id: '3',
    title: 'MediCore – Telemedicine & Clinical EMR',
    description: 'HIPAA-compliant hospital management system featuring electronic health records, video consultations, prescription dispatch, and billing.',
    category: 'web',
    tech: ['React', 'Express', 'MongoDB', 'WebRTC', 'Chart.js', 'HIPAA Secure'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'PulsePay – Mobile Banking & Neo-Wallet',
    description: 'Next-gen iOS and Android digital banking app with biometric authentication, QR code payments, split-billing, and virtual debit cards.',
    category: 'mobile',
    tech: ['React Native', 'TypeScript', 'Node.js', 'Redis', 'PCI-DSS', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 4,
  },
  {
    _id: '5',
    title: 'FinTrack – Quantitative Financial Analytics',
    description: 'High-frequency market analytics engine aggregating real-time bank feeds, automated cash flow projections, and predictive tax modelling.',
    category: 'api',
    tech: ['Python FastAPI', 'React', 'D3.js', 'PostgreSQL', 'Docker', 'AWS Lambda'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 5,
  },
  {
    _id: '6',
    title: 'LogiTrack – Global IoT Freight & Telematics',
    description: 'Connected telematics dashboard with real-time GPS fleet monitoring, sensor anomaly detection, cold-chain alerts, and route optimization.',
    category: 'fullstack',
    tech: ['React', 'Node.js', 'MongoDB', 'MQTT', 'Google Maps API', 'Docker'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80',
    liveUrl: 'https://craftbittechbd.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 6,
  },
];

export const fetchProjects = createAsyncThunk('projects/fetchAll', async (category, { rejectWithValue }) => {
  try {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    const res = await api.get(`/projects${params}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: initialDummyProjects,
    allProjects: initialDummyProjects,
    loading: false,
    error: null,
    activeFilter: 'all',
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
      if (action.payload === 'all') {
        state.items = state.allProjects;
      } else {
        state.items = state.allProjects.filter((p) => p.category === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.items = action.payload;
          state.allProjects = action.payload;
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep initialDummyProjects on error
      });
  },
});

export const { setFilter } = projectsSlice.actions;
export default projectsSlice.reducer;
