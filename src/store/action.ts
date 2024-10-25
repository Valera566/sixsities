import { createAction } from '@reduxjs/toolkit';
import { City, Offer, Review } from '../types/offer.ts';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import { UserData } from '../types/user-data.ts';

export const changeCity = createAction<{ city:City }>('location/changeCity');
export const setSortType = createAction<{ sortType: string }>(
  'place-card-list/setSortType'
);
export const getOffers = createAction<{ offers: Offer[] }>('data/getOffers');
export const getOfferById = createAction<{ offer: Offer }>('data/getOfferById');
export const getOffersNearby = createAction<{ offersNearby: Offer[] }>('data/getOffersNearby');
export const getReviewsById = createAction<{ reviews: Review[] }>('data/getReviewsById');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const setIsLoadingStatus = createAction<{ isLoading: boolean }>(
  'data/setIsLoadingStatus'
);
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const loadUserData = createAction<UserData>('user/loadUserData');
