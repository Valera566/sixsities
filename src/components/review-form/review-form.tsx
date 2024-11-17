import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { postReviewAction} from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFormData, getFormActiveState } from '../../store/app-data/selectors.ts';
import ReviewRating from '../review-rating/review-rating.tsx';
import { changeFormData } from '../../store/app-data/app-data.ts';


export const ReviewForm = () => {
  const { id } = useParams();
  const minCommentLength = 50;
  const dispatch = useAppDispatch();
  const maxCommentLength = 300;
  const formActiveState = useAppSelector(getFormActiveState);
  const formData = useAppSelector(getFormData);
  const { comment, rating } = formData;


  const handleFieldChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    dispatch(changeFormData({ ...formData, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      dispatch(postReviewAction([{ comment, rating }, id]));
    }
  };


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <ReviewRating rating={rating} handleRatingChange={handleFieldChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleFieldChange}
        disabled={formActiveState}
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
          disabled={
            formActiveState ||
            comment.length < minCommentLength ||
            comment.length > maxCommentLength ||
            rating === 0
          }
        >
        Submit
        </button>
      </div>
    </form>);
};
