import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {
  getOfferById,
  getOffers,
  getOffersNearby, getReviewsById, loadUserData,
  redirectToRoute,
  requireAuthorization,
  setIsLoadingStatus
} from './action.ts';
import {Offer, Review} from '../types/offer.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {ReviewData} from '../types/review-data.ts';

export const getOffersActions = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/getOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setIsLoadingStatus({ isLoading: true }));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(getOffers({ offers: data }));
  dispatch(setIsLoadingStatus({ isLoading: false }));
});

export const getOfferByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('data/getOfferById', async (hotelId, { dispatch, extra: api }) => {
    dispatch(setIsLoadingStatus({ isLoading: true }));
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    dispatch(getOfferById({ offer: data }));
    dispatch(setIsLoadingStatus({ isLoading: false }));
  });

export const getOffersNearbyAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/getOfferById', async (hotelId, { dispatch, extra: api }) => {
  dispatch(setIsLoadingStatus({ isLoading: true }));
  const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`);
  dispatch(getOffersNearby({ offersNearby: data }));
  dispatch(setIsLoadingStatus({ isLoading: false }));
});

export const getReviewsByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/getReviewsById', async (hotelId, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${hotelId}`);
  dispatch(getReviewsById({ reviews: data }));
});

export const postReviewAction = createAsyncThunk<
  void,
  [ReviewData, string],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('data/postReview', async ([{ comment, rating }, hotelId], { dispatch, extra: api }) => {
    const { data } = await api.post<Review[]>(`${APIRoute.Reviews}/${hotelId}`, { comment, rating });
    dispatch(getReviewsById({ reviews: data }));
  });

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >(
    'user/login',
    async ({ login: email, password }, { dispatch, extra: api }) => {
      const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, { email, password });
      dispatch(loadUserData(data));
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    }
  );

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});


