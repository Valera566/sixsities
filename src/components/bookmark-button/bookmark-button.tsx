import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { postFavoriteAction, getFavoritesOffersAction } from '../../store/api-actions.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { AppRoute, AuthorizationStatus, BookmarkSizeMap} from '../../const.ts';
import { useState } from 'react';
import { TSizeMap } from '../../types/size.ts';


type BookmarkButtonProps = {
  id: number;
  isFavorite: boolean;
  block: string;
  size?: keyof TSizeMap;
}

function BookmarkButton ({isFavorite, id, block, size = 'small'}: BookmarkButtonProps):JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

  function onButtonClickHandler() {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }
    setFavoriteStatus((prevState) => !prevState);

    dispatch(postFavoriteAction({
      id,
      status: Number(!favoriteStatus)
    })).then(() => dispatch(getFavoritesOffersAction()));
  }

  return (
    <button
      className={cn(`${block}__bookmark-button`, 'button', {
        [`${block}__bookmark-button--active`]: favoriteStatus && isAuthorized,
      })}
      type="button"
      onClick={onButtonClickHandler}
    >
      <svg
        className={`${block}__bookmark-icon`}
        {...BookmarkSizeMap[size]}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;

