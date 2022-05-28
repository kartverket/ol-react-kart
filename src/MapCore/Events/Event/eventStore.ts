import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { getClickCoordinatesSlice } from '../getClickCoordinatesSlice';
import { mapMoveSlice } from '../mapMoveSlice';

export const eventStore = configureStore({
  reducer: {
    clickCoordinates: getClickCoordinatesSlice.reducer,
    mapMoveEndCoordinates: mapMoveSlice.reducer 
  },
});

export type EventStoreDispatch = typeof eventStore.dispatch;
export type EventStoreState = ReturnType<typeof eventStore.getState>;


