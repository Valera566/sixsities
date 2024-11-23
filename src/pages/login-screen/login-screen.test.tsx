import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {render, screen} from '@testing-library/react';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import {makeFakeStore} from '../../mocks/mocks.ts';
import {APIRoute, AuthorizationStatus, NameSpace} from '../../const.ts';
import userEvent from '@testing-library/user-event';
import {loginAction} from '../../store/api-actions.ts';

describe('Review Form Component', () => {
  it('should render ReviewForm correctly', () => {
    const { withStoreComponent } = withStore(<LoginScreen />, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {
          email: '',
          avatarUrl: '',
        },
        isLoadingStatus: false,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const { withStoreComponent } = withStore(<LoginScreen />, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {
          email: '',
          avatarUrl: '',
        },
        isLoadingStatus: false,
      }
    }));
    const emailElementTestId = 'email';
    const passwordElementTestId = 'password';
    const expectedLoginValue = 'petr';
    const expectedPasswordValue = '123456';
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should dispatch login event', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<LoginScreen />, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {
          email: '',
          avatarUrl: '',
        },
        isLoadingStatus: false,
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    render(withHistoryComponent);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const signInButton = screen.getByTestId('sign-in-button');

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(signInButton);

    const actions = mockStore.getActions();
    const loginActionDispatched = actions.find(
      (action): action is ReturnType<typeof loginAction.pending> => action.type === loginAction.pending.type
    );

    expect(loginActionDispatched).toBeTruthy();
    if (loginActionDispatched) {
      expect(loginActionDispatched.meta.arg).toEqual({
        login: 'test@test.com',
        password: 'password123',
      });
    }
  });
});
