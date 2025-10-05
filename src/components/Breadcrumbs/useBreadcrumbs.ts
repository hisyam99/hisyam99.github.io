import { useLocation } from "@builder.io/qwik-city";
import type { JSX } from "@builder.io/qwik";
import type { BreadcrumbItem } from "./types";

/**
 * Route configuration map for automatic breadcrumb generation
 * Maps route patterns to their display labels and metadata
 */
const ROUTE_CONFIG: Record<string, { label: string; icon?: JSX.Element }> = {
  // Public routes
  "/": { label: "Home" },
  "/blog": { label: "Blog" },
  "/profile": { label: "Profile" },
  "/schedule": { label: "Schedule" },

  // Auth routes
  "/auth/login": { label: "Login" },
  "/auth/register": { label: "Register" },

  // Admin routes
  "/admin": { label: "Admin Dashboard" },
  "/admin/blogs": { label: "Blogs" },
  "/admin/blogs/new": { label: "Create Blog" },
  "/admin/categories": { label: "Categories" },
  "/admin/categories/new": { label: "Create Category" },
  "/admin/projects": { label: "Projects" },
  "/admin/projects/new": { label: "Create Project" },
  "/admin/resume-contents": { label: "Resume Contents" },
  "/admin/resume-contents/new": { label: "Create Resume Content" },
  "/admin/users": { label: "Users" },
  "/admin/users/new": { label: "Create User" },
};

/**
 * Special patterns for dynamic routes
 */
const DYNAMIC_ROUTE_PATTERNS: Record<
  string,
  (params: Record<string, string>) => string
> = {
  "/blog/:slug": (params) => params.slug?.replace(/-/g, " ") || "Post",
  "/admin/blogs/:id/edit": () => "Edit Blog",
  "/admin/categories/:id/edit": () => "Edit Category",
  "/admin/projects/:id/edit": () => "Edit Project",
  "/admin/resume-contents/:id/edit": () => "Edit Resume Content",
  "/admin/users/:id/edit": () => "Edit User",
};

/**
 * Capitalizes the first letter of a string
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a path segment into a readable label
 */
const formatSegment = (segment: string): string => {
  // Remove hyphens and underscores, replace with spaces
  const formatted = segment.replace(/[-_]/g, " ");
  // Capitalize each word
  return formatted
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

/**
 * Generates breadcrumb label from route config or path segment
 */
const getLabel = (
  path: string,
  segment: string,
  params: Record<string, string>,
): string => {
  // Check exact match in route config
  if (ROUTE_CONFIG[path]) {
    return ROUTE_CONFIG[path].label;
  }

  // Check dynamic route patterns
  for (const [pattern, labelFn] of Object.entries(DYNAMIC_ROUTE_PATTERNS)) {
    const patternRegex = new RegExp(
      "^" + pattern.replace(/:\w+/g, "[^/]+") + "$",
    );
    if (patternRegex.test(path)) {
      return labelFn(params);
    }
  }

  // Check if segment is a UUID or ID
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      segment,
    )
  ) {
    return "Details";
  }

  // Default: format the segment
  return formatSegment(segment);
};

/**
 * Custom hook for generating breadcrumbs from the current route
 *
 * @returns Array of breadcrumb items based on current location
 *
 * @example
 * ```tsx
 * const breadcrumbs = useBreadcrumbs();
 * return <Breadcrumbs items={breadcrumbs.value} />;
 * ```
 */
export const useBreadcrumbs = () => {
  const location = useLocation();

  // Generate breadcrumbs from pathname
  const pathname = location.url.pathname;
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [];

  // Always add home
  items.push({
    label: "Home",
    href: "/",
    isActive: pathname === "/",
  });

  // Build breadcrumbs from path segments
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Skip if this is an edit/new action on the last segment (will be handled by pattern)
    if (isLast && (segment === "edit" || segment === "new")) {
      return;
    }

    const label = getLabel(currentPath, segment, location.params);

    items.push({
      label,
      href: isLast ? undefined : currentPath,
      isActive: isLast,
    });
  });

  // Handle edit/new suffixes
  if (pathname.endsWith("/edit")) {
    const editPath = pathname;
    const label = getLabel(editPath, "edit", location.params);
    items.push({
      label,
      isActive: true,
    });
  } else if (pathname.endsWith("/new")) {
    const newPath = pathname;
    const label = getLabel(newPath, "new", location.params);
    items.push({
      label,
      isActive: true,
    });
  }

  return items;
};

/**
 * Helper function to create manual breadcrumbs
 * Use this when you need custom breadcrumb items that differ from the automatic generation
 *
 * @param items - Array of breadcrumb items
 * @returns The same array (for type safety and consistency)
 *
 * @example
 * ```tsx
 * const breadcrumbs = createBreadcrumbs([
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Product Details', isActive: true }
 * ]);
 * ```
 */
export const createBreadcrumbs = (
  items: BreadcrumbItem[],
): BreadcrumbItem[] => {
  return items;
};

/**
 * Helper to merge automatic breadcrumbs with custom items
 * Useful when you want to keep automatic generation but customize specific items
 *
 * @param autoBreadcrumbs - Automatically generated breadcrumbs
 * @param customItems - Custom breadcrumb items to merge
 * @returns Merged breadcrumb array
 *
 * @example
 * ```tsx
 * const auto = useBreadcrumbs();
 * const breadcrumbs = mergeBreadcrumbs(auto.value, [
 *   { label: 'Custom Item', href: '/custom' }
 * ]);
 * ```
 */
export const mergeBreadcrumbs = (
  autoBreadcrumbs: BreadcrumbItem[],
  customItems: BreadcrumbItem[],
): BreadcrumbItem[] => {
  return [...autoBreadcrumbs.slice(0, -1), ...customItems];
};
