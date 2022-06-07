import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IGeoNorge } from './search-model';

export interface ISearch {
  geoNorge: IGeoNorge
}

const initialState: ISearch = {
  geoNorge: {}
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<IGeoNorge>) => {
      state.geoNorge = action.payload;
    }
  }
});

export const { setResult } = searchSlice.actions;

//selectors
export const selectSearch = (state: RootState) => {
  return state.search;
};