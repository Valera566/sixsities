import React from 'react';

type RatingStarProps = {
  value: number;
  title: string;
  rating: number;
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RatingStar({
  value,
  title,
  rating,
  handleRatingChange,
}: RatingStarProps) {
  return (
    <>
      <input
        onChange={handleRatingChange}
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={value === rating}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use href="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default React.memo(RatingStar);
