/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.dev/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/bun";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Get origin from environment or construct it
const origin =
  Bun.env.ORIGIN || `https://${Bun.env.PUBLIC_BASE_URL || "localhost:3000"}`;

// Create the Qwik City Bun middleware
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  static: {
    cacheControl: "public, max-age=31536000, immutable",
  },
});

// Allow for dynamic port
const port = Number(Bun.env.PORT ?? 5173);

// Check if we should use HTTPS
const useHttps =
  Bun.env.NODE_ENV === "development" || Bun.env.USE_HTTPS === "true";
const protocol = useHttps ? "https" : "http";

// SSL configuration
const httpsConfig =
  useHttps && existsSync(resolve("certs/cert.pem"))
    ? {
        key: readFileSync(resolve("certs/key.pem")),
        cert: readFileSync(resolve("certs/cert.pem")),
      }
    : undefined;

console.log(`Server started: ${protocol}://localhost:${port}/`);
console.log(`Expected origin: ${origin}`);
console.log(`HTTPS enabled: ${!!httpsConfig}`);

Bun.serve({
  async fetch(request: Request) {
    // Handle reverse proxy headers for production
    const url = new URL(request.url);
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost = request.headers.get("x-forwarded-host");

    // Create new request with corrected URL if needed
    let correctedRequest = request;

    if (forwardedProto && forwardedHost) {
      const correctedUrl = `${forwardedProto}://${forwardedHost}${url.pathname}${url.search}`;
      correctedRequest = new Request(correctedUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    const staticResponse = await staticFile(correctedRequest);
    if (staticResponse) {
      return staticResponse;
    }

    // Server-side render this request with Qwik City
    const qwikCityResponse = await router(correctedRequest);
    if (qwikCityResponse) {
      return qwikCityResponse;
    }

    // Path not found
    return notFound(correctedRequest);
  },
  port,
  // Add HTTPS support
  ...(httpsConfig && {
    tls: httpsConfig,
  }),
});
