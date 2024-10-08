import PlaceCardList from '../../components/place-card-list/place-card-list.tsx';
import { Offer } from '../../types/offer.ts';
import { useState } from 'react';
import Locations from '../../components/locations/locations.tsx';
import Map from '../../components/map/map.tsx';
import { CITY } from '../../mock/city.ts';

type MainProps = {
  offers: Offer[];
};

function MainScreen({ offers }: MainProps): JSX.Element {
  const [currentActiveCard, setActiveCard ] = useState<number | null>(null);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
              Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                    Popularl
                </li>
                <li className="places__option" tabIndex={0}>
                    Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                    Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                    Top rated first
                </li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <PlaceCardList offers={offers} setActiveCard={setActiveCard} />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              className={'cities__map'}
              city={CITY}
              placeLocationId={currentActiveCard}
              offers={offers}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
