export const ratingOffers = (rating: number): string =>
  ((rating / 5) * 100).toFixed(1);
