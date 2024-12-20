import React from 'react';
import { MAP_OPTIONS } from '../../../config/maps.config';

interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  children?: React.ReactNode;
}

export function GoogleMap({ center, zoom, children }: GoogleMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  React.useEffect(() => {
    if (!mapRef.current || map) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center,
      zoom
    });

    setMap(mapInstance);
  }, [center, zoom, map]);

  React.useEffect(() => {
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