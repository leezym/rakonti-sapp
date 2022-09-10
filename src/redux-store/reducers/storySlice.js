/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null
};

export const storySlice = createSlice({
  name: 'story', 
  initialState, 
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    }
  }
});

export const { setMode } = storySlice.actions;
export default storySlice.reducer;