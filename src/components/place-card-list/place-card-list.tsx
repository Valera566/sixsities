import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card.tsx';
import { sortOffers } from '../../utils/sortOffers.ts';
import { memo } from 'react';
import { getOffers } from '../../store/app-data/selectors.ts';
import { getCurrentCity, getSortType } from '../../store/app-process/selectors.ts';

type PlaceCardListProps = {
  setActiveCard: (id: number | null) => void;
};

const PlaceCardList = ({setActiveCard}: PlaceCardListProps) => {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getCurrentCity);
  const offersByActiveCity = offers.filter((offer) => offer.city.name === activeCity.name);
  const sortType = useAppSelector(getSortType);
  const sortedOffersBySortType = sortOffers(offersByActiveCity, sortType);


  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffersBySortType.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} setActiveCard={setActiveCard} />
      ))}
    </div>
  );
};

export default memo(PlaceCardList);
