import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const userData = action.payload;
      state = {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        position: userData.position,
        isAdmin: userData.role === 'ROLE_ADMIN',
        role: userData.role,
        department: userData.department
      };
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
