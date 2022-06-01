import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from '../Events/Event/eventStore';
import { IMapLayer, ITileLayer } from '../Models/config-model';

export interface ILayers {
  wmtsLayers: ITileLayer[],
  wmsLayers: ITileLayer[],
  groups: IMapLayer[],
  filterBaseLayers?: ITileLayer[]  
}

const initialState: ILayers = {
  wmtsLayers: [],
  wmsLayers: [],
  groups: []
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addWmtsLayer: (state, action: PayloadAction<ITileLayer>) => {
      state.wmtsLayers.push(action.payload);
      state.filterBaseLayers = state.wmtsLayers.concat(state.wmsLayers).filter(l => l.options.isbaselayer === 'true');      
    },
    addWmtsLayers: (state, action: PayloadAction<ITileLayer[]>) => {
      action.payload.forEach(l => l.source = 'WMTS');
      state.wmtsLayers = action.payload;
      state.filterBaseLayers = state.wmtsLayers.concat(state.wmsLayers).filter(l => l.options.isbaselayer === 'true');
    },
    addWmsLayer: (state, action: PayloadAction<ITileLayer>) => {
      state.wmsLayers.push(action.payload);
      state.filterBaseLayers = state.wmtsLayers.concat(state.wmsLayers).filter(l => l.options.isbaselayer === 'true');
    },
    addWmsLayers: (state, action: PayloadAction<ITileLayer[]>) => {
      action.payload.forEach(l => l.source = 'WMS');
      state.wmsLayers = action.payload;
      state.filterBaseLayers = state.wmtsLayers.concat(state.wmsLayers).filter(l => l.options.isbaselayer === 'true');
    },
    addGroups: (state, action: PayloadAction<IMapLayer[]>) => {
      state.groups = action.payload;
    },
    setVisibleBaseLayer: (state, action: PayloadAction<string>) => {
      state.wmsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
      state.wmtsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
    }
  }
});

export const { addWmtsLayer, addWmsLayer, addGroups, setVisibleBaseLayer, addWmtsLayers, addWmsLayers } = layersSlice.actions;

//selectors
export const selectVisibleBaseLayer = (state: EventStoreState) => {
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).find(l => l.options.isbaselayer === 'true' && l.options.visibility === 'true');
};

export const selectBaseLayers = (state: EventStoreState) => {
  return state.layers.filterBaseLayers;
}

// export const getAllLayers = (state: EventStoreState) => {
//   return state.layers;
// }

// export const selectLayerByName = (state: EventStoreState) => {
  // const a = layersSlice.actions.filterBaseLayers();
  // return state.layers.visibleBaseLayers;
  
  // const wmtsLayers = JSON.parse(JSON.stringify(state.layers.wmtsLayers)) as ITileLayer[];
  // const wmsLayers = JSON.parse(JSON.stringify(state.layers.wmsLayers)) as ITileLayer[];
  // return wmtsLayers.concat(wmsLayers).filter(l => l.name === 'landkart');
  // const test: ITileLayer[] = [];
  // state.layers.wmtsLayers.forEach(w => test.push(w));
  // return state.layers.wmtsLayers.concat(state.layers.wmsLayers);
  // return getVisibleBaseLayers(state.layers.wmtsLayers);
// }
