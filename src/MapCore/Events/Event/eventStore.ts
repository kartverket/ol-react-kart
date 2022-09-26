import { configureStore } from '@reduxjs/toolkit';

import { projectSlice } from '../../Project/projectSlice';
import { getClickCoordinatesSlice } from '../getClickCoordinatesSlice';
import { mapMoveSlice } from '../mapMoveSlice';

export const eventStore = configureStore({
  reducer: {
    clickCoordinates: getClickCoordinatesSlice.reducer,
    mapMoveEndCoordinates: mapMoveSlice.reducer,
    project: projectSlice.reducer,
  },
});

export type EventStoreDispatch = typeof eventStore.dispatch;
export type EventStoreState = ReturnType<typeof eventStore.getState>;
