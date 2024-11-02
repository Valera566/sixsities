import { Offer } from '../../types/offer.ts';
import React from 'react';

type OfferGalleryProps = {
  offer?: Offer;
}

function OfferGallery({ offer }: OfferGalleryProps): JSX.Element {
  const galleryImages = offer?.images.slice(0, 6);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {galleryImages?.map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={image}
              alt={offer?.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(OfferGallery);
