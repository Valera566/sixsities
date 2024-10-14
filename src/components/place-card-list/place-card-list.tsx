import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card.tsx';
import { sortOffers } from '../../utils/sortOffers.ts';

type PlaceCardListProps = {
  setActiveCard: (id: number | null) => void;
};

const PlaceCardList = ({setActiveCard}: PlaceCardListProps) => {
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city.name);
  const offersByActiveCity = offers.filter((offer) => offer.city.name === activeCity);
  const sortType = useAppSelector((state) => state.sortType);

  const sortedOffersBySortType = sortOffers(offersByActiveCity, sortType);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffersBySortType.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} setActiveCard={setActiveCard} />
      ))}
    </div>
  );
};

export default PlaceCardList;
