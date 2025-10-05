import { component$, type JSXOutput } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { BreadcrumbsProps } from "./types";

/**
 * Breadcrumbs Component
 *
 * A reusable breadcrumb navigation component following DaisyUI patterns.
 * Provides visual navigation trail showing the user's location in the site hierarchy.
 *
 * Features:
 * - Responsive design with optional scrolling for long paths
 * - Multiple separator styles
 * - Icon support
 * - Accessibility features (ARIA labels, semantic HTML)
 * - DaisyUI styling
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Admin', href: '/admin' },
 *     { label: 'Categories', isActive: true }
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs = component$<BreadcrumbsProps>(
  ({
    items,
    separator = "chevron",
    size = "md",
    class: className = "",
    maxWidth,
    showHomeIcon = true,
    ariaLabel = "Breadcrumb navigation",
  }) => {
    // Size classes mapping
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    // Separator SVG components
    const separators: Record<string, JSXOutput> = {
      chevron: (
        <svg
          class="w-4 h-4 mx-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      ),
      slash: (
        <span class="mx-2 text-base-content/40" aria-hidden="true">
          /
        </span>
      ),
      arrow: (
        <svg
          class="w-4 h-4 mx-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      ),
      dot: (
        <span class="mx-2 text-base-content/40" aria-hidden="true">
          •
        </span>
      ),
    };

    // Home icon SVG
    const HomeIcon = (
      <svg
        class="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    );

    // Filter out invalid items
    const validItems = items.filter((item) => item && item.label);

    if (validItems.length === 0) {
      return null;
    }

    return (
      <nav
        aria-label={ariaLabel}
        class={`breadcrumbs ${sizeClasses[size]} ${className}`}
        style={maxWidth ? `max-width: ${maxWidth}` : undefined}
      >
        <ul class="flex items-center flex-wrap">
          {validItems.map((item, index) => {
            const isLast = index === validItems.length - 1;
            const isFirst = index === 0;
            const shouldShowHomeIcon =
              isFirst && showHomeIcon && item.href === "/";

            return (
              <li
                key={`${item.href || item.label}-${index}`}
                class="flex items-center"
              >
                {/* Breadcrumb Item */}
                {item.href && !item.isActive ? (
                  <Link
                    href={item.href}
                    class="inline-flex items-center hover:text-primary transition-colors"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {shouldShowHomeIcon && HomeIcon}
                    {item.icon && !shouldShowHomeIcon && (
                      <span class="mr-1" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    class={`inline-flex items-center ${
                      item.isActive || isLast
                        ? "text-base-content font-semibold"
                        : "text-base-content/70"
                    }`}
                    aria-current={isLast || item.isActive ? "page" : undefined}
                  >
                    {shouldShowHomeIcon && HomeIcon}
                    {item.icon && !shouldShowHomeIcon && (
                      <span class="mr-1" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <span class="flex items-center text-base-content/40">
                    {separators[separator]}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);
