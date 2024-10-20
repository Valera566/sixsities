import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {getOffers, redirectToRoute, requireAuthorization, setIsLoadingStatus} from './action.ts';
import {Offer} from '../types/offer.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';

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

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('user/checkAuth', async (_arg, { dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
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
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
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


