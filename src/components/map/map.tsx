import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap.ts';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/offer.ts';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from './const.ts';

type MapProps = {
  city: City;
  placeLocationId: number | null;
  className: string;
  offers: Offer[];
};

const activeMarkerIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const defaultMarkerIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

function Map({ city, offers, placeLocationId, className }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });
  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof Marker) {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        const icon =
          offer.id === placeLocationId ? activeMarkerIcon : defaultMarkerIcon;

        marker.setIcon(icon).addTo(map);
      });
    }
  }, [map, offers, placeLocationId]);
  return <section className={`map ${className}`} ref={mapRef} />;
}

export default Map;
