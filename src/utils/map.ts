// Convert meters to degrees at a given latitude
export function metersToLatitudeDegrees(meters: number): number {
  return meters / 111320; // Earth's circumference / 360 degrees
}

export function metersToLongitudeDegrees(meters: number, latitude: number): number {
  return meters / (111320 * Math.cos(latitude * (Math.PI / 180)));
}

export function createBoundingBox(lat: number, lng: number, radiusInMeters: number) {
  return {
    south: lat - metersToLatitudeDegrees(radiusInMeters),
    north: lat + metersToLatitudeDegrees(radiusInMeters),
    west: lng - metersToLongitudeDegrees(radiusInMeters, lat),
    east: lng + metersToLongitudeDegrees(radiusInMeters, lat)
  };
}