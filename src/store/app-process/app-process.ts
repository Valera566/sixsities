import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state.ts';
import { NameSpace, SortOption} from '../../const.ts';
import { City } from '../../types/offer.ts';

const initialState: AppProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  sortType: SortOption.popular
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortOption>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeCity, setSortType } = appProcess.actions;
