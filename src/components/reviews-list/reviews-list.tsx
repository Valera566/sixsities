import { Review } from '../../types/offer.ts';
import { ratingOffers } from '../../utils/utils.ts';

type ReviewsListProps = {
  reviews?: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews?.map((review) => (
        <li key={review.user.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={review.user.avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{review.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{width: `${ratingOffers(review.rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{review.comment}</p>
            <time className="reviews__time" dateTime={review.date.toString()}>
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
