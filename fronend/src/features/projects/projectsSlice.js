import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

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
  initialState: { items: [], loading: false, error: null, activeFilter: 'all' },
  reducers: {
    setFilter: (state, action) => { state.activeFilter = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProjects.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setFilter } = projectsSlice.actions;
export default projectsSlice.reducer;
