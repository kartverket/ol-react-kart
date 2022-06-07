import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { projectsListSlice } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { searchSlice } from '../components/search/searchSlice';


export const appStore = configureStore({
  reducer: {
    projectsList: projectsListSlice.reducer,
    search: searchSlice.reducer
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;


