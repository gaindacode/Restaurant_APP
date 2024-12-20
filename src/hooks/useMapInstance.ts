import { useEffect, useRef, useState } from 'react';
import { MAP_OPTIONS } from '../config/maps.config';

interface UseMapInstanceProps {
  center?: google.maps.LatLngLiteral;
  onMapLoad?: (map: google.maps.Map) => void;
}

export function useMapInstance({ center, onMapLoad }: UseMapInstanceProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center: center || { lat: 0, lng: 0 }
    });

    setMap(mapInstance);
    onMapLoad?.(mapInstance);
  }, [center, onMapLoad]);

  return { mapRef, map };
}