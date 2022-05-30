import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from '../Events/Event/eventStore';
import { IProject } from '../Models/config-model';


export interface IAppProject {
  project?: IProject,
  token: string
}

const initialState: IAppProject = {
  token: ''
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<IProject>) => {
      state.project = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { addProject, setToken } = projectSlice.actions;

//selectors
export const selectToken = (state: EventStoreState) => {
  return state.project.token;
};

export const selectProject = (state: EventStoreState) => {
  return state.project.project;
}

