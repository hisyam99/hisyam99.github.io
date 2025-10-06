import { component$, $, type JSXOutput } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { PaginationProps } from "./types";
import {
  generatePageButtons,
  buildPaginationUrl,
  getPaginationInfo,
  getShortPaginationInfo,
  getAccessiblePaginationLabel,
} from "./utils";

/**
 * Pagination Component
 *
 * A reusable pagination component following DaisyUI patterns and Qwik best practices.
 * Provides navigation through paginated data with customizable appearance and behavior.
 *
 * Features:
 * - Multiple size variants (xs, sm, md, lg, xl)
 * - Multiple style variants (default, primary, outline, ghost)
 * - Page number buttons with ellipsis
 * - First/Last page navigation
 * - Previous/Next navigation
 * - Page info display
 * - Responsive design
 * - Accessibility features (ARIA labels)
 * - URL-based or client-side navigation
 *
 * @example
 * ```tsx
 * <Pagination
 *   pagination={{ page: 1, pageSize: 10, total: 100, totalPages: 10 }}
 *   baseUrl="/blog"
 * />
 * ```
 */
export const Pagination = component$<PaginationProps>(
  ({
    pagination,
    baseUrl,
    queryParams = {},
    size = "md",
    variant = "default",
    showPageNumbers = true,
    maxPageButtons = 5,
    showFirstLast = false,
    showPageInfo = true,
    prevText = "«",
    nextText = "»",
    firstText = "««",
    lastText = "»»",
    class: className = "",
    align = "center",
    onPageChange,
    clientSide = false,
    loading = false,
  }) => {
    const { page, totalPages, total } = pagination;

    // Don't render if only one page or no data
    if (totalPages <= 1 || total === 0) {
      return null;
    }

    // Size classes
    const sizeClasses = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    };

    // Variant classes
    const variantClasses = {
      default: "",
      primary: "btn-primary",
      outline: "btn-outline",
      ghost: "btn-ghost",
    };

    // Alignment classes
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    const btnSize = sizeClasses[size];
    const btnVariant = variantClasses[variant];
    const alignClass = alignClasses[align];

    // Navigation checks
    const canGoPrev = page > 1;
    const canGoNext = page < totalPages;

    // Generate page buttons
    const pageButtons = showPageNumbers
      ? generatePageButtons(page, totalPages, maxPageButtons)
      : [];

    // Build URL helper
    const getPageUrl = (pageNum: number): string => {
      return buildPaginationUrl(baseUrl, pageNum, queryParams);
    };

    // Handle client-side page change
    const handlePageChange = $((pageNum: number) => {
      if (onPageChange) {
        onPageChange(pageNum);
      }
    });

    // Render navigation button (Link or button)
    const NavButton = ({
      pageNum,
      isActive = false,
      isDisabled = false,
      children,
      ariaLabel,
    }: {
      pageNum: number;
      isActive?: boolean;
      isDisabled?: boolean;
      children: JSXOutput;
      ariaLabel?: string;
    }) => {
      const buttonClasses = [
        "join-item",
        "btn",
        btnSize,
        btnVariant,
        isActive && "btn-active",
        isDisabled && "btn-disabled",
        loading && "loading",
      ]
        .filter(Boolean)
        .join(" ");

      if (clientSide) {
        return (
          <button
            class={buttonClasses}
            onClick$={() => !isDisabled && handlePageChange(pageNum)}
            disabled={isDisabled || loading}
            aria-label={ariaLabel}
            aria-current={isActive ? "page" : undefined}
          >
            {children}
          </button>
        );
      }

      if (isDisabled) {
        return (
          <button class={buttonClasses} disabled aria-label={ariaLabel}>
            {children}
          </button>
        );
      }

      return (
        <Link
          href={getPageUrl(pageNum)}
          class={buttonClasses}
          aria-label={ariaLabel}
          aria-current={isActive ? "page" : undefined}
        >
          {children}
        </Link>
      );
    };

    return (
      <nav
        class={`flex flex-col gap-4 ${alignClass} ${className}`}
        role="navigation"
        aria-label="Pagination navigation"
      >
        {/* Pagination Buttons */}
        <div class="join">
          {/* First Page Button */}
          {showFirstLast && (
            <NavButton
              pageNum={1}
              isDisabled={!canGoPrev || loading}
              ariaLabel="Go to first page"
            >
              {firstText}
            </NavButton>
          )}

          {/* Previous Page Button */}
          <NavButton
            pageNum={page - 1}
            isDisabled={!canGoPrev || loading}
            ariaLabel="Go to previous page"
          >
            {prevText}
          </NavButton>

          {/* Page Number Buttons */}
          {showPageNumbers &&
            pageButtons.map((btn, idx) => (
              <NavButton
                key={`${btn.page}-${idx}`}
                pageNum={btn.page}
                isActive={btn.isActive}
                isDisabled={btn.isEllipsis || loading}
                ariaLabel={
                  btn.isEllipsis ? "More pages" : `Go to page ${btn.page}`
                }
              >
                {btn.label}
              </NavButton>
            ))}

          {/* Next Page Button */}
          <NavButton
            pageNum={page + 1}
            isDisabled={!canGoNext || loading}
            ariaLabel="Go to next page"
          >
            {nextText}
          </NavButton>

          {/* Last Page Button */}
          {showFirstLast && (
            <NavButton
              pageNum={totalPages}
              isDisabled={!canGoNext || loading}
              ariaLabel="Go to last page"
            >
              {lastText}
            </NavButton>
          )}
        </div>

        {/* Page Info */}
        {showPageInfo && (
          <div class="text-sm text-base-content/70">
            <div class="hidden sm:block">{getPaginationInfo(pagination)}</div>
            <div class="sm:hidden">{getShortPaginationInfo(pagination)}</div>
          </div>
        )}

        {/* Screen Reader Only Text */}
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          {getAccessiblePaginationLabel(page, totalPages)}
        </div>
      </nav>
    );
  },
);
