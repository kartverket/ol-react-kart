import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';

import { EventStoreState } from './Event/eventStore';

export interface IMapClickInfo {
  epsg?: string;
  zoom?: number;
  coordinate?: Coordinate;
  type?: string;
  dragging?: boolean;
  center?: Coordinate;
  extent?: Extent;
}

const initialState: IMapClickInfo = {};

export const getClickCoordinatesSlice = createSlice({
  name: 'getClickCoordinates',
  initialState,
  reducers: {
    setClickCoordinates: (state, action: PayloadAction<IMapClickInfo>) => {
      state.coordinate = action.payload.coordinate;
      state.epsg = action.payload.epsg;
      state.zoom = action.payload.zoom;
      state.center = action.payload.center;
      state.extent = action.payload.extent;
    },
  },
});

export const { setClickCoordinates } = getClickCoordinatesSlice.actions;

// selectors
export const selectClickCoordinates = (state: EventStoreState) => state.clickCoordinates;

// export default getClickCoordinatesSlice.reducer;
