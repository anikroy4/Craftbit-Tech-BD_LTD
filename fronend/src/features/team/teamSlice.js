import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialDummyTeam = [
  {
    _id: 't1',
    name: 'Md. Anik Rahman',
    role: 'CEO & Lead Software Architect',
    bio: 'Enterprise systems architect with 6+ years of leadership designing scalable distributed systems for global clients across 15+ countries.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    skills: ['System Architecture', 'Node.js', 'React 19', 'AWS Cloud', 'MongoDB'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 1,
  },
  {
    _id: 't2',
    name: 'Fatema Khatun',
    role: 'Head of Product Design',
    bio: 'Principal UX/UI designer crafting cohesive design systems and enterprise SaaS experiences used daily by over 100,000 active users.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    skills: ['Figma UI/UX', 'Design Systems', 'Tailwind CSS', 'User Research', 'Prototyping'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 2,
  },
  {
    _id: 't3',
    name: 'Shakib Hossain',
    role: 'Staff Backend Engineer',
    bio: 'Distributed systems engineer focused on high-throughput microservices, sub-millisecond database queries, and resilient messaging queues.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    skills: ['Go & Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis Cache'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 3,
  },
  {
    _id: 't4',
    name: 'Nusrat Jahan',
    role: 'Lead Frontend Engineer',
    bio: 'React and TypeScript specialist building accessible, pixel-perfect, and ultra-performant user interfaces for complex analytics dashboards.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    skills: ['React.js', 'Redux Toolkit', 'TypeScript', 'Next.js 15', 'Framer Motion'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 4,
  },
  {
    _id: 't5',
    name: 'Rafiqul Islam',
    role: 'Senior Mobile Engineer',
    bio: 'Cross-platform mobile architect with 10+ published apps across App Store and Google Play, with combined downloads exceeding 250,000.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    skills: ['React Native', 'Flutter', 'Swift / Kotlin', 'Firebase', 'Mobile CI/CD'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 5,
  },
  {
    _id: 't6',
    name: 'Tanvir Ahmed',
    role: 'Lead DevOps & Cloud Engineer',
    bio: 'AWS-certified solutions architect orchestrating multi-region cloud infrastructures, Kubernetes clusters, and zero-downtime deployment pipelines.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    skills: ['AWS / GCP', 'Terraform IaC', 'Kubernetes', 'GitHub Actions', 'Datadog APM'],
    social: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    order: 6,
  },
];

export const fetchTeam = createAsyncThunk('team/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/team');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    items: initialDummyTeam,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.items = action.payload;
        }
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep initialDummyTeam on error
      });
  },
});

export default teamSlice.reducer;
