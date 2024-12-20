/// <reference types="vite/client" />

declare namespace mapkit {
  interface MapConstructorOptions {
    center?: Coordinate;
    zoom?: number;
    showsUserLocation?: boolean;
    showsUserLocationControl?: boolean;
    showsCompass?: boolean;
    showsScale?: boolean;
    colorScheme?: ColorScheme;
  }

  class Map {
    static readonly ColorSchemes: {
      readonly Light: ColorScheme;
      readonly Dark: ColorScheme;
    };

    constructor(container: HTMLElement, options?: MapConstructorOptions);
    center: Coordinate;
    zoom: number;
    destroy(): void;
    addAnnotation(annotation: Annotation): void;
    removeAnnotation(annotation: Annotation): void;
    selectedAnnotation: Annotation | null;
  }

  class Coordinate {
    constructor(latitude: number, longitude: number);
    latitude: number;
    longitude: number;
  }

  class MarkerAnnotation implements Annotation {
    constructor(coordinate: Coordinate, options?: AnnotationConstructorOptions);
    coordinate: Coordinate;
    element: HTMLElement;
  }

  interface AnnotationConstructorOptions {
    callout?: {
      displayPriority?: number;
      content?: HTMLElement;
    };
    animates?: boolean;
    draggable?: boolean;
    selected?: boolean;
    element?: HTMLElement;
  }

  interface Annotation {
    coordinate: Coordinate;
    element: HTMLElement;
  }

  type ColorScheme = 'light' | 'dark';

  function init(options: {
    authorizationCallback: (done: (token: string) => void) => void;
    language?: string;
  }): void;
}