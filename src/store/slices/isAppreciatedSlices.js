import { createSlice } from '@reduxjs/toolkit';

const isAppreciatedSlices = createSlice({
  name: 'isAppreciated',
  initialState: {
    isAppreciated: true,
  },
  reducers: {
    setIsAppreciated(state, action) {
      state.isAppreciated = action.payload;
    },
  },
});

export const { setIsAppreciated } = isAppreciatedSlices.actions;
export default isAppreciatedSlices.reducer;
