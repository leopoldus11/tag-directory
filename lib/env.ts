/**
 * Environment utilities for handling URLs in both development and production
 */

/**
 * Get the base URL for the application
 * Works in both localhost and production
 */
export function getBaseUrl(): string {
  // In production, use NEXT_PUBLIC_SITE_URL if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // In Vercel, use VERCEL_URL if available
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Fallback to production URL
  return "https://tracking.directory";
}

/**
 * Get the NextAuth URL
 * NextAuth requires the full URL including protocol
 */
export function getNextAuthUrl(): string {
  // Use explicit NEXTAUTH_URL if set
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  // Otherwise, use the base URL
  return getBaseUrl();
}

/**
 * Check if we're in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production" && !(process.env.VERCEL_URL?.includes("localhost") ?? false);
}

/**
 * Check if we're in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development" || (process.env.VERCEL_URL?.includes("localhost") ?? false);
}

