import {AppRoute, AuthorizationStatus} from '../../const';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/selectors.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';

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

  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className={`header__logo-link${linkClassName}`} >
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
                        to={AppRoute.Login}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                            <span className="header__favorite-count">3</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Root}
                          onClick={(evt) => {
                            evt.preventDefault();
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
