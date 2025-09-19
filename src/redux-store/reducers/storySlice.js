import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  narrative: null,
  feature: null,
  genre: null,
  plot: null,
  desire: null,
  time: null,
  characters: [],
  personalities: [],
  roles: [],
  currentStage: 0
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setNarrative: (state, action) => {
      state.narrative = action.payload;
    },

    setFeature: (state, action) => {
      state.feature = action.payload;
    },

    setGenre: (state, action) => {
      state.genre = action.payload;
    },

    setPlot: (state, action) => {
      state.plot = action.payload;
    },

    setDesire: (state, action) => {
      state.desire = action.payload;
    },

    setTime: (state, action) => {
      state.time = action.payload;
    },

    setCharacters: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.characters = action.payload;
      } else {
        if (!Array.isArray(state.characters)) {
          state.characters = [];
        }
        state.characters.push(action.payload);
      }
    },

    setCharacter: (state, action) => {
      const index = state.characters.findIndex(
        c => c.id_personaje === action.payload.id_personaje
      );
      if (index !== -1) {
        state.characters[index] = action.payload;
      }
    },

    setPersonalities: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.personalities = action.payload;
      } else {
        if (!Array.isArray(state.personalities)) {
          state.personalities = [];
        }
        state.personalities.push(action.payload);
      }
    },

    setPersonalitiesAtIndex: (state, action) => {
      const { index, personality } = action.payload;
      if (!Array.isArray(state.personalities)) {
        state.personalities = [];
      }
      state.personalities[index] = personality;
    },

    setRoles: (state, action) => {
      state.roles = action.payload;
    },

    setRolesAtIndex: (state, action) => {
      const { index, roles } = action.payload;
      if (!Array.isArray(state.roles)) {
        state.roles = [];
      }
      state.roles[index] = roles;
    },

    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
    }
  }
});

export const {
  setNarrative,
  setFeature,
  setGenre,
  setPlot,
  setTime,
  setDesire,
  setCharacters,
  setCharacter,
  setPersonalities,
  setPersonalitiesAtIndex,
  setRoles,
  setRolesAtIndex,
  setCurrentStage
} = storySlice.actions;

export default storySlice.reducer;
