import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getIsUserAuthenticated = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getUserData = (state: State) => state[NameSpace.User].userData;
