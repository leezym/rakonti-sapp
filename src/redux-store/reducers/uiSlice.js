/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backIcon: null,
  menuIcon: null, 
  figurePos: null, 
  editingMode: false, 
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
    }, 

    setEditingMode: (state, action) => {
      state.editingMode = action.payload;
    }
  }
});

export const {
  setBackIcon, 
  setMenuIcon, 
  setFigurePos, 
  setEditingMode, 
} = uiSlice.actions;

export default uiSlice.reducer;