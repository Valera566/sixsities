import {Offer} from '../types/offer.ts';

export const ratingOffers = (rating: number): string =>
  ((rating / 5) * 100).toFixed(1);

export const updateFavoriteStatus = (
  offers: Offer[],
  targetId: number,
  newIsFavorite: boolean
): Offer[] => offers.map((offer) =>
  offer.id === targetId ? { ...offer, isFavorite: newIsFavorite } : offer);
