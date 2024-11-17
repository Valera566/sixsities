import {Helmet} from 'react-helmet-async';
import Reviews from '../../components/review/review.tsx';
import OfferDescriptionList from '../../components/offer-description-list/offer-description-list.tsx';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import NearPlaces from '../../components/near-places/near-places.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {
  getOfferByIdAction,
  getOffersNearbyAction,
  getReviewsByIdAction,
} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import {getCurrentCity} from '../../store/app-process/selectors.ts';
import {getCurrentOffer, getLoadingStatus, getOffersNearby} from '../../store/app-data/selectors.ts';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCurrentCity);
  const { id } = useParams<{ id: string }>();
  const [currentActiveCard, setActiveCard] = useState<number | null>(null);
  const rentalOffer = useAppSelector(getCurrentOffer);
  const isOffersLoading = useAppSelector(getLoadingStatus);
  const rentalOffersNearby = useAppSelector(getOffersNearby);

  useEffect(() => {
    if (id) {
      dispatch(getOfferByIdAction(id));
      dispatch(getOffersNearbyAction(id));
      dispatch(getReviewsByIdAction(id));
    }
  }, [id]);

  if (!rentalOffer) {
    return <NotFoundScreen />;
  }

  if (isOffersLoading) {
    return (
      <div className="offer__container container">
        <Spinner/>;
      </div>
    );
  }

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        <OfferGallery offer={rentalOffer}/>
        <div className="offer__container container">
          {rentalOffer && <OfferDescriptionList offer={rentalOffer} /> }
          <Reviews/>
        </div>
        <section className="offer__map map">
          <Map
            className={'offer__map'}
            city={activeCity}
            offers={rentalOffersNearby}
            placeLocationId={currentActiveCard}
          />
        </ section>
      </section>
      <NearPlaces
        offers={rentalOffersNearby}
        setActiveCard={setActiveCard}
      />
    </main>
  );
}

export default OfferScreen;
