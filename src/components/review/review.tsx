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
    <>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm />}
    </>
  );
};

export default React.memo(Reviews);
