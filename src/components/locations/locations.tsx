import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors.ts';
import { changeCity } from '../../store/app-process/app-process.ts';
import { getCurrentCity } from '../../store/app-process/selectors.ts';
import cn from 'classnames';
import React from 'react';

function LocationsComponent() {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffers);
  const cities = [...new Set(offers.map((offer) => offer.city.name))];

  const handleSetActiveLink = (city: string) => {
    const selectedCityOffer = offers.find((offer) => offer.city.name === city);

    if (selectedCityOffer) {
      dispatch(changeCity(selectedCityOffer.city));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={cn('locations__item-link', 'tabs__item', {
                'tabs__item--active': activeCity.name === city
              })}
              href="#"
              onClick={() => handleSetActiveLink(city)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default React.memo(LocationsComponent);
