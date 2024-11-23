import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {getAuthorizationStatus, getIsLoginLoadingStatus, getUserData} from './selectors.ts';
import {makeFakeUser} from '../../mocks/mocks.ts';

describe('ApplicationProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData:  makeFakeUser(),
      isLoadingStatus: false,
    }
  };

  it('should return user from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });


  it('should return authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('it should return the download status', () => {
    const { isLoadingStatus } = state[NameSpace.User];
    const result = getIsLoginLoadingStatus(state);
    expect(result).toBe(isLoadingStatus);
  });

});
