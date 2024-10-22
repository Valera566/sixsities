import ReviewsList from '../reviews-list/reviews-list.tsx';
import {ReviewForm} from '../review-form/review-form.tsx';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const.ts';


export const Reviews = () => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const reviews = useAppSelector((state) => state.reviews);

  return (
    <>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm />}
    </>
  );
};
