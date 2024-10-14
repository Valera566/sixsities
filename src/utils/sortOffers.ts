import { SortOption } from '../const.ts';
import { Offer } from '../types/offer.ts';

export const sortOffers = (offers: Offer[], sortType: SortOption) => {
  let sortedOffers = [...offers];

  switch (sortType) {
    case SortOption.priceLowToHigh:
      return (sortedOffers = sortedOffers.sort((a, b) => a.price - b.price));

    case SortOption.priceHighToLow:
      return (sortedOffers = sortedOffers.sort((a, b) => b.price - a.price));

    case SortOption.topRatedFirst:
      return (sortedOffers = sortedOffers.sort((a, b) => b.rating - a.rating));

    default:
      return sortedOffers;
  }
};
