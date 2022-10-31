/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null, 
  narrative: null, 
  feature: null, 
  genre: null, 
  plot: null, 
  desire: null, 
  timeSpace: null, 
  character: null,
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
    },

    setFeature: (state, action) => {
      state.feature = action.payload;
    },

    setFeatureItem: (state, action) => {
      /** Actualiza: genre, plot, desire, timeSpace */
      const { payload } = action;
      state[payload.key] = payload.value;
    }, 

    setCharacter: (state, action) => {
      state.character = action.payload;
    }
  }
});

export const { 
  setMode, 
  setNarrative, 
  setFeature, 
  setFeatureItem, 
  setCharacter, 
} = storySlice.actions;

export default storySlice.reducer;