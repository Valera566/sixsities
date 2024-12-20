import { Offer } from '../../types/offer.ts';
import { Link } from 'react-router-dom';
import { ratingOffers } from '../../utils/utils.ts';
import cn from 'classnames';
import BookmarkButton from '../bookmark-button/bookmark-button.tsx';

export type PlaceCardProps = {
  offer: Offer;
  setActiveCard?: (id: number | null) => void;
  cardType?: 'cities' | 'favorites' | 'nearPlaces';
};

function getArticleClassName(cardType: 'cities' | 'favorites' | 'nearPlaces') {
  switch (cardType) {
    case 'cities':
      return 'cities__card';
    case 'favorites':
      return 'favorites__card';
    case 'nearPlaces':
      return 'near-places__card';
    default:
      return '';
  }
}

function getImageWrapperClassName(cardType: 'cities' | 'favorites' | 'nearPlaces'): string {
  switch (cardType) {
    case 'cities':
      return 'cities__image-wrapper';
    case 'nearPlaces':
      return 'near-places__image-wrapper';
    case 'favorites':
      return 'favorites__image-wrapper';
    default:
      return '';
  }
}

function PlaceCard({offer, setActiveCard, cardType = 'cities'}: PlaceCardProps): JSX.Element {
  const {
    isPremium,
    previewImage,
    price,
    isFavorite,
    type,
    title,
    rating,
    id,
  } = offer;

  const articleClassName = getArticleClassName(cardType);
  const imageWrapperClassName = getImageWrapperClassName(cardType);

  function handleMouseOver() {
    if(setActiveCard) {
      setActiveCard(id);
    }
  }

  function handleMouseOut() {
    if(setActiveCard) {
      setActiveCard(null);
    }
  }

  const infoClassName = cn({
    'favorites__card-info': cardType === 'favorites',
    'place-card__info': true,
  });

  return (
    <article
      className={`${articleClassName} place-card`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === 'favorites' ? 150 : 260}
            height={cardType === 'favorites' ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton id={id} isFavorite={isFavorite} block={'place-card'} size={'small'}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingOffers(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
