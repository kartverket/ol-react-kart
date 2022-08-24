import { configureStore } from '@reduxjs/toolkit';
import { projectsListSlice } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { mainSlice } from '../components/mainMapSlice';
import { searchSlice } from '../components/search/searchSlice';

export const appStore = configureStore({
  reducer: {
    projectsList: projectsListSlice.reducer,
    search: searchSlice.reducer,
    main: mainSlice.reducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
