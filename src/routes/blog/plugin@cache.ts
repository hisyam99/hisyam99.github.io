import type { RequestHandler } from "@builder.io/qwik-city";

/**
 * Cache plugin for blog routes
 * Sets appropriate cache headers for blog content
 */
export const onRequest: RequestHandler = async (requestEvent) => {
  const { headers, url, cacheControl } = requestEvent;

  // For blog listing and individual posts, set short-term cache
  // This balances performance with fresh content
  if (url.pathname.startsWith("/blog")) {
    // Cache for 5 minutes in browser, but allow stale content for 1 hour
    // CDN can serve stale content while revalidating in background
    cacheControl({
      maxAge: 300, // 5 minutes
      staleWhileRevalidate: 3600, // 1 hour
      public: true,
    });

    // Set Last-Modified header for better caching
    headers.set("Last-Modified", new Date().toUTCString());

    // Enable conditional requests
    headers.set("ETag", `"blog-${Date.now()}"`);
  }
};
