import { FirebaseError } from 'firebase/app';

export function onSnapshotError(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'unavailable':
        console.warn('Operating in offline mode. Some features may be limited.');
        break;
      case 'permission-denied':
        console.error('Access denied. Please sign in again.');
        break;
      default:
        console.error('Firebase error:', error.message);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}