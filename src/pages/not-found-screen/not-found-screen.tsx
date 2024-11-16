import { Link } from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Helmet} from 'react-helmet-async';

function NotFoundScreen() :JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities - 404 Not Found</title>
      </Helmet>
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <h1>Страница не найдена</h1>
                <Link to={AppRoute.Root}>Вернуться на главную страницу</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
