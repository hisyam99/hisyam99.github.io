import type { JSX } from "@builder.io/qwik";

/**
 * Breadcrumb item interface
 * Represents a single breadcrumb in the navigation trail
 */
export interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** URL path for navigation (optional for current page) */
  href?: string;
  /** Icon component or JSX element (optional) */
  icon?: JSX.Element;
  /** Whether this is the current/active page */
  isActive?: boolean;
}

/**
 * Breadcrumbs component props
 */
export interface BreadcrumbsProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Custom separator between breadcrumbs (default: chevron) */
  separator?: "chevron" | "slash" | "arrow" | "dot";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  class?: string;
  /** Maximum width before scrolling (optional) */
  maxWidth?: string;
  /** Show home icon on first item */
  showHomeIcon?: boolean;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

/**
 * Route configuration for automatic breadcrumb generation
 */
export interface RouteConfig {
  /** Route path pattern */
  path: string;
  /** Display label or function to generate label */
  label: string | ((params: Record<string, string>) => string);
  /** Parent route path */
  parent?: string;
  /** Icon for this route (optional) */
  icon?: JSX.Element;
}
