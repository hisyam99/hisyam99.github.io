/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { lazy, Suspense } from "react";
import type { ComponentType } from "react";

// Define the props interface for StackIcon
interface StackIconProps {
  name: string;
  className?: string;
  [key: string]: any;
}

// Dynamic import for tech-stack-icons to reduce initial bundle size
const StackIconLazy = lazy(
  () => import("tech-stack-icons"),
) as ComponentType<StackIconProps>;

// Wrapper component with Suspense for loading state
const StackIconWithSuspense = (props: StackIconProps) => (
  <Suspense
    fallback={
      <div
        className={`inline-block animate-pulse rounded bg-gray-300 ${props.className || ""}`}
        style={{ width: "24px", height: "24px" }}
        aria-label={`Loading ${props.name} icon`}
      />
    }
  >
    <StackIconLazy {...props} />
  </Suspense>
);

// Qwikified version with dynamic loading
export const QStackIcon = qwikify$<StackIconProps>(StackIconWithSuspense);

// Keep the old static import as fallback (commented out)
// import StackIcon from 'tech-stack-icons';
// export const QStackIcon = qwikify$<StackIconProps>(StackIcon);

// Note: tech-stack-icons is now in its own chunk (vendor-icons) and loads on-demand
// This provides the best balance between functionality and bundle optimization
