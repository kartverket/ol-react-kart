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
    },
    setVisibleBaseLayer: (state, action: PayloadAction<string>) => {
      state.wmsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
      state.wmtsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
    }
  }
});

export const { addWmtsLayer, addWmsLayer, setVisibleBaseLayer } = layersSlice.actions;

//selectors
export const selectVisibleBaseLayer = (state: EventStoreState) => {
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).find(l => l.options.isbaselayer === 'true' && l.options.visibility === 'true');
};

export const selectBaseLayers = (state: EventStoreState) => {
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).filter(l => l.options.isbaselayer === 'true');
}

export const getAllLayers = (state: EventStoreState) => {
  return state.layers;
}

export const selectLayerByName = (state: EventStoreState) => {
  const wmtsLayers = JSON.parse(JSON.stringify(state.layers.wmtsLayers)) as ITileLayer[];
  const wmsLayers = JSON.parse(JSON.stringify(state.layers.wmsLayers)) as ITileLayer[];
  return wmtsLayers.concat(wmsLayers).filter(l => l.name === 'landkart');
  // const test: ITileLayer[] = [];
  // state.layers.wmtsLayers.forEach(w => test.push(w));
  // return state.layers.wmtsLayers.concat(state.layers.wmsLayers);
  // return getVisibleBaseLayers(state.layers.wmtsLayers);
}
