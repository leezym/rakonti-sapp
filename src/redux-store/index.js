/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './reducers/storySlice';
import uiSlice from './reducers/uiSlice';

export const store = configureStore({
  reducer: {
    story: storyReducer, 
    ui: uiSlice
  }
});