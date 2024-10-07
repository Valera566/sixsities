import { useEffect, useState, useRef } from 'react';
import leafLet, { Map as LeafletMap } from 'leaflet';
import { City } from '../types/offer.ts';

type UseMapProps = {
  city: City;
  mapRef: React.RefObject<HTMLDivElement>;
};

const TILE_LAYER_URL_PATTERN =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


function useMap({ city, mapRef }: UseMapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRendered.current) {
      const instanse = leafLet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leafLet
        .tileLayer(TILE_LAYER_URL_PATTERN, {
          attribution: TILE_LAYER_ATTRIBUTION
        })
        .addTo(instanse);

      setMap(instanse);
      isRendered.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
