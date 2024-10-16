import { createAction } from '@reduxjs/toolkit';
import {City, Offer} from '../types/offer.ts';
import {AuthorizationStatus} from '../const.ts';

export const changeCity = createAction<{ city:City }>('location/changeCity');
export const setSortType = createAction<{ sortType: string }>(
  'place-card-list/setSortType'
);
export const getOffers = createAction<{ offers: Offer[] }>('data/getOffers');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const setDataLoadingStatus = createAction<{ isDataloaded: boolean }>(
  'data/setDataLoadingStatus'
);
