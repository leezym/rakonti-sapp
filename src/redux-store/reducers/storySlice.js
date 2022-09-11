/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null, 
  narrative: null, 
};

export const storySlice = createSlice({
  name: 'story', 
  initialState, 
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    setNarrative: (state, action) => {
      state.narrative = action.payload;
    }
  }
});

export const { setMode, setNarrative } = storySlice.actions;
export default storySlice.reducer;