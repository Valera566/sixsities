import { NameSpace } from '../../const.ts';
import { NewReview, Offer, Review } from '../../types/offer.ts';
import { State } from '../../types/state.ts';

export const getOffers = (state: Pick<State, NameSpace.Data>): Offer[] => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: Pick<State, NameSpace.Data>): Offer | null => state[NameSpace.Data].offerById;
export const getOffersNearby = (state: Pick<State, NameSpace.Data>): Offer[] => state[NameSpace.Data].offersNearby;
export const getReviews = (state: Pick<State, NameSpace.Data>): Review[] => state[NameSpace.Data].reviews;
export const getLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isLoading;
export const getIsFavoritesLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isLoading;
export const getFavorites = (state: Pick<State, NameSpace.Data>): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getFormActiveState = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].formActiveState;
export const getFormData = (state: Pick<State, NameSpace.Data>): NewReview => state[NameSpace.Data].formData;
