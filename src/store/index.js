import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import tokenSlices from './slices/tokenSlices';
import filterSlice from './slices/filterSlice';
import viewMarksSlices from './slices/viewMarksSlices';
import isAppreciatedSlices from './slices/isAppreciatedSlices';

export default configureStore({
  reducer: {
    user: userSlice,
    token: tokenSlices,
    filter: filterSlice,
    viewMarks: viewMarksSlices,
    isAppreciated: isAppreciatedSlices,
  },
});
