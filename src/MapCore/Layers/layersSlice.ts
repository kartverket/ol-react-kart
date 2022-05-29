import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from '../Events/Event/eventStore';
import { ITileLayer } from '../Models/config-model';

export interface ILayers {
  wmtsLayers: ITileLayer[],
  wmsLayers: ITileLayer[],
}

const initialState: ILayers = {
  wmtsLayers: [],
  wmsLayers: []
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addWmtsLayer: (state, action: PayloadAction<ITileLayer>) => {
      state.wmtsLayers.push(action.payload);
    },
    addWmsLayer: (state, action: PayloadAction<ITileLayer>) => {
      state.wmsLayers.push(action.payload);
    }
  }
});

export const { addWmtsLayer, addWmsLayer } = layersSlice.actions;

//selectors
export const selectVisibleBaseLayer = (state: EventStoreState) => {
  // const visibleBaseLayer: IWms|IWmts = undefined;
  // const wmtsBaseLayer = state.layers.wmtsLayers.find(l => l.options.isbaselayer && l.options.visibility);
  // if (wmtsBaseLayer) {
  //   return wmtsBaseLayer;
  // }
  // const wmsBaseLayer = state.layers.wmsLayers.find(l => l.options.isbaselayer && l.options.visibility);
  // if (wmsBaseLayer) {
  //   return wmsBaseLayer;
  // }
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).find(l => l.options.isbaselayer && l.options.visibility);
};

// export const selectBaseLayers = (state: EventStoreState) => {
//   let baseLayers: IWms[] | IWmts[] = [];
//   state.layers.wmsLayers.forEach(l => {
//     if (l.options.isbaselayer) {
//       baseLayers.push(l);
//     }
//   })
// }
