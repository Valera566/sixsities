import React from 'react';
import { REVIEW_RATING } from '../../const';
import RatingStar from '../rating-star/rating-star';

type ReviewRatingProps = {
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rating: number;
};

function ReviewRating({ handleRatingChange, rating }: ReviewRatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {REVIEW_RATING.map((item) => (
        <RatingStar
          key={item.value}
          handleRatingChange={handleRatingChange}
          value={item.value}
          title={item.title}
          rating={rating}
        />
      ))}
    </div>
  );
}

export default React.memo(ReviewRating);
