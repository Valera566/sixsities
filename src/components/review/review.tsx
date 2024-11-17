import ReviewsList from '../reviews-list/reviews-list.tsx';
import {ReviewForm} from '../review-form/review-form.tsx';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const.ts';
import React from 'react';
import { getReviews } from '../../store/app-data/selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';

const Reviews = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const reviews = useAppSelector(getReviews);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews}/>
      {isAuth && <ReviewForm/>}
    </section>
  );
};

export default React.memo(Reviews);
