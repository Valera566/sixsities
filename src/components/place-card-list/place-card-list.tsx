import {Offer} from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

type PlaceCardListProps = {
  offers: Offer[];
  setActiveCard: (id: number | null) => void;
};

const PlaceCardList = ({offers, setActiveCard}: PlaceCardListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} setActiveCard={setActiveCard} />
    ))}
  </div>
);

export default PlaceCardList;
