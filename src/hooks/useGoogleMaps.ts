import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../config/maps.config';

interface UseGoogleMapsProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

export function useGoogleMaps({ center, zoom }: UseGoogleMapsProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load()
      .then(() => {
        if (!mapRef.current) return;

        // Initialize map
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: center || { lat: 0, lng: 0 },
          zoom: zoom || 14,
          disableDefaultUI: true,
          zoomControl: true
        });

        // Initialize search box
        if (searchBoxRef.current) {
          const searchBoxInstance = new google.maps.places.SearchBox(searchBoxRef.current);
          mapInstance.addListener('bounds_changed', () => {
            searchBoxInstance.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds);
          });

          searchBoxInstance.addListener('places_changed', () => {
            const places = searchBoxInstance.getPlaces();
            if (!places?.length) return;

            const bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
              if (!place.geometry?.location) return;
              bounds.extend(place.geometry.location);
            });

            mapInstance.fitBounds(bounds);
          });

          setSearchBox(searchBoxInstance);
        }

        setMap(mapInstance);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        setLoading(false);
      });
  }, [center, zoom]);

  return { mapRef, searchBoxRef, map, searchBox, loading, error };
}