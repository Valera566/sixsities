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
  Offers = '/hotels',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export type ErrorResponse = {
  error?: string | undefined;
}
