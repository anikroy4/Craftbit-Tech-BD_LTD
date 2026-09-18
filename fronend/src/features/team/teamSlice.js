import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

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
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTeam.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTeam.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default teamSlice.reducer;
