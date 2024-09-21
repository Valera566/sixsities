import ReviewList from '../reviews-list/review-list.tsx';
import {ReviewForm} from '../review-form/review-form.tsx';

type ReviewProps = {
  isAuth: boolean;
}

export const Reviews = ({isAuth}: ReviewProps) => (
  <>
    <ReviewList />
    {isAuth && <ReviewForm />}
  </>
);
