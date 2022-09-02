import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EventStoreState } from '../Events/Event/eventStore';
import { IMapLayer, ITileLayer, IVector } from '../Models/config-model';

export interface ILayers {
  tileLayers: ITileLayer[];
  vectorLayers: IVector[];
  groups: IMapLayer[];
  filterBaseLayers?: ITileLayer[];
  toggleVectorLayer?: IVector;
  toggleTileLayer?: ITileLayer;
}

const initialState: ILayers = {
  tileLayers: [],
  vectorLayers: [],
  groups: [],
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addTileLayer: (state, action: PayloadAction<ITileLayer>) => {
      state.tileLayers.push(action.payload);
      state.filterBaseLayers = state.tileLayers.filter(l => l.options.isbaselayer === 'true');
    },
    addTileLayers: (state, action: PayloadAction<ITileLayer[]>) => {
      const tileLayers = JSON.parse(JSON.stringify(action.payload));
      state.tileLayers = tileLayers;
      state.filterBaseLayers = state.tileLayers.filter(l => l.options.isbaselayer === 'true');
    },
    addVectorLayer: (state, action: PayloadAction<IVector>) => {
      state.vectorLayers.push(action.payload);
    },
    addVectorLayers: (state, action: PayloadAction<IVector[]>) => {
      state.vectorLayers = action.payload;
    },
    addGroups: (state, action: PayloadAction<IMapLayer[]>) => {
      const groups = JSON.parse(JSON.stringify(action.payload));
      groups.forEach((g: IMapLayer) => (g.isOpen = false));
      state.groups = groups;
    },
    removeAll: state => {
      state.tileLayers = [];
      state.vectorLayers = [];
      state.groups = [];
      state.filterBaseLayers = [];
      state.toggleVectorLayer = undefined;
      state.toggleTileLayer = undefined;
    },
    setVisibleBaseLayer: (state, action: PayloadAction<string>) => {
      state.tileLayers.map(w => {
        if (w.options.isbaselayer === 'true') {
          w.options.visibility = w.name === action.payload ? 'true' : 'false';
        }
      });
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
    toggleTileLayer: (state, action: PayloadAction<ITileLayer | undefined>) => {
      state.toggleTileLayer = action && action.payload ? action.payload : undefined;
      if (action && action.payload) {
        const layer = state.tileLayers.find(w => w.guid === action.payload?.guid && w.name === action.payload?.name);
        if (layer) {
          layer.options.visibility = layer.options.visibility === 'true' ? 'false' : 'true';
        }
      }
    },
    toggleGroup: (state, action: PayloadAction<IMapLayer>) => {
      const group = state.groups.find(g => g.groupid === action.payload.groupid);
      if (group) {
        group.isOpen = !group?.isOpen;
      }
    },
  },
});

export const {
  addGroups,
  setVisibleBaseLayer,
  addTileLayer,
  addTileLayers,
  addVectorLayer,
  addVectorLayers,
  toggleVectorLayer,
  toggleTileLayer,
  toggleGroup,
  removeAll,
} = layersSlice.actions;

//selectors
export const selectVisibleBaseLayer = (state: EventStoreState) => {
  return state.layers.tileLayers.find(l => l.options.isbaselayer === 'true' && l.options.visibility === 'true');
};

export const selectBaseLayers = (state: EventStoreState) => {
  return state.layers.filterBaseLayers;
};

export const selectLayersGroups = (state: EventStoreState) => {
  return state.layers.groups;
};
export const selectTileLayers = (state: EventStoreState) => {
  return state.layers.tileLayers;
};

export const selectVectorLayers = (state: EventStoreState) => {
  return state.layers.vectorLayers;
};

export const selectToggleVectorLayer = (state: EventStoreState) => {
  return state.layers.toggleVectorLayer;
};

export const selectToggleTileLayer = (state: EventStoreState) => {
  return state.layers.toggleTileLayer;
};

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
