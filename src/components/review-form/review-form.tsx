import {useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getReviewsByIdAction, postReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';
import ReviewRating from '../review-rating/review-rating.tsx';

export const ReviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const minCommentLength = 50;
  const dispatch = useAppDispatch();

  const handleRatingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setRating(value);
    },
    []
  );

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setComment(value);
    },
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    event
  ) => {
    event.preventDefault();
    if (id) {
      dispatch(postReviewAction([{ comment, rating }, id]));
      dispatch(getReviewsByIdAction(id));
      setComment('');
      setRating(0);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <ReviewRating rating={rating} handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
        your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < minCommentLength || rating === 0}
        >
        Submit
        </button>
      </div>
    </form>);
};
