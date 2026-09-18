import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

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
  initialState: { items: [], loading: false, error: null, activeIndex: 0 },
  reducers: {
    setActiveIndex: (state, action) => { state.activeIndex = action.payload; },
    nextTestimonial: (state) => {
      state.activeIndex = (state.activeIndex + 1) % state.items.length;
    },
    prevTestimonial: (state) => {
      state.activeIndex = (state.activeIndex - 1 + state.items.length) % state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTestimonials.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTestimonials.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setActiveIndex, nextTestimonial, prevTestimonial } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
