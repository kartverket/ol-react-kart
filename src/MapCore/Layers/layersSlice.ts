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

export const selectLayerByName = (state: EventStoreState, name: string) => {
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).filter(l => l.name === name);
}
