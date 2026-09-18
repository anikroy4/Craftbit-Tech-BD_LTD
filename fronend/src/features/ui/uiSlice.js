import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    navOpen: false,
    scrolled: false,
    activeSection: 'home',
  },
  reducers: {
    toggleNav: (state) => { state.navOpen = !state.navOpen; },
    closeNav: (state) => { state.navOpen = false; },
    setScrolled: (state, action) => { state.scrolled = action.payload; },
    setActiveSection: (state, action) => { state.activeSection = action.payload; },
  },
});

export const { toggleNav, closeNav, setScrolled, setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;
