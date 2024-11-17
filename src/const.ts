import {TSizeMap} from './types/size.ts';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortOption {
  popular = 'Popular',
  priceLowToHigh = 'Price: low to high',
  priceHighToLow = 'Price: high to low',
  topRatedFirst = 'Top rated first'
}

export enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export type ErrorResponse = {
  error?: string | undefined;
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export const REVIEW_RATING = [
  {
    title: 'perfect',
    value: 5,
  },
  {
    title: 'good',
    value: 4,
  },
  {
    title: 'not bad',
    value: 3,
  },
  {
    title: 'badly',
    value: 2,
  },
  {
    title: 'terribly',
    value: 1,
  },
];

export const DEFAULT_FORM_STATE = {
  comment: '',
  rating: 0,
};

export const BookmarkSizeMap: TSizeMap = {
  small: {width: '18', height: '19'},
  large: {width: '31', height: '33'}
} as const;


export const CITIES = [
  { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13} },
  { name: 'Cologne', location: { latitude: 50.935173, longitude: 6.953101, zoom: 13 } },
  { name: 'Brussels', location: { latitude: 50.8476, longitude: 4.3572, zoom: 13 } },
  { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041, zoom: 13 } },
  { name: 'Hamburg', location: { latitude: 53.5488, longitude: 9.9872, zoom: 13 } },
  { name: 'Dusseldorf', location: { latitude: 51.2277, longitude: 6.7735, zoom: 13 } },
];
