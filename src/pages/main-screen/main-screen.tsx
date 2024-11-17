import PlaceCardList from '../../components/place-card-list/place-card-list.tsx';
import { useState } from 'react';
import Locations from '../../components/locations/locations.tsx';
import Map from '../../components/map/map.tsx';
import { useAppSelector } from '../../hooks';
import SortingOptions from '../../components/sorting-options/sortingOptions.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import { getLoadingStatus, getOffers } from '../../store/app-data/selectors.ts';
import { getCurrentCity } from '../../store/app-process/selectors.ts';
import MainEmpty from '../../components/main-empty/main-empty.tsx';

function MainScreen(): JSX.Element {
  const storeOffers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getCurrentCity);
  const offers = storeOffers.filter((offer) => offer.city.name === activeCity.name);
  const [currentActiveCard, setActiveCard ] = useState<number | null>(null);
  const isOffersLoading = useAppSelector(getLoadingStatus);

  if (isOffersLoading) {
    return (
      <div className={'page page--gray page--main'}>
        <Spinner />
      </div>
    );
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      <div className="cities">
        {offers.length === 0 ? <MainEmpty activeCity={activeCity}/>
          :
          (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
                <SortingOptions />
                <div className="cities__places-list places__list tabs__content">
                  <PlaceCardList setActiveCard={setActiveCard} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  className={'cities__map'}
                  city={activeCity}
                  placeLocationId={currentActiveCard}
                  offers={offers}
                />
              </div>
            </div>)}
      </div>
    </main>
  );
}

export default MainScreen;
