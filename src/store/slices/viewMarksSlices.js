import { createSlice } from '@reduxjs/toolkit';

const viewMarksSlices = createSlice({
  name: 'viewMarks',
  initialState: {
    viewMarks: false,
  },
  reducers: {
    setViewMarks(state, action) {
      state.viewMarks = action.payload;
    },
  },
});

export const { setViewMarks } = viewMarksSlices.actions;
export default viewMarksSlices.reducer;
