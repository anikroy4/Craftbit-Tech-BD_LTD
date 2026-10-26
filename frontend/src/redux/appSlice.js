import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api';

// ── Async Thunks for Services ───────────────────────────────────────────────
export const fetchServices = createAsyncThunk('app/fetchServices', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/services`);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch services');
  }
});

export const createService = createAsyncThunk('app/createService', async (serviceData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/services`, serviceData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create service');
  }
});

export const updateService = createAsyncThunk('app/updateService', async ({ id, data: updateData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API}/services/${id}`, updateData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update service');
  }
});

export const deleteService = createAsyncThunk('app/deleteService', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/services/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete service');
  }
});

// ── Async Thunks for Projects ───────────────────────────────────────────────
export const fetchProjects = createAsyncThunk('app/fetchProjects', async (category, { rejectWithValue }) => {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const { data } = await axios.get(`${API}/projects`, { params });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
  }
});

export const createProject = createAsyncThunk('app/createProject', async (projectData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/projects`, projectData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create project');
  }
});

export const updateProject = createAsyncThunk('app/updateProject', async ({ id, data: updateData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API}/projects/${id}`, updateData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update project');
  }
});

export const deleteProject = createAsyncThunk('app/deleteProject', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/projects/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete project');
  }
});

// ── Async Thunks for Quotes ─────────────────────────────────────────────────
export const fetchQuotes = createAsyncThunk('app/fetchQuotes', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/quotes`);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch quotes');
  }
});

export const submitQuoteRequest = createAsyncThunk('app/submitQuoteRequest', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/quotes`, formData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to submit request');
  }
});

export const updateQuoteStatus = createAsyncThunk('app/updateQuoteStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`${API}/quotes/${id}/status`, { status });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update quote status');
  }
});

export const deleteQuote = createAsyncThunk('app/deleteQuote', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/quotes/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete quote');
  }
});

// ── Async Thunks for Dashboard & Users ──────────────────────────────────────
export const fetchDashboardOverview = createAsyncThunk('app/fetchDashboardOverview', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/dashboard/overview`);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard metrics');
  }
});

export const fetchDashboardUsers = createAsyncThunk('app/fetchDashboardUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/dashboard/users`);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const createDashboardUser = createAsyncThunk('app/createDashboardUser', async (userData, { getState, rejectWithValue }) => {
  try {
    const actingRole = getState().app.dashboardRole || 'moderator';
    const { data } = await axios.post(`${API}/dashboard/users`, userData, {
      headers: { 'x-acting-role': actingRole }
    });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create user');
  }
});

export const updateUserRole = createAsyncThunk('app/updateUserRole', async ({ id, role }, { getState, rejectWithValue }) => {
  try {
    const actingRole = getState().app.dashboardRole || 'moderator';
    const { data } = await axios.patch(`${API}/dashboard/users/${id}/role`, { role }, {
      headers: { 'x-acting-role': actingRole }
    });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update user role');
  }
});

export const deleteDashboardUser = createAsyncThunk('app/deleteDashboardUser', async (id, { getState, rejectWithValue }) => {
  try {
    const actingRole = getState().app.dashboardRole || 'moderator';
    await axios.delete(`${API}/dashboard/users/${id}`, {
      headers: { 'x-acting-role': actingRole }
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
  }
});

// ── Async Thunks for Authentication ─────────────────────────────────────────
export const loginUser = createAsyncThunk('app/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/auth/login`, credentials);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Invalid email or password');
  }
});

export const registerUser = createAsyncThunk('app/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/auth/register`, userData);
    return data.data;
  } catch (err) {
    if (err.response?.data?.userExists) {
      return rejectWithValue({
        userExists: true,
        email: err.response.data.existingEmail || userData.email,
        message: err.response.data.message || 'An account with this email already exists. Redirecting to Sign In...'
      });
    }
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const googleAuthUser = createAsyncThunk('app/googleAuthUser', async (googleData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/auth/google`, googleData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Google Authentication failed');
  }
});

export const verifyEmail = createAsyncThunk('app/verifyEmail', async ({ email, code }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/auth/verify-email`, { email, code });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Verification failed. Please check the code.');
  }
});

export const resendVerificationCode = createAsyncThunk('app/resendVerificationCode', async ({ email }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/auth/resend-verification`, { email });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to resend code');
  }
});

export const superAdminResendVerification = createAsyncThunk('app/superAdminResendVerification', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/dashboard/users/${userId}/resend-verification`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to resend verification to user');
  }
});

// ── Theme Helper ────────────────────────────────────────────────────────────
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cb_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  }
  return 'dark';
};

// ── Auth & Role Helpers ─────────────────────────────────────────────────────
const getInitialAuthUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('cb_user');
      if (saved) return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

const getInitialRole = () => {
  if (typeof window !== 'undefined') {
    try {
      const user = JSON.parse(localStorage.getItem('cb_user') || 'null');
      if (user?.role && ['superadmin', 'admin', 'moderator'].includes(user.role)) {
        return user.role;
      }
    } catch { /* fallback */ }
  }
  return null;
};

