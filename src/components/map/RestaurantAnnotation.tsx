import React, { useEffect, useRef } from 'react';
import type { Restaurant } from '../../types/restaurant';

interface RestaurantAnnotationProps {
  map?: mapkit.Map;
  restaurant: Restaurant;
  onSelect?: (restaurant: Restaurant) => void;
}

export function RestaurantAnnotation({ map, restaurant, onSelect }: RestaurantAnnotationProps) {
  const annotationRef = useRef<mapkit.MarkerAnnotation>();

  useEffect(() => {
    if (!map) return;

    const coordinate = new mapkit.Coordinate(
      restaurant.location.lat,
      restaurant.location.lng
    );

    // Create custom element for annotation
    const element = document.createElement('div');
    element.className = 'relative';
    
    const img = document.createElement('img');
    img.src = restaurant.logo;
    img.className = 'w-8 h-8 rounded-full shadow-md';
    element.appendChild(img);

    const annotation = new mapkit.MarkerAnnotation(coordinate, {
      callout: {
        displayPriority: 1,
        content: createCalloutContent(restaurant)
      },
      animates: true,
      draggable: false,
      selected: false,
      element
    });

    map.addAnnotation(annotation);
    annotationRef.current = annotation;

    annotation.element.addEventListener('click', () => {
      onSelect?.(restaurant);
      map.selectedAnnotation = annotation;
    });

    return () => {
      if (map && annotation) {
        map.removeAnnotation(annotation);
      }
    };
  }, [map, restaurant, onSelect]);

  return null;
}

function createCalloutContent(restaurant: Restaurant): HTMLElement {
  const container = document.createElement('div');
  container.className = 'p-3 min-w-[240px]';
  
  container.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <img src="${restaurant.logo}" alt="${restaurant.name}" class="w-8 h-8 rounded-full"/>
      <div>
        <h3 class="font-semibold text-gray-900">${restaurant.name}</h3>
        <div class="flex items-center gap-1 text-sm text-gray-600">
          <span>★ ${restaurant.rating}</span>
          <span>(${restaurant.userRatingsTotal})</span>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-600 mb-2">${restaurant.location.address}</p>
    <p class="text-sm font-medium text-emerald-600">${restaurant.cashbackRate}% cashback</p>
  `;

  return container;
}