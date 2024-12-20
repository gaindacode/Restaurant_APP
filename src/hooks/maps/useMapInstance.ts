import { useEffect, useRef, useState, useCallback } from 'react';
import { MAP_OPTIONS } from '../../config/maps.config';

interface UseMapInstanceProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onLoad?: (map: google.maps.Map) => void;
}

export function useMapInstance({ center, zoom, onLoad }: UseMapInstanceProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || map) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center,
      zoom
    });

    setMap(mapInstance);
    onLoad?.(mapInstance);
  }, [center, zoom, onLoad, map]);

  useEffect(() => {
    initializeMap();

    return () => {
      if (map) {
        // Cleanup map instance
        setMap(null);
      }
    };
  }, [initializeMap]);

  // Handle center changes without recreating the map
  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [center, map]);

  return { mapRef, map };
}