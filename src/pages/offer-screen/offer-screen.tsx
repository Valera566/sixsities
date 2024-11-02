import { Helmet } from 'react-helmet-async';
import Reviews from '../../components/review/review.tsx';
import OfferDescriptionList from '../../components/offer-description-list/offer-description-list.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import NearPlaces from '../../components/near-places/near-places.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {
  getOfferByIdAction,
  getOffersNearbyAction,
  getReviewsByIdAction, postFavoriteAction
} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import { getCurrentCity } from '../../store/app-process/selectors.ts';
import {getCurrentOffer, getOffersNearby, getLoadingStatus, getReviews} from '../../store/app-data/selectors.ts';
import {toast} from 'react-toastify';
import {APIRoute, FavoriteStatus} from '../../const.ts';
import {getAuthorizationStatus, getIsUserAuthenticated} from '../../store/user-process/selectors.ts';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCurrentCity);
  const { id } = useParams<{ id: string }>();
  const reviews = useAppSelector(getReviews);
  const [currentActiveCard, setActiveCard] = useState<number | null>(null);
  const rentalOffer = useAppSelector(getCurrentOffer);
  const isOffersLoading = useAppSelector(getLoadingStatus);
  const rentalOffersNearby = useAppSelector(getOffersNearby);
  const isUserLoggedIn = useAppSelector(getIsUserAuthenticated);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getOfferByIdAction(id));
      dispatch(getOffersNearbyAction(id));
      dispatch(getReviewsByIdAction(id));
    }
  }, [id, authorizationStatus]);

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

  const toggleFavoriteStatus = (isFavorite: boolean, offerId: number) => {
    if (!isUserLoggedIn) {
      toast.warn('You must log in or register to add to favorites.');
      navigate(APIRoute.Login);
    } else {
      const newFavoriteStatus = isFavorite
        ? FavoriteStatus.NotFavorite
        : FavoriteStatus.Favorite;

      dispatch(postFavoriteAction([newFavoriteStatus, offerId]));
    }
  };

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        <OfferGallery offer={rentalOffer}/>
        <div className="offer__container container">
          {rentalOffer ? <OfferDescriptionList offer={rentalOffer} onSetFavorite={toggleFavoriteStatus}/> : null}
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <Reviews/>
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
          onSetFavorite={toggleFavoriteStatus}
        />
      </div>
    </main>
  );
}

export default OfferScreen;
