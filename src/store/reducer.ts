import { City, Offer } from '../types/offer.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action.ts';
import { mockOfferData } from '../mock/offers.ts';

type InitialState = {
  city: City;
  offers: Offer[];
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
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const { name, location } = action.payload.city;

    state.city = {name, location};
  });
});

export { reducer };
