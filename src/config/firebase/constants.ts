// Firebase configuration constants
export const FIRESTORE_SETTINGS = {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  cacheSizeBytes: 40000000, // 40 MB
} as const;

export const PERSISTENCE_SETTINGS = {
  synchronizeTabs: true,
  experimentalTabSynchronization: true
} as const;