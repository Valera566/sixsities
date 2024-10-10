import {Helmet} from 'react-helmet-async';
import PlaceCard from '../../components/place-card/place-card.tsx';
import { useAppSelector } from '../../hooks';

function FavoritesScreen(): JSX.Element {
  const { offers } = useAppSelector((state) => state);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const citiesFavoriteOffers = new Set(favoriteOffers.map((offer) => offer.city.name));

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {[...citiesFavoriteOffers].map((city) => (
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
                    city === offer.city.name ? <PlaceCard key={offer.id} offer={offer} setActiveCard={() => {}} /> : ''
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
