import { Offer } from '../../types/offer.ts';
import { ratingOffers } from '../../utils/utils.ts';
import React from 'react';
import BookmarkButton from '../bookmark-button/bookmark-button.tsx';

type OfferDescriptionList = {
  offer: Offer;
}

function OfferDescriptionList({ offer}: OfferDescriptionList) {

  const {
    id,
    title,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = offer;


  const ratingStyle = {width: `${ratingOffers(rating)}%`};

  const bedroomText = bedrooms
    ? `${bedrooms} ${bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`
    : '1 Bedroom';

  const maxAdultsText = `Max ${maxAdults
    ? `${maxAdults} ${maxAdults > 1 ? 'adults' : 'adult'}`
    : '2 adults'}`;


  return (
    <div key={id} className="offer__wrapper">
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <BookmarkButton id={id} isFavorite={isFavorite} block={'offer'} size={'large'}/>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={ratingStyle}/>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{type}</li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedroomText}
        </li>
        <li className="offer__feature offer__feature--adults">
          {maxAdultsText}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">€{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {goods.map((item) => (
            <li key={item} className="offer__inside-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="offer__host">
        <h2 className="offer__host-title">Meet the host</h2>
        <div className="offer__host-user user">
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img
              className="offer__avatar user__avatar"
              src={host.avatarUrl}
              width={74}
              height={74}
              alt="Host avatar"
            />
          </div>
          <span className="offer__user-name">{host.name}</span>
          <span className="offer__user-status">
            {host.isPro ? 'Pro' : ''}
          </span>
        </div>
        <div className="offer__description">
          <p className="offer__text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(OfferDescriptionList);
