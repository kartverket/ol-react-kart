import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinate } from 'ol/coordinate';
import { EventStoreState } from './Event/eventStore';

export interface IMapClickInfo {
  epsg?: string;
  zoom?: number;
  coordinate?: Coordinate;
  type?: string;
  dragging?: boolean;
}

const initialState: IMapClickInfo = {
  
};

export const getClickCoordinatesSlice = createSlice({
  name: 'getClickCoordinates',
  initialState,
  reducers: {
    setClickCoordinates: (state, action: PayloadAction<IMapClickInfo>) => {
      state.coordinate = action.payload.coordinate;
    }
  }
});

export const { setClickCoordinates } = getClickCoordinatesSlice.actions;

// selectors
export const selectClickCoordinates = (state: EventStoreState) => state.clickCoordinates;

// export default getClickCoordinatesSlice.reducer;