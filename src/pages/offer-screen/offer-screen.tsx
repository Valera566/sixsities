import { Helmet } from 'react-helmet-async';
import { Reviews } from '../../components/review/review.tsx';
import OfferDescriptionList from '../../components/offer-description-list/offer-description-list.tsx';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import NearPlaces from '../../components/near-places/near-places.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {
  getOfferByIdAction,
  getOffersNearbyAction,
  getReviewsByIdAction
} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);


  const { id } = useParams<{ id: string }>();
  const reviews = useAppSelector((state) => state.reviews);

  const [currentActiveCard, setActiveCard] = useState<number | null>(null);

  const rentalOffer = useAppSelector((state) => state.offerById);
  const isOffersLoading = useAppSelector((state) => state.isLoading);
  const rentalOffersNearby = useAppSelector((state) => state.offersNearby);

  useEffect(() => {
    if (id) {
      dispatch(getOfferByIdAction(id));
      dispatch(getOffersNearbyAction(id));
      dispatch(getReviewsByIdAction(id));
    }
  }, [id, dispatch]);

  if (!rentalOffer) {
    return <NotFoundScreen />;
  }

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        <OfferGallery offer={rentalOffer}/>
        <div className="offer__container container">
          {rentalOffer ? <OfferDescriptionList offer={rentalOffer} /> : null}
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <Reviews />
          </section>

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
      <div className="container">
        <NearPlaces
          offers={rentalOffersNearby}
          setActiveCard={setActiveCard}
        />
      </div>
    </main>
  );
}

export default OfferScreen;
