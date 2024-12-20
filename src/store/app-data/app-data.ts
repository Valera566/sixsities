import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '../../types/state.ts';
import {DEFAULT_FORM_STATE, NameSpace} from '../../const.ts';
import {
  getOffersActions,
  getOffersNearbyAction,
  getOfferByIdAction,
  getReviewsByIdAction,
  postReviewAction,
  getFavoritesOffersAction,
  postFavoriteAction
} from '../api-actions.ts';
import { NewReview } from '../../types/offer.ts';

const initialState: AppData = {
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

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeFormData: (state, action: PayloadAction<NewReview>) => {
      state.formData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersActions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffersActions.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfferByIdAction.fulfilled, (state, action) => {
        state.offerById = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferByIdAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.formActiveState = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.formActiveState = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        const newReviews = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.reviews = [...state.reviews, ...newReviews];
        state.formActiveState = false;
        state.formData = DEFAULT_FORM_STATE;
      })
      .addCase(getReviewsByIdAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(getFavoritesOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(postFavoriteAction.pending, (state) => {
        state.isPostFavoriteStateStatus = true;
      })
      .addCase(postFavoriteAction.rejected, (state) => {
        state.isPostFavoriteStateStatus = true;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const toBeRemoved = action.meta.arg.status === 0;
        const {id, isFavorite} = action.payload;

        state.favoriteOffers.forEach((item) => {
          if (item.id === id) {
            item.isFavorite = isFavorite;
          }
        });

        if (toBeRemoved) {
          state.favoriteOffers = state.favoriteOffers.filter(
            (item) => item.id !== action.payload.id);
        } else {
          state.favoriteOffers = [...state.favoriteOffers, action.payload];
        }
      });
  }
});

export const { changeFormData } = appData.actions;
