import {DEFAULT_FORM_STATE, NameSpace} from '../../const.ts';
import {
  getCurrentOffer,
  getFavorites,
  getFormActiveState,
  getFormData,
  getIsFavoritesLoading,
  getLoadingStatus,
  getOffers, getOffersNearby,
  getReviews
} from './selectors.ts';
import {makeFakeOffer, makeFakeReview} from '../../mocks/mocks.ts';


describe('App Data Selectors', () => {
  const state = {
    [NameSpace.Data]: {
      offers: [makeFakeOffer()],
      reviews: [makeFakeReview()],
      offerById: null,
      offersNearby: [makeFakeOffer()],
      isLoading: false,
      favoriteOffers: [makeFakeOffer()],
      isPostFavoriteStateStatus: false,
      formActiveState: false,
      formData: DEFAULT_FORM_STATE,
    }
  };

  it('should return isLoading from state', () => {
    const { isLoading } = state[NameSpace.Data];
    const result = getLoadingStatus(state);
    expect(result).toEqual(isLoading);
  });

  it('should return isLoading from state', () => {
    const { isLoading } = state[NameSpace.Data];
    const result = getIsFavoritesLoading(state);
    expect(result).toEqual(isLoading);
  });

  it('should return formActiveState from state', () => {
    const { formActiveState } = state[NameSpace.Data];
    const result = getFormActiveState(state);
    expect(result).toEqual(formActiveState);
  });

  it('should return formActiveState from state', () => {
    const { formActiveState } = state[NameSpace.Data];
    const result = getFormActiveState(state);
    expect(result).toEqual(formActiveState);
  });

  it('should return formData from state', () => {
    const { formData } = state[NameSpace.Data];
    const result = getFormData(state);
    expect(result).toEqual(formData);
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Data];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return offersNearby from state', () => {
    const { offersNearby } = state[NameSpace.Data];
    const result = getOffersNearby(state);
    expect(result).toEqual(offersNearby);
  });

  it('should return favoriteOffers from state', () => {
    const { favoriteOffers } = state[NameSpace.Data];
    const result = getFavorites(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return offerById from state', () => {
    const { offerById } = state[NameSpace.Data];
    const result = getCurrentOffer(state);
    expect(result).toEqual(offerById);
  });
});

