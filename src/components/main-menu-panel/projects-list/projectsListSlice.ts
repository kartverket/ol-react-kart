import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface IProject {
  SiteTitle: string;
  ProjectName: string;
  HeaderIcon: string;
  HeaderTitle: string;
}

export interface IProjects {
  projects: IProject[];
  status: 'loading' | 'done';
}

const initialState: IProjects = {
  projects: [],
  status: 'loading'
};

export const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<IProject>) => {
      if (state.status === 'loading') {
        state.projects.push(action.payload);
      }
    },
    setStatusDone: (state) => {
      state.status = 'done';
    }
  }
});

export const { addProject, setStatusDone } = projectsListSlice.actions;

//selectors
export const selectProjectsList = (state: RootState) => {
  return state.projectsList;
}
