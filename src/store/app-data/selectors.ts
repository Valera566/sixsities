import { NameSpace } from '../../const.ts';
import { NewReview, Offer, Review } from '../../types/offer.ts';
import { State } from '../../types/state.ts';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].offerById;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Data].isLoading;
export const getIsFavoritesLoading = (state: State): boolean => state[NameSpace.Data].isLoading;
export const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getFormActiveState = (state: State): boolean => state[NameSpace.Data].formActiveState;
export const getFormData = (state: State): NewReview => state[NameSpace.Data].formData;
