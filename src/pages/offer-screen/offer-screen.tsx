import { Helmet } from 'react-helmet-async';
import { Reviews } from '../../components/review/review.tsx';
import { getAuthorizationStatus } from '../../authorizationStatus.ts';
import { AuthorizationStatus } from '../../const.ts';
import { reviews } from '../../mock/reviews.ts';
import OfferDescriptionList from '../../components/offer-description-list/offer-description-list.tsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Map from '../../components/map/map.tsx';
import NearPlaces from '../../components/near-places/near-places.tsx';
import { useAppSelector } from '../../hooks';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';

function OfferScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);
  const authorizationStatus = getAuthorizationStatus();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const { id } = useParams<{ id: string }>();

  const [currentActiveCard, setActiveCard] = useState<number | null>(null);

  const rentalOffer = offers.find((offer) => offer.id.toString() === id);

  const rentalOffersNearby = offers.filter((offer) => offer.id.toString() !== id);

  if (!rentalOffer) {
    return <NotFoundScreen />;
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
            <Reviews isAuth={isAuth} reviews={reviews} offerId={id} />
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
