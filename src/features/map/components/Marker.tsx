import React, { useEffect, useState } from 'react';

interface MarkerProps {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
  title?: string;
  icon?: google.maps.Icon | string;
  onClick?: () => void;
}

export function Marker({ map, position, title, icon, onClick }: MarkerProps) {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      const newMarker = new google.maps.Marker({
        position,
        map,
        title,
        icon
      });

      if (onClick) {
        newMarker.addListener('click', onClick);
      }

      setMarker(newMarker);
    }

    return () => {
      if (marker) {
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
    };
  }, [map, marker, position, title, icon, onClick]);

  return null;
}