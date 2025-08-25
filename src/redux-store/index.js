import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // usa localStorage por defecto
import { persistStore, persistReducer } from 'redux-persist';

import storyReducer from './reducers/storySlice';

// Combinar reducers reales
const appReducer = combineReducers({
  story: storyReducer
});

// Reducer raíz con reset en LOGOUT
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined; // esto resetea el state entero
  }
  return appReducer(state, action);
};

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['story'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }),
});

// Crear persistor
export const persistor = persistStore(store);