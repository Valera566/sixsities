import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserData = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].userData;
export const getIsLoginLoadingStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isLoadingStatus;
