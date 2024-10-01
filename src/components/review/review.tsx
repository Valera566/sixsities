import ReviewsList from '../reviews-list/reviews-list.tsx';
import { ReviewForm } from '../review-form/review-form.tsx';
import { Review } from '../../types/offer.ts';


type ReviewProps = {
  isAuth: boolean;
  reviews: Review[];
  offerId?: string;
}

export const Reviews = ({isAuth, reviews, offerId}: ReviewProps) => {

  const reviewsData = reviews.filter(
    (review) => offerId === review.id.toString()
  );

  return (
    <>
      <ReviewsList reviews={reviewsData} />
      {isAuth && <ReviewForm />}
    </>
  );
};
