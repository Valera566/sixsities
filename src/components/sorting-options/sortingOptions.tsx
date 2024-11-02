import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortOption } from '../../const.ts';
import cn from 'classnames';
import React, { useState } from 'react';
import { getSortType } from '../../store/app-process/selectors.ts';
import { setSortType } from '../../store/app-process/app-process.ts';

function SortingOptions() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);

  const [placesOptionActive, setPlacesOptionActive] = useState(false);

  const handleSortOptionClick = (selectedSortType: SortOption) => {
    dispatch(setSortType(selectedSortType));
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

export default React.memo(SortingOptions);
