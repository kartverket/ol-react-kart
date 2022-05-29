import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventStoreState } from '../Events/Event/eventStore';
import { IWms, IWmts } from '../Models/config-model';

export interface ILayers {
  wmtsLayers: IWmts[],
  wmsLayers: IWms[],
}

const initialState: ILayers = {
  wmtsLayers: [],
  wmsLayers: []
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addWmtsLayer: (state, action: PayloadAction<IWmts>) => {
      state.wmtsLayers.push(action.payload);
    },
    addWmsLayer: (state, action: PayloadAction<IWms>) => {
      state.wmsLayers.push(action.payload);
    }
  }
});

export const { addWmtsLayer, addWmsLayer } = layersSlice.actions;

//selectors
export const selectGetVisibleBaseLayer = (state: EventStoreState) => {
  const visibleBaseLayer = state.layers.wmtsLayers.find(l => l.options.isbaselayer && l.options.visibility);
  return visibleBaseLayer;
};
