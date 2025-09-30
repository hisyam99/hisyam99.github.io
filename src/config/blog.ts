/**
 * Blog configuration
 * Controls caching and refresh behavior
 */
export const BLOG_CONFIG = {
  // Cache duration in seconds
  CACHE_DURATION: 300, // 5 minutes

  // Stale while revalidate duration
  STALE_WHILE_REVALIDATE: 3600, // 1 hour

  // Enable real-time updates
  ENABLE_REALTIME: true,

  // Auto-refresh interval (in milliseconds) - 0 to disable
  AUTO_REFRESH_INTERVAL: 0, // Disabled by default

  // Page sizes
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const;

/**
 * Check if we're in development mode
 */
export const isDevelopment = () => {
  return process.env.NODE_ENV === "development" || import.meta.env.DEV;
};

/**
 * Get base URL for API calls
 */
export const getApiBaseUrl = () => {
  return process.env.API_BASE_URL || "http://localhost:4001";
};
