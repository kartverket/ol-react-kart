import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from '../Events/Event/eventStore';
import { IMapLayer, ITileLayer, IVector } from '../Models/config-model';

export interface ILayers {
  wmtsLayers: ITileLayer[],
  wmsLayers: ITileLayer[],
  vectorLayers: IVector[],
  groups: IMapLayer[],
  filterBaseLayers?: ITileLayer[],
  toggleVectorLayer?: IVector,
  toggleWmsLayer? : ITileLayer;
}

const initialState: ILayers = {
  wmtsLayers: [],
  wmsLayers: [],
  vectorLayers: [],
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
    addVectorLayer: (state, action: PayloadAction<IVector>) => {
      state.vectorLayers.push(action.payload);
    },
    addVectorLayers: (state, action: PayloadAction<IVector[]>) => {
      state.vectorLayers = action.payload;
    },
    addGroups: (state, action: PayloadAction<IMapLayer[]>) => {
      action.payload.forEach(g => g.isOpen = false);
      state.groups = action.payload;
    },
    setVisibleBaseLayer: (state, action: PayloadAction<string>) => {
      state.wmsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
      state.wmtsLayers.map(w => w.options.visibility = ((w.options.isbaselayer && w.name === action.payload) ? 'true' : 'false'));
    },
    toggleVectorLayer: (state, action: PayloadAction<IVector | undefined>) => {
      state.toggleVectorLayer = action && action.payload ? action.payload : undefined;
      if (action && action.payload) {
        const vector = state.vectorLayers.find(v => v.guid === action.payload?.guid && v.name === action.payload?.name);
        if (vector) {
          vector.options.visibility = vector.options.visibility === 'true' ? 'false' : 'true';
        }
      }
    },
    toggleWmsLayer: (state, action: PayloadAction<ITileLayer | undefined>) => {
      state.toggleWmsLayer = action && action.payload ? action.payload : undefined;
      if (action && action.payload) {
        const wms = state.wmsLayers.find(w => w.guid === action.payload?.guid && w.name === action.payload?.name);
        if (wms) {
          wms.options.visibility = wms.options.visibility === 'true' ? 'false' : 'true';
        }
      }
    },
    toggleGroup: (state, action: PayloadAction<IMapLayer>) => {
      const group = state.groups.find(g => g.groupid === action.payload.groupid);
      if (group) {
        group.isOpen = !group?.isOpen;
      }
    }
  }
});

export const { addWmtsLayer, addWmsLayer, addGroups, setVisibleBaseLayer, addWmtsLayers, addWmsLayers, addVectorLayer, addVectorLayers, toggleVectorLayer, toggleWmsLayer, toggleGroup } = layersSlice.actions;

//selectors
export const selectVisibleBaseLayer = (state: EventStoreState) => {
  return state.layers.wmtsLayers.concat(state.layers.wmsLayers).find(l => l.options.isbaselayer === 'true' && l.options.visibility === 'true');
};

export const selectBaseLayers = (state: EventStoreState) => {
  return state.layers.filterBaseLayers;
}

export const selectLayersGroups = (state: EventStoreState) => {
  return state.layers.groups;
}

export const selectWmtsLayers = (state: EventStoreState) => {
  return state.layers.wmtsLayers;
}

export const selectWmsLayers = (state: EventStoreState) => {
  return state.layers.wmsLayers;
}

export const selectVectorLayers = (state: EventStoreState) => {
  return state.layers.vectorLayers;
}

export const selectToggleVectorLayer = (state: EventStoreState) => {
  return state.layers.toggleVectorLayer;
}

export const selectToggleWmsLayer = (state: EventStoreState) => {
  return state.layers.toggleWmsLayer;
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
