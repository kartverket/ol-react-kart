import { configureStore } from '@reduxjs/toolkit';

import { searchSlice } from '../components/search/searchSlice';

export const appStore = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
