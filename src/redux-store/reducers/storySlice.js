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
  reducers: {}
});

export const {} = storySlice.actions;
export default storySlice.reducer;