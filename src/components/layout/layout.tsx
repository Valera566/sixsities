import {AppRoute, AuthorizationStatus} from '../../const';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {getAuthorizationStatus, getIsLoginLoadingStatus} from '../../store/user-process/selectors.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoritesOffersAction, logoutAction} from '../../store/api-actions.ts';
import { getUserData } from '../../store/user-process/selectors.ts';
import { getFavorites } from '../../store/app-data/selectors.ts';
import {useEffect} from 'react';
import Spinner from '../spinner/spinner.tsx';

const getLayoutState = (pathname: AppRoute) => {
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;


  if (pathname === AppRoute.Root) {
    rootClassName = ' page--gray page--main';
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter};
};


export default function Layout() {
  const {pathname} = useLocation();
  const {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter} = getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const { email , avatarUrl } = useAppSelector(getUserData);
  const favoriteOffersCount = useAppSelector(getFavorites);
  const loadingStatus = useAppSelector(getIsLoginLoadingStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoritesOffersAction());
    }
  }, [ authorizationStatus ]);

  if (loadingStatus) {
    return (
      <div className={'page page--gray page--main'}>
        <Spinner/>
      </div>
    );
  }

  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className={`header__logo-link${linkClassName}`} href="/" >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{ backgroundImage: `url("${avatarUrl}")`, borderRadius: '50%' }}
                        />
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">{email}</span>

                            <span className="header__favorite-count">{favoriteOffersCount.length}</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>

                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Root}
                          onClick={() => {
                            dispatch(logoutAction());
                          }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet/>
      {shouldRenderFooter ? (
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </a>
        </footer>
      ) : null}
    </div>
  );
}
