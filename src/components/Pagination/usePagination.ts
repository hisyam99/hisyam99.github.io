import { useSignal, useTask$, $, useComputed$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { PaginationState, UsePaginationOptions } from "./types";
import { parsePageFromUrl, isValidPage, clampPage } from "./utils";

/**
 * Custom hook for managing pagination state
 *
 * Provides a complete pagination state management solution with support for:
 * - URL synchronization
 * - Client-side state management
 * - Navigation helpers
 * - Automatic URL updates
 *
 * @param options - Pagination configuration options
 * @returns Pagination state object
 *
 * @example
 * ```tsx
 * const pagination = usePagination({
 *   totalPages: 10,
 *   syncWithUrl: true,
 *   onPageChange: (page) => console.log('Page changed to:', page)
 * });
 *
 * return (
 *   <div>
 *     <button onClick$={pagination.prevPage}>Previous</button>
 *     <span>Page {pagination.currentPage}</span>
 *     <button onClick$={pagination.nextPage}>Next</button>
 *   </div>
 * );
 * ```
 */
export const usePagination = (
  options: UsePaginationOptions,
): PaginationState => {
  const {
    initialPage = 1,
    totalPages,
    onPageChange,
    syncWithUrl = false,
    pageParam = "page",
  } = options;

  const location = useLocation();
  const navigate = useNavigate();

  // Parse initial page from URL if syncing
  const urlPage = syncWithUrl
    ? parsePageFromUrl(location.url.searchParams, initialPage)
    : initialPage;

  // Initialize current page state
  const currentPage = useSignal(clampPage(urlPage, totalPages));

  // Sync with URL on mount and when URL changes
  useTask$(({ track }) => {
    if (!syncWithUrl) return;

    track(() => location.url.href);

    const pageFromUrl = parsePageFromUrl(
      location.url.searchParams,
      initialPage,
    );
    const validPage = clampPage(pageFromUrl, totalPages);

    if (currentPage.value !== validPage) {
      currentPage.value = validPage;
      if (onPageChange) {
        onPageChange(validPage);
      }
    }
  });

  /**
   * Navigate to a specific page
   */
  const goToPage = $((page: number) => {
    if (!isValidPage(page, totalPages)) {
      console.warn(`Invalid page number: ${page}`);
      return;
    }

    currentPage.value = page;
    if (onPageChange) {
      onPageChange(page);
    }

    if (syncWithUrl) {
      const params = new URLSearchParams(location.url.searchParams);
      params.set(pageParam, String(page));
      navigate(`${location.url.pathname}?${params.toString()}`);
    }
  });

  /**
   * Navigate to the next page
   */
  const nextPage = $(() => {
    if (currentPage.value < totalPages) {
      goToPage(currentPage.value + 1);
    }
  });

  /**
   * Navigate to the previous page
   */
  const prevPage = $(() => {
    if (currentPage.value > 1) {
      goToPage(currentPage.value - 1);
    }
  });

  /**
   * Navigate to the first page
   */
  const firstPage = $(() => {
    goToPage(1);
  });

  /**
   * Navigate to the last page
   */
  const lastPage = $(() => {
    goToPage(totalPages);
  });

  // Calculate navigation availability using computed signals
  const canGoNext = useComputed$(() => currentPage.value < totalPages);
  const canGoPrev = useComputed$(() => currentPage.value > 1);

  return {
    currentPage: currentPage.value,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    canGoNext: canGoNext.value,
    canGoPrev: canGoPrev.value,
  };
};

/**
 * Simple hook for managing pagination without URL sync
 *
 * @param totalPages - Total number of pages
 * @param initialPage - Initial page number (default: 1)
 * @returns Pagination state object
 *
 * @example
 * ```tsx
 * const pagination = useSimplePagination(10);
 *
 * return (
 *   <div>
 *     <button onClick$={pagination.prevPage} disabled={!pagination.canGoPrev}>
 *       Previous
 *     </button>
 *     <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
 *     <button onClick$={pagination.nextPage} disabled={!pagination.canGoNext}>
 *       Next
 *     </button>
 *   </div>
 * );
 * ```
 */
export const useSimplePagination = (
  totalPages: number,
  initialPage: number = 1,
): PaginationState => {
  return usePagination({
    totalPages,
    initialPage,
    syncWithUrl: false,
  });
};

/**
 * Hook for managing pagination with automatic URL synchronization
 *
 * @param totalPages - Total number of pages
 * @param pageParam - URL parameter name for page (default: "page")
 * @returns Pagination state object
 *
 * @example
 * ```tsx
 * const pagination = useUrlPagination(10);
 *
 * // Automatically syncs with ?page=X in URL
 * return (
 *   <div>
 *     <button onClick$={pagination.prevPage}>Previous</button>
 *     <span>Page {pagination.currentPage}</span>
 *     <button onClick$={pagination.nextPage}>Next</button>
 *   </div>
 * );
 * ```
 */
export const useUrlPagination = (
  totalPages: number,
  pageParam: string = "page",
): PaginationState => {
  return usePagination({
    totalPages,
    syncWithUrl: true,
    pageParam,
  });
};
