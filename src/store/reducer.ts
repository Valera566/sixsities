import { City, Offer, Review } from '../types/offer.ts';
import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setSortType,
  getOffers,
  requireAuthorization,
  setIsLoadingStatus,
  getOfferById,
  getOffersNearby,
  getReviewsById,
} from './action.ts';

import { SortOption, AuthorizationStatus } from '../const.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  offerById: Offer | null;
  offersNearby: Offer[];
  reviews: Review[];
  sortType: SortOption;
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
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
  offers: [],
  offerById: null,
  offersNearby: [],
  reviews: [],
  sortType: SortOption.popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { name, location } = action.payload.city;

      state.city = {name, location};
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload.sortType as SortOption;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(getOfferById, (state, action) => {
      state.offerById = action.payload.offer;
    })
    .addCase(getOffersNearby, (state, action) => {
      state.offersNearby = action.payload.offersNearby;
    })
    .addCase(getReviewsById, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(setIsLoadingStatus, (state, action) => {
      state.isLoading = action.payload.isLoading;
    });
});

export { reducer };
