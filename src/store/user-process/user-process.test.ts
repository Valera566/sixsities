import {State} from '../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {userProcess} from './user-process.ts';

describe('User Process Tests', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: State[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: {
        email: '',
        avatarUrl: '',
      },
      isLoadingStatus: false,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
