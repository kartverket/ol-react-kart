import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinate } from 'ol/coordinate';
import { EventStoreState } from '../Events/Event/eventStore';
import { IProject } from '../Models/config-model';


export interface IAppProject {
  project?: IProject,
  token: string,
  center?: Coordinate
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
    },
    setCenter: (state, action: PayloadAction<Coordinate>) => {
      state.center = action.payload;
    }
  }
});

export const { addProject, setToken, setCenter } = projectSlice.actions;

//selectors
export const selectToken = (state: EventStoreState) => {
  return state.project.token;
};

export const selectProject = (state: EventStoreState) => {
  return state.project.project;
}
export const selectCenter = (state: EventStoreState) => {
  return state.project.center;
}

