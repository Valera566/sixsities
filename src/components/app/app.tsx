import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const.ts';
import MainScreen from '../../pages/main-screen/main-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import Layout from '../layout/layout.tsx';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { useAppSelector } from '../../hooks';
import HistoryRoute from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRoute history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={<MainScreen />}
            />
            <Route
              path={AppRoute.Login}
              element={(
                <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                  <LoginScreen />
                </PrivateRoute>
              )}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferScreen />}
            />
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
          </Route>
        </Routes>
      </HistoryRoute>
    </HelmetProvider>
  );
}

export default App;

