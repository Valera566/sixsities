import {Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getReviewsByIdAction, postReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';

type ChangeHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const rating = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'}
];

export const ReviewForm = () => {
  const [review, setReview] = useState({rating: 0, review: ''});

  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview({...review, [name]: value});
  };

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(postReviewAction([{ comment: review.review, rating: review.rating }, id]));
      dispatch(getReviewsByIdAction(id));
      setReview({rating: 0, review: ''});
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({value, label}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleChange}
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
          disabled={review.review.length < 50 || review.rating === 0}
        >
        Submit
        </button>
      </div>
    </form>);
};
