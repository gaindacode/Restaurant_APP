import { FirebaseError as FirebaseErrorType } from 'firebase/app';
import { BaseError } from '../types';

export class FirebaseError extends Error implements BaseError {
  constructor(
    message: string,
    public code?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export function isFirebaseError(error: unknown): error is FirebaseErrorType {
  return error instanceof FirebaseErrorType;
}