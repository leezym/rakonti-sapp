/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backIcon: null,
  menuIcon: null, 
  figurePos: null,
};

export const uiSlice = createSlice({
  name: 'ui', 
  initialState, 
  reducers: {
    setBackIcon: (state, action) => {
      state.backIcon = action.payload;
    }, 

    setMenuIcon: (state, action) => {
      state.menuIcon = action.payload;
    }, 
    
    setFigurePos: (state, action) => {
      state.figurePos = action.payload;
    }
  }
});

export const {
  setBackIcon, 
  setMenuIcon, 
  setFigurePos, 
} = uiSlice.actions;

export default uiSlice.reducer;