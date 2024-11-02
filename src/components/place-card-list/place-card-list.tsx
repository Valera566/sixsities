import {useAppDispatch, useAppSelector} from '../../hooks';
import PlaceCard from '../place-card/place-card.tsx';
import { sortOffers } from '../../utils/sortOffers.ts';
import { memo } from 'react';
import { getOffers } from '../../store/app-data/selectors.ts';
import { getCurrentCity, getSortType } from '../../store/app-process/selectors.ts';
import {toast} from 'react-toastify';
import {APIRoute, FavoriteStatus} from '../../const.ts';
import {postFavoriteAction} from '../../store/api-actions.ts';
import {getIsUserAuthenticated} from '../../store/user-process/selectors.ts';
import {useNavigate} from 'react-router-dom';

type PlaceCardListProps = {
  setActiveCard: (id: number | null) => void;
};

const PlaceCardList = ({setActiveCard}: PlaceCardListProps) => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getCurrentCity);
  const offersByActiveCity = offers.filter((offer) => offer.city.name === activeCity.name);
  const sortType = useAppSelector(getSortType);
  const sortedOffersBySortType = sortOffers(offersByActiveCity, sortType);
  const isUserLoggedIn = useAppSelector(getIsUserAuthenticated);
  const navigate = useNavigate();

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
    <div className="cities__places-list places__list tabs__content">
      {sortedOffersBySortType.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} setActiveCard={setActiveCard} onSetFavorite={toggleFavoriteStatus}/>
      ))}
    </div>
  );
};

export default memo(PlaceCardList);
