/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";
import tailwindcss from "@tailwindcss/vite";
import { qwikReact } from "@builder.io/qwik-react/vite";
type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */

export default defineConfig(({ command, mode }): UserConfig => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      tailwindcss(),
      qwikReact(),
    ],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: [],
      include: ['tech-stack-icons'], // Pre-bundle tech-stack-icons for better performance
    },
    build: {
      // Set chunk size warning limit to 5MB (tech-stack-icons is legitimately large)
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        output: {
          // Optimized manual chunk splitting for production performance
          manualChunks: (id: string) => {
            // PRIORITY: Force tech-stack-icons into its own chunk for lazy loading
            if (id.includes('tech-stack-icons')) {
              return 'vendor-icons';
            }
            
            // Split vendor dependencies for optimal caching
            if (id.includes('node_modules')) {
              // React ecosystem - keep together for better compression
              if (id.includes('react-dom') || id.includes('react')) {
                return 'vendor-react';
              }
              
              // Animation library - separate for lazy loading
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              
              // UI/CSS libraries
              if (id.includes('daisyui') || id.includes('tailwindcss')) {
                return 'vendor-ui';
              }
              
              // Qwik React integration - separate chunk for React components
              if (id.includes('@builder.io/qwik-react')) {
                return 'qwik-react';
              }
              
              // Core Qwik libraries - separate for framework code
              if (id.includes('@builder.io/qwik-city')) {
                return 'qwik-city';
              }
              if (id.includes('@builder.io/qwik')) {
                return 'qwik-core';
              }
              
              // Other vendor dependencies
              return 'vendor-misc';
            }
            
            // Application code splitting for better performance
            if (id.includes('/src/')) {
              // Force tech icon integration into separate chunk for lazy loading
              if (id.includes('/integrations/react/tech-icons')) {
                return 'app-tech-icons';
              }
              
              // Route-based splitting for code splitting
              if (id.includes('/routes/')) {
                if (id.includes('/blog/')) {
                  return 'routes-blog';
                }
                return 'routes-main';
              }
              
              // Component splitting for better caching
              if (id.includes('/components/')) {
                // Large component groups
                if (id.includes('/starter/')) {
                  return 'components-starter';
                }
                if (id.includes('/TechIcons/')) {
                  return 'components-tech';
                }
                return 'components-ui';
              }
              
              // Utilities and hooks
              if (id.includes('/utils/') || id.includes('/hooks/')) {
                return 'app-utils';
              }
            }
            
            // Default - let Vite handle automatically
            return undefined;
          },
        },
      },
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
// *** utils ***
/**
 * Function to identify duplicate dependencies and throw an error
 * @param {Object} devDependencies - List of development dependencies
 * @param {Object} dependencies - List of production dependencies
 */
function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep,
) {
  let msg = "";
  // Create an array 'duplicateDeps' by filtering devDependencies.
  // If a dependency also exists in dependencies, it is considered a duplicate.
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );
  // include any known qwik packages
  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  );
  // any errors for missing "qwik-city-plan"
  // [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  // Format the error message with the duplicates list.
  // The `join` function is used to represent the elements of the 'duplicateDeps' array as a comma-separated string.
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  // Throw an error with the constructed message.
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
