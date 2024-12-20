import React, { useRef, useEffect, useState } from 'react';
import { MAP_OPTIONS } from '../../config/maps.config';

interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  children?: React.ReactNode;
  onMapLoad?: (map: google.maps.Map) => void;
}

export function GoogleMap({ center, zoom, children, onMapLoad }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center,
      zoom
    });

    setMap(mapInstance);
    onMapLoad?.(mapInstance);
  }, [center, zoom, onMapLoad]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [map, center]);

  return (
    <div ref={mapRef} className="w-full h-full">
      {map && React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
        return null;
      })}
    </div>
  );
}