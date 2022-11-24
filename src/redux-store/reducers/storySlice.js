/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null, 
  modeInfo: null, 
  narrative: null, 
  narrativeInfo: null, 
  feature: null, 
  genre: null, 
  plot: null, 
  desire: null, 
  timeSpace: null, 
  character: null, 
  characterIndex: 0, 
  currentStage: null, 
  currentStageIndex: -1, 
};

export const storySlice = createSlice({
  name: 'story', 
  initialState, 
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    setModeInfo: (state, action) => {
      state.modeInfo = action.payload;
    },

    setNarrative: (state, action) => {
      state.narrative = action.payload;
    },

    setNarrativeInfo: (state, action) => {
      state.narrativeInfo = action.payload;
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
    }, 

    setCharacterIndex: (state, action) => {
      state.characterIndex = action.payload;
    }, 

    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
    }, 

    setCurrentStageIndex: (state, action) => {
      state.currentStageIndex = action.payload;
    }
  }
});

export const { 
  setMode, 
  setModeInfo, 
  setNarrative, 
  setNarrativeInfo, 
  setFeature, 
  setFeatureItem, 
  setCharacter, 
  setCharacterIndex, 
  setCurrentStage, 
  setCurrentStageIndex, 
} = storySlice.actions;

export default storySlice.reducer;