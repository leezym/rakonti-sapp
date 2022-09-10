/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './reducers/storySlice';

export const store = configureStore({
  reducer: {
    story: storyReducer
  }
});