import { Offer } from '../../types/offer.ts';
import { ratingOffers } from '../../utils/utils.ts';

type OfferDescriptionList = {
  offer: Offer;
}

function OfferDescriptionList({ offer }: OfferDescriptionList) {

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
  } = offer;

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
        <button className={`offer__bookmark-button button ${
          isFavorite ? 'place-card__bookmark-button--active' : ''
        }`} type="button"
        >
          <svg className={`${
            isFavorite ? 'place-card__bookmark-icon'
              : 'offer__bookmark-icon'
          }`}
          width={31} height={33}
          >
            <use xlinkHref="#icon-bookmark"/>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{width: `${ratingOffers(rating)}%`}}/>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{type}</li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms
            ? `${bedrooms} ${bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`
            : '1 Bedroom'}
        </li>
        <li className="offer__feature offer__feature--adults">
          {`Max ${maxAdults
            ? `${maxAdults} ${maxAdults > 1 ? 'adults' : 'adult'}`
            : '2 adults'}`}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">€{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          <li className="offer__inside-item">Wi-Fi</li>
          <li className="offer__inside-item">Washing machine</li>
          <li className="offer__inside-item">Towels</li>
          <li className="offer__inside-item">Heating</li>
          <li className="offer__inside-item">Coffee machine</li>
          <li className="offer__inside-item">Baby seat</li>
          <li className="offer__inside-item">Kitchen</li>
          <li className="offer__inside-item">Dishwasher</li>
          <li className="offer__inside-item">Cabel TV</li>
          <li className="offer__inside-item">Fridge</li>
        </ul>
      </div>
      <div className="offer__host">
        <h2 className="offer__host-title">Meet the host</h2>
        <div className="offer__host-user user">
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img
              className="offer__avatar user__avatar"
              src="img/avatar-angelina.jpg"
              width={74}
              height={74}
              alt="Host avatar"
            />
          </div>
          <span className="offer__user-name">Angelina</span>
          <span className="offer__user-status">Pro</span>
        </div>
        <div className="offer__description">
          <p className="offer__text">
            A quiet cozy and picturesque that hides behind a a river by the
            unique lightness of Amsterdam. The building is green and from
            18th century.
          </p>
          <p className="offer__text">
            An independent House, strategically located between Rembrand
            Square and National Opera, but where the bustle of the city
            comes to rest in this alley flowery and colorful.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfferDescriptionList;
