import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null,
  narrative: null,
  feature: null,
  characters: [],
  currentStage: 0,
  text: [], 
  audios: [], 
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
    
    setCharacters: (state, action) => {
      if (Array.isArray(action.payload)) {
        // Si el payload es un arreglo, reemplaza toda la lista
        state.characters = action.payload;
      } else {
        // Si el payload es un solo objeto (JSON), agrega al array
        if (!Array.isArray(state.characters)) {
          state.characters = [];
        }
        state.characters.push(action.payload);
      }
    },

    setCharacter: (state, action) => {
      const index = state.characters.findIndex(c => c.id_personaje === action.payload.id_personaje);
      if (index !== -1) {
        state.characters[index] = action.payload;
      }
    },

    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
    },

    addText: (state, action) => {
      const { index, newText } = action.payload;
      if (state.text[index] === null || state.text[index] === undefined) {
        state.text.push(newText);
      }
      else {
        state.text[index] = newText;
      }
    },
    
    setText: (state, action) => {
      state.text = action.payload;
    }, 

    addAudio: (state, action) => {
      state.audios.push(action.payload);
    }, 

    setAudios: (state, action) => {
      state.audios = action.payload;
    }
  }
});

export const { 
  setMode,
  setModeInfo, 
  setNarrative,
  setFeature,
  setCharacters, 
  setCharacter,
  setCurrentStage, 
  setCurrentStageIndex, 
  addText, 
  setText, 
  addAudio, 
  setAudios 
} = storySlice.actions;

export default storySlice.reducer;