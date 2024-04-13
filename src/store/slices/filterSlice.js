import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    isOverlay: false,
    type: '',
  },
  reducers: {
    showOverlay(state) {
      state.isOverlay = true;
    },
    hiddenOverlay(state) {
      state.isOverlay = false;
      state.type = '';
    },
    setType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { showOverlay, hiddenOverlay, setType } = filterSlice.actions;

export default filterSlice.reducer;
