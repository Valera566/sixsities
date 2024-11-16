import {Offer} from '../types/offer.ts';

export const ratingOffers = (rating: number): string =>
  ((rating / 5) * 100).toFixed(1);

export const updateOffers = (offers: Offer[], updatedOffer: Offer | null) =>
  offers.map((item) => {
    if (updatedOffer === null || item.id !== updatedOffer.id) {
      return item;
    }
    return {
      ...item,
      ...updatedOffer,
    };
  });
