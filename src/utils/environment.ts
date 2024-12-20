/**
 * Check if the application is running in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if the application is running in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}