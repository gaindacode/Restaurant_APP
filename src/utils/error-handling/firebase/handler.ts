import { FirebaseError, isFirebaseError } from './errors';
import { getFirebaseErrorMessage } from './messages';
import type { ErrorHandler } from '../types';

export const firebaseErrorHandler: ErrorHandler<FirebaseError> = {
  handle: (error: unknown): FirebaseError => {
    if (isFirebaseError(error)) {
      const message = getFirebaseErrorMessage(error.code);
      return new FirebaseError(message, error.code, error);
    }
    
    return new FirebaseError(
      'An unexpected error occurred',
      'unknown',
      error as Error
    );
  },
  
  getErrorMessage
};

function getErrorMessage(code: string): string {
  return getFirebaseErrorMessage(code);
}