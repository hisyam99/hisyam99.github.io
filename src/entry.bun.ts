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
import { readFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

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
const port = Number(Bun.env.PORT ?? 3000);

// ALWAYS use HTTPS - no exceptions
const protocol = "https";

// SSL configuration - create default cert if not exists
let httpsConfig;

if (existsSync(resolve("certs/cert.pem"))) {
  // Use existing certificate
  httpsConfig = {
    key: readFileSync(resolve("certs/key.pem")),
    cert: readFileSync(resolve("certs/cert.pem")),
  };
} else {
  // Auto-generate self-signed certificate for development
  console.log(
    "⚠️  SSL certificate not found, creating self-signed certificate...",
  );

  // Create certs directory if it doesn't exist
  if (!existsSync(resolve("certs"))) {
    mkdirSync(resolve("certs"), { recursive: true });
  }

  try {
    // Generate self-signed certificate
    execSync(
      `openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Development/OU=Dev/CN=localhost"`,
      {
        cwd: process.cwd(),
        stdio: "pipe",
      },
    );

    httpsConfig = {
      key: readFileSync(resolve("certs/key.pem")),
      cert: readFileSync(resolve("certs/cert.pem")),
    };

    console.log("✅ Self-signed certificate created successfully!");
  } catch (error) {
    console.error(
      "❌ Failed to create SSL certificate:",
      (error as Error).message,
    );
    console.log("🔧 Please install OpenSSL or create certificate manually");
    process.exit(1);
  }
}

console.log(`🚀 Server started: ${protocol}://localhost:${port}/`);
console.log(`🔒 Expected origin: ${origin}`);
console.log(`✅ HTTPS enabled: ALWAYS (forced)`);
console.log(
  `📋 SSL certificate: ${existsSync(resolve("certs/cert.pem")) ? "Found" : "Auto-generated"}`,
);

Bun.serve({
  async fetch(request: Request) {
    // Force HTTPS - redirect if HTTP is detected
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      const httpsUrl = url.toString().replace("http:", "https:");
      return new Response(null, {
        status: 301,
        headers: {
          Location: httpsUrl,
        },
      });
    }

    // Handle reverse proxy headers for production
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
  // ALWAYS use HTTPS - required
  tls: httpsConfig,
});
