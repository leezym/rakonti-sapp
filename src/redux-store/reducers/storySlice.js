import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  narrative: null,
  feature: null,
  genre: null,
  plot: null,
  desire: null,
  time: null,
  characters: [],
  // personalities y roles eran arrays "paralelos" a characters, indexados
  // por POSICIÓN. Eso se rompía en cuanto characters se filtraba (p.ej. en
  // RCharactersView, por id_historia) o el arreglo quedaba en un orden
  // distinto al esperado: el índice usado para leer personalities[index]/
  // roles[index] ya no correspondía al mismo personaje que characters[index],
  // mostrando o editando la personalidad/roles de OTRO personaje. Ahora son
  // mapas { [id_personaje]: valor }, así que siempre se accede por la llave
  // real del personaje en vez de por posición.
  personalities: {},
  roles: {},
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
        // OJO: action.payload debe ser el personaje real (con id_personaje),
        // nunca la respuesta cruda de axios/el backend (que trae
        // {message, data}) — quien despache esta acción es responsable de
        // pasar solo el objeto del personaje.
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

    // personalities es ahora un mapa { [id_personaje]: personalidad }.
    // action.payload puede ser:
    //   - un mapa completo (para reemplazar todo, p.ej. al cargar una historia)
    //   - { id_personaje, ...personalidad } (para fijar/actualizar una sola entrada)
    setPersonalities: (state, action) => {
      const payload = action.payload;
      if (!payload || typeof payload !== 'object') return;

      if (!state.personalities || Array.isArray(state.personalities)) {
        state.personalities = {};
      }

      if ('id_personaje' in payload) {
        const { id_personaje, ...personalidad } = payload;
        state.personalities[id_personaje] = personalidad;
      } else {
        // Mapa completo (reemplaza todo).
        state.personalities = payload;
      }
    },

    setPersonalityForCharacter: (state, action) => {
      const { id_personaje, personality } = action.payload;
      if (!state.personalities || Array.isArray(state.personalities)) {
        state.personalities = {};
      }
      state.personalities[id_personaje] = personality;
    },

    // roles es ahora un mapa { [id_personaje]: rolesDelPersonaje }.
    setRoles: (state, action) => {
      const payload = action.payload;
      state.roles = (payload && typeof payload === 'object' && !Array.isArray(payload))
        ? payload
        : {};
    },

    setRolesForCharacter: (state, action) => {
      const { id_personaje, roles } = action.payload;
      if (!state.roles || Array.isArray(state.roles)) {
        state.roles = {};
      }
      state.roles[id_personaje] = roles;
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
  setPersonalityForCharacter,
  setRoles,
  setRolesForCharacter,
  setCurrentStage
} = storySlice.actions;

export default storySlice.reducer;
