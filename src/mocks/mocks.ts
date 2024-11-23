import {UserDataProfile} from '../types/user-data.ts';
import {City, Offer, Review} from '../types/offer.ts';
import * as faker from 'faker';
import {internet, name, random} from 'faker';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {State} from '../types/state.ts';
import {createApi} from '@reduxjs/toolkit/query';
import {AuthorizationStatus, DEFAULT_FORM_STATE, NameSpace, SortOption} from '../const.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeUser = (): UserDataProfile => ({
  email: internet.email(),
  avatarUrl: internet.avatar(),
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: faker.datatype.number(),
    longitude: faker.datatype.number(),
    zoom: faker.datatype.number(),
  },
  name: name.title(),
} as City);

export const makeFakeOffer = (): Offer => ({
  bedrooms: faker.datatype.number(),
  city: {
    location: {
      latitude: faker.datatype.number(),
      longitude: faker.datatype.number(),
      zoom: faker.datatype.number(),
    },
    name: name.title()
  },
  description: random.alpha(),
  goods: new Array(faker.datatype.number()).fill(null).map(() => random.alpha()),
  host: {
    avatarUrl: internet.avatar(),
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: name.title(),
  },
  id: faker.datatype.number(),
  images: new Array(faker.datatype.number()).fill(null).map(() => random.alpha()),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: {
    latitude: faker.datatype.number(),
    longitude: faker.datatype.number(),
    zoom: faker.datatype.number(),
  },
  maxAdults: faker.datatype.number(),
  previewImage: internet.url(),
  price: faker.datatype.number(),
  rating: faker.datatype.number(),
  title: name.title(),
  type: random.alpha(),
});

export const makeFakeReview = (): Review => ({
  comment: random.alpha(),
  date: new Date().toISOString(),
  id: faker.datatype.number(),
  rating: faker.datatype.number(),
  user: {
    avatarUrl: internet.avatar(),
    id: faker.datatype.number(),
    name: name.title(),
    isPro: faker.datatype.boolean()
  },
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.App]: {
    city: makeFakeCity(),
    sortType: SortOption.popular,
    selectState: false,
  },
  [NameSpace.Data]: {
    offers: [],
    reviews: [],
    offerById: null,
    offersNearby: [],
    isLoading: false,
    favoriteOffers: [],
    isPostFavoriteStateStatus: false,
    formData: DEFAULT_FORM_STATE,
    formActiveState: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: {
      email: '',
      avatarUrl: '',
    },
    isLoadingStatus: false,
  },
  ...initialState ?? {}
});
