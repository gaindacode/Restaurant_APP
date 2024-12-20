import { useEffect, useRef, useState, useCallback } from 'react';
import { Map } from 'leaflet';

interface UseMapInstanceProps {
  center: [number, number];
  zoom: number;
  onLoad?: (map: Map) => void;
}

export function useMapInstance({ center, zoom, onLoad }: UseMapInstanceProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || map) return;

    const instance = new Map(mapRef.current, {
      center,
      zoom
    });

    setMap(instance);
    onLoad?.(instance);

    return () => {
      instance.remove();
    };
  }, [center, zoom, onLoad, map]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  return { mapRef, map };
}