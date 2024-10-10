import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType } from '../../store/action.ts';
import { SortOption } from '../../const.ts';
import cn from 'classnames';

function SortingOptions() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.sortType);

  const [placesOptionActive, setPlacesOptionActive] = useState(false);

  const handleSortOptionClick = (selectedSortType: SortOption) => {
    dispatch(setSortType({ sortType: selectedSortType }));
    setPlacesOptionActive(false);
  };

  const handleSetPlacesOptionToggle = () => {
    setPlacesOptionActive(!placesOptionActive);
  };

  const placesOptionsClass = cn('places__options','places__options--custom', {
    'places__options--opened': placesOptionActive,
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSetPlacesOptionToggle}
      >
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={placesOptionsClass}>
        {Object.values(SortOption).map((value) => (
          <li
            key={value}
            className={cn('places__option', {
              'places__option--active': sortType === value,
            })}
            tabIndex={0}
            onClick={() => handleSortOptionClick(value)}
          >
            {value}
          </li>
        ))}

      </ul>
    </form>
  );
}

export default SortingOptions;
