import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IAdresser, ISsr } from './search-model';

export interface ISearch {
  ssr: ISsr;
  adresser: IAdresser;
}

const initialState: ISearch = {
  ssr: {},
  adresser: {},
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSsrResult: (state, action: PayloadAction<ISsr>) => {
      state.ssr = action.payload;
    },
    setAdresseResult: (state, action: PayloadAction<IAdresser>) => {
      state.adresser = action.payload;
    },
  },
});

export const { setSsrResult, setAdresseResult } = searchSlice.actions;

//selectors
export const selectSearch = (state: RootState) => {
  return state.search;
};
