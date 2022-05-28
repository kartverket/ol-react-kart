import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from './Event/eventStore';

export interface IMapMove {
  coordinates: string;
}

const initialStateMapMoveEnd: IMapMove = {
  coordinates: '0,0',
};

export const mapMoveSlice = createSlice({
  name: 'mapMoveEnd',
  initialState: initialStateMapMoveEnd,
  reducers: {
    mapMoveEnd: (state, action: PayloadAction<IMapMove>) => {
      state.coordinates = action.payload.coordinates;
    }
  }
});

export const { mapMoveEnd } = mapMoveSlice.actions;

export const mapMoveEndCoordinates = (state: EventStoreState) => state.mapMoveEndCoordinates;

