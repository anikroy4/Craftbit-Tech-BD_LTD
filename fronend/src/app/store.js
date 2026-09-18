import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from '../features/services/servicesSlice';
import projectsReducer from '../features/projects/projectsSlice';
import testimonialsReducer from '../features/testimonials/testimonialsSlice';
import teamReducer from '../features/team/teamSlice';
import contactReducer from '../features/contact/contactSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    projects: projectsReducer,
    testimonials: testimonialsReducer,
    team: teamReducer,
    contact: contactReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
