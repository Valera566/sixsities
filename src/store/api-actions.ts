import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { APIRoute } from '../const.ts';
import { getOffers, setDataLoadingStatus } from './action.ts';
import {Offer} from '../types/offer.ts';

export const getOffersActions = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/getOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setDataLoadingStatus({ isDataloaded: true }));
  dispatch(getOffers({ offers: data }));
  dispatch(setDataLoadingStatus({ isDataloaded: false }));
});