// ── Slice ───────────────────────────────────────────────────────────────────
const initialUser = getInitialAuthUser();
const initialToken = typeof window !== 'undefined' ? localStorage.getItem('cb_token') : null;
const isInitiallyAuthenticated = Boolean(initialUser && initialToken);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    portfolioFilter: 'All',
    searchQuery: '',
    dashboardRole: isInitiallyAuthenticated ? getInitialRole() : null,

    // Authentication
    currentUser: isInitiallyAuthenticated ? initialUser : null,
    authToken: isInitiallyAuthenticated ? initialToken : null,
    isAuthenticated: isInitiallyAuthenticated,
    authLoading: false,
    authError: null,

    // Services
    services: [],
    servicesLoading: false,
    servicesError: null,

    // Projects
    projects: [],
    projectsLoading: false,
    projectsError: null,

    // Quotes
    quoteRequests: [],
    quoteLoading: false,
    quoteError: null,

    // Dashboard Overview
    dashboardMetrics: null,
    dashboardLoading: false,

    // Users
    dashboardUsers: [],
    usersLoading: false,

    themeMode: getInitialTheme(),
  },
  reducers: {
    setPortfolioFilter(state, action) {
      state.portfolioFilter = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setDashboardRole(state, action) {
      state.dashboardRole = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cb_dashboard_role', action.payload);
      }
    },
    logoutUser(state) {
      state.currentUser = null;
      state.authToken = null;
      state.isAuthenticated = false;
      state.dashboardRole = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cb_user');
        localStorage.removeItem('cb_token');
        localStorage.removeItem('cb_dashboard_role');
      }
    },
    clearAuthError(state) {
      state.authError = null;
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
    },
  },
  extraReducers: (builder) => {
    // ── Services ──
    builder
      .addCase(fetchServices.pending, (state) => {
        state.servicesLoading = true;
        state.servicesError = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.unshift(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s._id === action.payload._id || s.id === action.payload.id);
        if (index !== -1) state.services[index] = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(s => s._id !== action.payload && s.id !== action.payload);
      });

    // ── Projects ──
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projectsLoading = true;
        state.projectsError = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectsLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.projectsLoading = false;
        state.projectsError = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p._id === action.payload._id || p.id === action.payload.id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p._id !== action.payload && p.id !== action.payload);
      });

    // ── Quotes ──
    builder
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.quoteRequests = action.payload;
      })
      .addCase(submitQuoteRequest.pending, (state) => {
        state.quoteLoading = true;
        state.quoteError = null;
      })
      .addCase(submitQuoteRequest.fulfilled, (state, action) => {
        state.quoteLoading = false;
        state.quoteRequests.unshift(action.payload);
      })
      .addCase(submitQuoteRequest.rejected, (state, action) => {
        state.quoteLoading = false;
        state.quoteError = action.payload;
      })
      .addCase(updateQuoteStatus.fulfilled, (state, action) => {
        const index = state.quoteRequests.findIndex(q => q._id === action.payload._id);
        if (index !== -1) state.quoteRequests[index] = action.payload;
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.quoteRequests = state.quoteRequests.filter(q => q._id !== action.payload);
      });

    // ── Dashboard Overview ──
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardMetrics = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state) => {
        state.dashboardLoading = false;
      });

    // ── Users ──
    builder
      .addCase(fetchDashboardUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchDashboardUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.dashboardUsers = action.payload;
      })
      .addCase(createDashboardUser.fulfilled, (state, action) => {
        state.dashboardUsers.unshift(action.payload);
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.dashboardUsers.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.dashboardUsers[index] = action.payload;
      })
      .addCase(deleteDashboardUser.fulfilled, (state, action) => {
        state.dashboardUsers = state.dashboardUsers.filter(u => u._id !== action.payload);
      });

    // ── Authentication ──
    builder
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.currentUser = action.payload.user;
        state.authToken = action.payload.token;
        state.isAuthenticated = true;
        state.dashboardRole = action.payload.user.role;
        if (typeof window !== 'undefined') {
          localStorage.setItem('cb_user', JSON.stringify(action.payload.user));
          localStorage.setItem('cb_token', action.payload.token);
          localStorage.setItem('cb_dashboard_role', action.payload.user.role);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.currentUser = action.payload.user;
        state.authToken = action.payload.token;
        state.isAuthenticated = true;
        state.dashboardRole = action.payload.user.role;
        if (typeof window !== 'undefined') {
          localStorage.setItem('cb_user', JSON.stringify(action.payload.user));
          localStorage.setItem('cb_token', action.payload.token);
          localStorage.setItem('cb_dashboard_role', action.payload.user.role);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = typeof action.payload === 'string' ? action.payload : action.payload?.message || 'Registration failed';
      })
      // ── Google Auth ──
      .addCase(googleAuthUser.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.currentUser = action.payload.user;
        state.authToken = action.payload.token;
        state.isAuthenticated = true;
        state.dashboardRole = action.payload.user.role;
        if (typeof window !== 'undefined') {
          localStorage.setItem('cb_user', JSON.stringify(action.payload.user));
          localStorage.setItem('cb_token', action.payload.token);
          localStorage.setItem('cb_dashboard_role', action.payload.user.role);
        }
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = typeof action.payload === 'string' ? action.payload : action.payload?.message || 'Google authentication failed';
      })
      // ── Verify Email ──
      .addCase(verifyEmail.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.authLoading = false;
        if (state.currentUser) {
          state.currentUser = {
            ...state.currentUser,
            ...action.payload.user,
            isEmailVerified: true
          };
        } else {
          state.currentUser = { ...action.payload.user, isEmailVerified: true };
        }
        if (action.payload.token) {
          state.authToken = action.payload.token;
          state.isAuthenticated = true;
        }
        state.dashboardRole = state.currentUser?.role;
        if (typeof window !== 'undefined') {
          localStorage.setItem('cb_user', JSON.stringify(state.currentUser));
          if (action.payload.token) localStorage.setItem('cb_token', action.payload.token);
          if (state.currentUser?.role) localStorage.setItem('cb_dashboard_role', state.currentUser.role);
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      });
  },
});

export const {
  setPortfolioFilter,
  setSearchQuery,
  setDashboardRole,
  toggleThemeMode,
  logoutUser,
  clearAuthError
} = appSlice.actions;

export default appSlice.reducer;
