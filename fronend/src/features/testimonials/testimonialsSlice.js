import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialDummyTestimonials = [
  {
    _id: 'tm1',
    name: 'Arjun Mehta',
    role: 'CEO & Founder',
    company: 'NexaCore Technologies, India',
    text: 'CraftBit Tech BD transformed our entire operations with an end-to-end custom ERP. Their software architecture is world-class. Delivered on time, within budget, and the codebase is clean, maintainable, and robust. An absolutely phenomenal software engineering partner!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    country: 'India',
    order: 1,
  },
  {
    _id: 'tm2',
    name: 'Sarah Mitchell',
    role: 'Chief Technology Officer',
    company: 'Axiom Digital Solutions, UK',
    text: 'We outsourced our core SaaS product build to CraftBit Tech BD and they exceeded every expectation. The Redux state management is flawless, the UI is pixel-perfect, and their engineering team proactively suggested architectural enhancements that cut our server costs by 40%.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    country: 'UK',
    order: 2,
  },
  {
    _id: 'tm3',
    name: 'Dr. Hassan Al-Farsi',
    role: 'Director of Healthcare IT',
    company: 'Gulf Medical Group, UAE',
    text: 'Our hospital network required a HIPAA-compliant clinical system on an aggressive deadline. CraftBit delivered MediCore in just 12 weeks — complete with EMR, appointment telemedicine, and multi-currency billing. The technical execution and communication were peerless.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    country: 'UAE',
    order: 3,
  },
  {
    _id: 'tm4',
    name: 'Priya Sharma',
    role: 'Head of Product',
    company: 'SkillBridge EdTech, Singapore',
    text: 'The learning management platform built by CraftBit effortlessly supports 60,000+ active students with sub-second page loads. The video CDN pipelines, live classroom sockets, and automated certificate generation are bulletproof. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    country: 'Singapore',
    order: 4,
  },
  {
    _id: 'tm5',
    name: 'James O\'Brien',
    role: 'VP of Engineering',
    company: 'LogiPro Ventures, Australia',
    text: 'CraftBit engineered our real-time IoT freight visibility system from scratch. Their Kubernetes and Docker CI/CD setup has kept us at 99.99% uptime through massive peak holiday shipment volumes. By far the highest quality team we have worked with.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    country: 'Australia',
    order: 5,
  },
];

export const fetchTestimonials = createAsyncThunk('testimonials/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/testimonials');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: initialDummyTestimonials,
    loading: false,
    error: null,
    activeIndex: 0,
  },
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    nextTestimonial: (state) => {
      state.activeIndex = (state.activeIndex + 1) % state.items.length;
    },
    prevTestimonial: (state) => {
      state.activeIndex = (state.activeIndex - 1 + state.items.length) % state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.items = action.payload;
        }
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep initialDummyTestimonials on error
      });
  },
});

export const { setActiveIndex, nextTestimonial, prevTestimonial } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
