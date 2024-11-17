import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';
import React from 'react';

type NearPlacesProps = {
  offers?: Offer[] | undefined;
  setActiveCard(id: number | null): void;

};

function NearPlaces({offers, setActiveCard }: NearPlacesProps) {

  return (
    <div className="container">
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
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default React.memo(NearPlaces);
