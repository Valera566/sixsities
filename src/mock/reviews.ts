import { Review } from '../types/offer.ts';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 10,
      isPro: true,
      name: 'Max',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/1.jpg',
    },
    rating: 4,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2023-10-27T11:13:14.360Z',
  },
  {
    id: 1,
    user: {
      id: 16,
      isPro: true,
      name: 'Mollie',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/7.jpg',
    },
    rating: 3,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2023-10-09T11:13:14.360Z',
  },
  {
    id: 1,
    user: {
      id: 14,
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 3,
    comment:
      'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2023-10-17T11:13:14.360Z',
  },
  {
    id: 2,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 5,
    comment:
      'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-10-17T11:13:14.360Z',
  },
  {
    id: 3,
    user: {
      id: 15,
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 3,
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2023-10-17T11:13:14.360Z',
  },
];
