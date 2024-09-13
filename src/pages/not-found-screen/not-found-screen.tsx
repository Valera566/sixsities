import { Link } from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Helmet} from 'react-helmet-async';

function NotFoundScreen() :JSX.Element {
  return (
    <div>
      <Helmet>
        <title>6 cities - 404 Not Found</title>
      </Helmet>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную страницу</Link>
    </div>
  );
}

export default NotFoundScreen;
