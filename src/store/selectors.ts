import { AuthorizationStatus } from '../const.ts';
import { State } from '../types/state.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state.authorizationStatus;
