import { configureStore } from '@reduxjs/toolkit';
import { layersSlice } from '../../Layers/layersSlice';
import { projectSlice } from '../../Project/projectSlice';
import { getClickCoordinatesSlice } from '../getClickCoordinatesSlice';
import { mapMoveSlice } from '../mapMoveSlice';

export const eventStore = configureStore({
  reducer: {
    clickCoordinates: getClickCoordinatesSlice.reducer,
    mapMoveEndCoordinates: mapMoveSlice.reducer,
    layers: layersSlice.reducer,
    project: projectSlice.reducer,
  },
});

export type EventStoreDispatch = typeof eventStore.dispatch;
export type EventStoreState = ReturnType<typeof eventStore.getState>;
