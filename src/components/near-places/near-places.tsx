import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';
import React from 'react';

type NearPlacesProps = {
  offers?: Offer[] | undefined;
  setActiveCard(id: number | null): void;
  onSetFavorite: (isFavorite: boolean, offerId: number) => void;
};

function NearPlaces({offers, setActiveCard, onSetFavorite}: NearPlacesProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {offers &&
          offers.map((offer) => (
            <PlaceCard
              key={offer.id}
              offer={offer}
              setActiveCard={setActiveCard}
              cardType="nearPlaces"
              onSetFavorite = {onSetFavorite}
            />
          ))}
      </div>
    </section>
  );
}

export default React.memo(NearPlaces);
