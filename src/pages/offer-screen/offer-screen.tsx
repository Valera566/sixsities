import { Helmet } from 'react-helmet-async';
import { Reviews } from '../../components/review/review.tsx';
import { getAuthorizationStatus } from '../../authorizationStatus.ts';
import { AuthorizationStatus } from '../../const.ts';
import { reviews } from '../../mock/reviews.ts';
import OfferDescriptionList from '../../components/offer-description-list/offer-description-list.tsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Offer } from '../../types/offer.ts';
import Map from '../../components/map/map.tsx';
import { CITY } from '../../mock/city.ts';
import NearPlaces from '../../components/near-places/near-places.tsx';

type PropertyProps = {
  offers: Offer[];
}

function OfferScreen({ offers }: PropertyProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const { id } = useParams<{ id: string }>();

  const [currentActiveCard, setActiveCard] = useState<number | null>(null);

  const rentalOffer = offers.find((offer) => offer.id.toString() === id);

  const rentalOffersNearby = offers.filter((offer) => offer.id.toString() !== id);

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/room.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-02.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-03.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/studio-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
              />
            </div>
          </div>
        </div>
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
            city={CITY}
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
