import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // usa localStorage por defecto
import { persistStore, persistReducer } from 'redux-persist';

import storyReducer from './reducers/storySlice';
import uiReducer from './reducers/uiSlice';

// Combinar reducers
const rootReducer = combineReducers({
  story: storyReducer,
  ui: uiReducer,
});

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
});

// Crear persistor
export const persistor = persistStore(store);