import { createSlice } from '@reduxjs/toolkit';

const tokenSlices = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlices.actions;
export default tokenSlices.reducer;
