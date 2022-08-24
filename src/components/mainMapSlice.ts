import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type marker = [markerLat?: number, markerLon?: number];
export type center = [lat?: number, lon?: number, zoom?: number];
export type selection = {
  p?: string;
  showSelection?: boolean;
  selection?: string;
  selectionType?: string;
};
export type wms = {
  showWms?: boolean;
  wms?: string | undefined;
  addLayer?: string | undefined;
  wmsStyles?: string | undefined;
};
export type project = string;

export interface IMainState {
  center?: center;
  zoom?: number;
  project?: string;
  layers?: string[];
  marker?: marker;
  selection?: selection;
  sok?: string;
  wms?: wms;
  drawing?: string;
}

const initialState = {} as IMainState;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<center>) => {
      state.center = action.payload;
    },
    setProject: (state, action: PayloadAction<project>) => {
      state.project = action.payload;
    },
    setLayers: (state, action: PayloadAction<string[]>) => {
      state.layers = action.payload;
    },
    setMarkerCenter: (state, action: PayloadAction<marker>) => {
      state.marker = action.payload;
    },
    setP: (state, action: PayloadAction<selection>) => {
      state.selection = action.payload;
    },
    setSok: (state, action: PayloadAction<string | undefined>) => {
      state.sok = action.payload;
    },
    setWms: (state, action: PayloadAction<wms>) => {
      state.wms = action.payload;
    },
    setDrawing: (state, action: PayloadAction<string>) => {
      state.drawing = action.payload;
    },
  },
});

export const { setCenter, setProject, setLayers, setMarkerCenter, setP, setSok, setWms, setDrawing } =
  mainSlice.actions;

//selectors
export const selectSokState = (state: RootState) => {
  if (state.main) {
    return state.main.sok;
  } else {
    return '';
  }
};
export const selectLayersState = (state: RootState) => {
  if (state.main) {
    return state.main.layers;
  } else {
    return [];
  }
}
