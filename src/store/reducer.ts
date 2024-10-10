import { City, Offer } from '../types/offer.ts';
import { createReducer } from '@reduxjs/toolkit';
import {changeCity, setSortType} from './action.ts';
import { mockOfferData } from '../mock/offers.ts';
import { SortOption } from '../const.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sortType: SortOption;
}

const initialState: InitialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: mockOfferData,
  sortType: SortOption.popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { name, location } = action.payload.city;

      state.city = {name, location};
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload.sortType as SortOption;
    });
});

export { reducer };
