import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State) => state[NameSpace.User].userData;
export const getIsLoginLoadingStatus = (state: State): boolean => state[NameSpace.User].isLoadingStatus;
