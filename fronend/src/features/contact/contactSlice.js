import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const submitContact = createAsyncThunk('contact/submit', async (formData, { rejectWithValue }) => {
  try {
    const res = await api.post('/contact', formData);
    return res.message;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    success: false,
    error: null,
    formData: { name: '', email: '', phone: '', subject: '', message: '' },
  },
  reducers: {
    updateField: (state, action) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.formData = { name: '', email: '', phone: '', subject: '', message: '' };
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => { state.loading = true; state.error = null; state.success = false; })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.formData = { name: '', email: '', phone: '', subject: '', message: '' };
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetForm } = contactSlice.actions;
export default contactSlice.reducer;
