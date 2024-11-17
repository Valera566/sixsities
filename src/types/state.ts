import { store } from '../store';
import {City, NewReview, Offer, Review} from './offer.ts';
import {AuthorizationStatus, SortOption} from '../const.ts';
import {UserDataProfile} from './user-data.ts';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  offers: Offer[];
  offerById: Offer | null;
  offersNearby: Offer[];
  reviews: Review[];
  isLoading: boolean;
  favoriteOffers:Offer[];
  isPostFavoriteStateStatus: boolean;
  formData: NewReview;
  formActiveState: boolean;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserDataProfile;
  isLoadingStatus: boolean;
}

export type AppProcess = {
  city: City;
  sortType: SortOption;
  selectState: boolean;
}
