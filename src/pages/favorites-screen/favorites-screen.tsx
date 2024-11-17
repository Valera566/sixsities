import {Helmet} from 'react-helmet-async';
import PlaceCard from '../../components/place-card/place-card.tsx';
import { useAppSelector } from '../../hooks';
import { getFavorites, getIsFavoritesLoading } from '../../store/app-data/selectors.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';

function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);
  const citiesFavoriteOffers: string[] = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
  const isLoading = useAppSelector(getIsFavoritesLoading);


  if (isLoading) {
    return <Spinner />;
  }

  return favoriteOffers.length === 0 ? (
    <FavoritesEmpty />
  ) : (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {citiesFavoriteOffers.map((city) => (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteOffers.map((offer) =>
                    city === offer.city.name ? <PlaceCard key={offer.id} offer={offer} /> : ''
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
