import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const.ts';
import {Link, useNavigate} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { FormEvent, useEffect, useRef } from 'react';
import { AuthData } from '../../types/auth-data.ts';
import { loginAction } from '../../store/api-actions.ts';
import { toast } from 'react-toastify';
import {getRandomArrayElement} from '../../utils/utils.ts';
import {changeCity} from '../../store/app-process/app-process.ts';

function LoginScreen() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const randomCity = getRandomArrayElement(CITIES);

  function onRandomCityClickHandler (evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Root);
  }

  const handleRedirectToMainPage = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  };

  useEffect(() => {
    handleRedirectToMainPage();
  }, [authorizationStatus]);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const hasEnglishCharacters = (password: string) => /[a-zA-Z]/.test(password);
    const isAnySpaces = (password: string) => /\s/.test(password);
    const hasNumber = (password: string) => /\d/.test(password);

    if (
      passwordRef.current !== null &&
      isAnySpaces(passwordRef.current.value)
    ) {
      toast.warn('Password should not contain spaces.');
    } else if (
      passwordRef.current !== null &&
      loginRef.current !== null &&
      !hasEnglishCharacters(passwordRef.current.value)
    ) {
      toast.warn('Password should contain English characters.');
    } else if (
      passwordRef.current !== null &&
      loginRef.current !== null &&
      !hasNumber(passwordRef.current.value)
    ) {
      toast.warn('Password should contain at least one number.');
    } else if (loginRef.current !== null && passwordRef.current !== null) {
      toast.success('You are logged in!');
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>6 cities - Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={loginRef}
                data-testid="email"
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                ref={passwordRef}
                data-testid="password"
              />
            </div>
            <button className="login__submit form__submit button" type="submit" data-testid='sign-in-button'>
                Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to="/"
              onClick={onRandomCityClickHandler}
            >
              <span>{randomCity.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
