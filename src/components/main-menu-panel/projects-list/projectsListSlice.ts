import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';

export interface IProject {
  SiteTitle: string;
  ProjectName: string;
  HeaderIcon: string;
  HeaderTitle: string;
}

export interface IProjectsList {
  projects: IProject[];
  status: 'loading' | 'done';
  showActiveProject: boolean;
  activeProject: IProject;
}

const initialState: IProjectsList = {
  projects: [],
  status: 'loading',
  showActiveProject: false,
  activeProject: {
    SiteTitle: 'friluftsliv',
    ProjectName: 'friluftsliv',
    HeaderIcon: '',
    HeaderTitle: 'friluftsliv',
  },
};

export const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState,
  reducers: {
    addProjectList: (state, action: PayloadAction<IProject>) => {
      if (state.status === 'loading') {
        state.projects.push(action.payload);
      }
    },
    setStatusDone: state => {
      state.status = 'done';
    },
    showActiveProjectFromList: state => {
      state.showActiveProject = !state.showActiveProject;
    },
    setActiveProject: (state, action: PayloadAction<IProject>) => {
      state.activeProject = action.payload;
    },
  },
});

export const { addProjectList, setStatusDone, showActiveProjectFromList, setActiveProject } = projectsListSlice.actions;

//selectors
export const selectProjectsList = (state: RootState) => {
  return state.projectsList.projects;
};

export const selectShowActiveProject = (state: RootState) => {
  return state.projectsList.showActiveProject;
};

export const selectActiveProject = (state: RootState) => {
  return state.projectsList.activeProject;
};
