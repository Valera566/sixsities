import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    email: '',
    avatarUrl: '',
  },
  isLoadingStatus: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = {...action.payload};
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoadingStatus = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = {...action.payload};
        state.isLoadingStatus = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoadingStatus = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoadingStatus = false;
        state.userData.email = '';
        state.userData.avatarUrl = '';
      });
  }
});
