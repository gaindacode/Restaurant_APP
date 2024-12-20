export interface BaseError extends Error {
  code?: string;
  originalError?: Error;
}

export interface ErrorHandler<T extends BaseError> {
  handle: (error: unknown) => T;
  getErrorMessage: (code: string) => string;
}