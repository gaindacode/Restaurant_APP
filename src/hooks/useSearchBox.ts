import { useEffect, useRef, useState } from 'react';

interface UseSearchBoxProps {
  map: google.maps.Map | null;
  onPlacesChanged?: (places: google.maps.places.PlaceResult[]) => void;
}

export function useSearchBox({ map, onPlacesChanged }: UseSearchBoxProps) {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    if (!map || !searchBoxRef.current || searchBox) return;

    const searchBoxInstance = new google.maps.places.SearchBox(searchBoxRef.current);
    
    map.addListener('bounds_changed', () => {
      searchBoxInstance.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    searchBoxInstance.addListener('places_changed', () => {
      const places = searchBoxInstance.getPlaces();
      if (!places?.length) return;

      onPlacesChanged?.(places);

      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if (place.geometry?.location) {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });

    setSearchBox(searchBoxInstance);

    return () => {
      google.maps.event.clearInstanceListeners(searchBoxInstance);
    };
  }, [map, onPlacesChanged]);

  return { searchBoxRef };
}