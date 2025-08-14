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

    setPersonalities: (state, action) => {
      if (Array.isArray(action.payload)) {
        // Si el payload es un arreglo, reemplaza toda la lista
        state.personalities = action.payload;
      } else {
        // Si el payload es un solo objeto (JSON), agrega al array
        if (!Array.isArray(state.personalities)) {
          state.personalities = [];
        }
        state.personalities.push(action.payload);
      }
    },

    setPersonality: (state, action) => {
      const index = state.personalities.findIndex(c => c.id_personalidad === action.payload.id_personalidad);
      if (index !== -1) {
        state.personalities[index] = action.payload;
      }
    },

    setRoles: (state, action) => {
      if (!Array.isArray(state.roles)) {
        state.roles = [];
      }
      if (Array.isArray(action.payload)) {
        const filteredRoles = action.payload.filter(
          (newRole, index, self) =>
            index === self.findIndex((r) => r.id === newRole.id)
        );
        state.roles.push(filteredRoles);
      } else if (action.payload) {
        if (state.roles.length === 0) {
          state.roles = [[action.payload]];
        } else {
          const lastGroup = state.roles[state.roles.length - 1];
          const exists = lastGroup.some((r) => r.id === action.payload.id);
          if (!exists) {
            lastGroup.push(action.payload);
          }
        }
      }
    },

    setRol: (state, action) => {
      const { id_personaje, id_rol, ...rest } = action.payload;
      
      for (let group of state.roles) {
        const index = group.findIndex(
          r => r.id_rol === id_rol && r.id_personaje === id_personaje
        );
        if (index !== -1) {
          group[index] = { id_personaje, id_rol, ...rest };
          break;
        }
      }
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
  setPersonality,
  setRoles,
  setRol,
  setCurrentStage
} = storySlice.actions;

export default storySlice.reducer;