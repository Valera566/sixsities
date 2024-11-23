import { DEFAULT_FORM_STATE } from '../../const.ts';
import {appData, changeFormData} from './app-data.ts';
import {
  getFavoritesOffersAction,
  getOfferByIdAction,
  getOffersActions,
  getOffersNearbyAction,
  getReviewsByIdAction, postFavoriteAction,
  postReviewAction
} from '../api-actions.ts';
import {makeFakeOffer, makeFakeReview} from '../../mocks/mocks.ts';


describe('appData slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: [],
      reviews: [],
      offerById: null,
      offersNearby: [],
      isLoading: false,
      favoriteOffers: [],
      isPostFavoriteStateStatus: false,
      formData: DEFAULT_FORM_STATE,
      formActiveState: false,
    };

    const result = appData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const emptyInitialState = {
      offers: [],
      reviews: [],
      offerById: null,
      offersNearby: [],
      isLoading: false,
      favoriteOffers: [],
      isPostFavoriteStateStatus: false,
      formData: DEFAULT_FORM_STATE,
      formActiveState: false,
    };

    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(emptyInitialState);
  });

  it('should change formData with "changeFormData" action', () => {
    const testPayload = {
      rating: 5,
      comment: 'Great experience!'
    };
    const result = appData.reducer(undefined, changeFormData(testPayload));
    expect(result.formData).toEqual(testPayload);
  });

  it('should return default state if no state provided', () => {
    const emptyAction = {type: ''};
    const result = appData.reducer(undefined, emptyAction);

    expect(result.formData).toEqual(DEFAULT_FORM_STATE);
  });

  it('should set isLoading as true with "getOffersActions.pending" action', () => {
    const { isLoading } = appData.reducer(undefined, getOffersActions.pending);

    expect(isLoading).toEqual(true);
  });

  it('should set isLoading as false and offers with "get Offers Actions.fulfilled" action', () => {
    const expectedOffers = [makeFakeOffer()];
    const { offers, isLoading } = appData.reducer(undefined, getOffersActions.fulfilled(expectedOffers, '', undefined));

    expect(offers).toEqual(expectedOffers);
    expect(isLoading).toEqual(false);
  });

  it('should set isLoading as true with "getOfferByIdAction.pending" action', () => {
    const { isLoading } = appData.reducer(undefined, getOfferByIdAction.pending);

    expect(isLoading).toEqual(true);
  });

  it('should set isLoading as false and offers with "get Offers Actions.fulfilled" action', () => {
    const expectedOffers = makeFakeOffer();
    const { offerById, isLoading } = appData.reducer(undefined, getOfferByIdAction.fulfilled(expectedOffers, '', ''));

    expect(offerById).toEqual(expectedOffers);
    expect(isLoading).toEqual(false);
  });

  it('should set isLoading as false with "getOfferByIdAction.rejected" action', () => {
    const { isLoading } = appData.reducer(undefined, getOfferByIdAction.rejected);

    expect(isLoading).toEqual(false);
  });

  it('should set near offers with "getOffersNearbyAction.fulfilled" action', () => {
    const expectedOffers = [makeFakeOffer()];
    const { offersNearby } = appData.reducer(undefined, getOffersNearbyAction.fulfilled(expectedOffers, '' ,''));
    expect(offersNearby).toEqual(expectedOffers);
  });

  it('should set formActiveState as false with "postReviewAction.rejected" action', () => {
    const { formActiveState } = appData.reducer(undefined, postReviewAction.rejected);

    expect(formActiveState).toEqual(false);
  });

  it('should set formActiveState as true with "postReviewAction.rejected" action', () => {
    const { formActiveState } = appData.reducer(undefined, postReviewAction.pending);

    expect(formActiveState).toEqual(true);
  });

  it('should add new reviews, reset formActiveState, and reset formData with "postReviewAction.fulfilled" action', () => {
    const initialState = {
      offers: [],
      reviews: [makeFakeReview()],
      offerById: null,
      offersNearby: [],
      isLoading: false,
      favoriteOffers: [],
      isPostFavoriteStateStatus: false,
      formData: { rating: 3, comment: 'Initial Comment' },
      formActiveState: true,
    };

    const newReview = makeFakeReview();
    const newReviews = [newReview];

    const result = appData.reducer(
      initialState,
      postReviewAction.fulfilled(newReviews, '', { comment: 'test', rating: 5, hotelId: '1' })
    );

    expect(result.reviews).toEqual([...initialState.reviews, ...newReviews]);
    expect(result.formActiveState).toBe(false);
    expect(result.formData).toEqual(DEFAULT_FORM_STATE);
  });

  it('should set offer reviews with "getReviewsByIdAction.fulfilled" action', () => {
    const expectedOffers = [makeFakeReview()];
    const { reviews } = appData.reducer(undefined, getReviewsByIdAction.fulfilled(expectedOffers, '' ,''));
    expect(reviews).toEqual(expectedOffers);
  });

  it('should set favorites with "getFavoritesOffersAction" action', () => {
    const expectedOffers = [makeFakeOffer()];

    const { favoriteOffers } = appData.reducer(undefined, getFavoritesOffersAction.fulfilled(expectedOffers, '' , undefined));
    expect(favoriteOffers).toEqual(expectedOffers);
  });

  it('should add a new favorite offer if it does not exist in favoriteOffers', () => {
    const newFavorite = makeFakeOffer();

    const { favoriteOffers } = appData.reducer(
      undefined,
      postFavoriteAction.fulfilled(newFavorite, '', { id: newFavorite.id, status: 1 })
    );

    expect(favoriteOffers).toEqual([newFavorite]);
  });

  it('should remove a favorite offer if status is 0', () => {
    const existingFavorite = makeFakeOffer();

    const { favoriteOffers } = appData.reducer(
      undefined,
      postFavoriteAction.fulfilled(existingFavorite, '', { id: existingFavorite.id, status: 0 })
    );

    expect(favoriteOffers).toEqual([]);
  });

  it('should leave favoriteOffers unchanged if action does not match any existing offer', () => {
    const existingFavorite = makeFakeOffer();
    const unrelatedFavorite = makeFakeOffer();

    const initialState = {
      offers: [],
      reviews: [],
      offerById: null,
      offersNearby: [],
      isLoading: false,
      favoriteOffers: [existingFavorite],
      isPostFavoriteStateStatus: false,
      formData: { rating: 3, comment: 'Initial Comment' },
      formActiveState: true,
    };

    const result = appData.reducer(
      initialState,
      postFavoriteAction.fulfilled(unrelatedFavorite, '', { id: unrelatedFavorite.id, status: 1 })
    );

    expect(result.favoriteOffers).toEqual([existingFavorite, unrelatedFavorite]);
  });
});
