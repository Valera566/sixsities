import {useState} from 'react';

enum Locations {
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
}

function LocationsComponent() {
  const [activeLocation, setActiveLocation ] = useState<Locations | null>(null);

  const handleSetActiveLink = (location: Locations) => {
    setActiveLocation(location === activeLocation ? null : location);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(Locations)
          .filter((value) => typeof value === 'number')
          .map((location) => {
            const locationKey = location as Locations;
            return (
              <li key={locationKey} className="locations__item">
                <a
                  className={`locations__item-link tabs__item ${
                    activeLocation === locationKey ? 'tabs__item--active' : ''}`}
                  href="#"
                  onClick={() => handleSetActiveLink(locationKey)}
                >
                  <span>{Locations[locationKey]}</span>
                </a>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default LocationsComponent;
