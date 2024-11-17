export const ratingOffers = (rating: number): string =>
  ((rating / 5) * 100).toFixed(1);

export function getRandomArrayElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
