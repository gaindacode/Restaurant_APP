// Firebase configuration options
export const FIRESTORE_OPTIONS = {
  experimentalForceLongPolling: true,
  useFetchStreams: false
} as const;

export const FIREBASE_EMULATOR_PORTS = {
  auth: 9099,
  firestore: 8080,
  ui: 4000
} as const;