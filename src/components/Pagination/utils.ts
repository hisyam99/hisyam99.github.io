import type { PaginationInfo, PaginationRange, PageButton } from "./types";

/**
 * Calculate pagination range with ellipsis logic
 *
 * @param currentPage - Current page number (1-based)
 * @param totalPages - Total number of pages
 * @param maxPageButtons - Maximum number of page buttons to show
 * @returns Pagination range configuration
 *
 * @example
 * calculatePaginationRange(1, 10, 5) // { start: 1, end: 5, showLeftEllipsis: false, showRightEllipsis: true }
 * calculatePaginationRange(5, 10, 5) // { start: 3, end: 7, showLeftEllipsis: true, showRightEllipsis: true }
 * calculatePaginationRange(10, 10, 5) // { start: 6, end: 10, showLeftEllipsis: true, showRightEllipsis: false }
 */
export const calculatePaginationRange = (
  currentPage: number,
  totalPages: number,
  maxPageButtons: number = 5,
): PaginationRange => {
  // If total pages less than max buttons, show all pages
  if (totalPages <= maxPageButtons) {
    return {
      start: 1,
      end: totalPages,
      showLeftEllipsis: false,
      showRightEllipsis: false,
    };
  }

  // Calculate the number of buttons to show on each side of current page
  const halfButtons = Math.floor(maxPageButtons / 2);

  // Calculate start and end positions
  let start = Math.max(1, currentPage - halfButtons);
  let end = Math.min(totalPages, currentPage + halfButtons);

  // Adjust if we're near the beginning
  if (currentPage <= halfButtons) {
    end = maxPageButtons;
  }

  // Adjust if we're near the end
  if (currentPage >= totalPages - halfButtons) {
    start = totalPages - maxPageButtons + 1;
  }

  return {
    start: Math.max(1, start),
    end: Math.min(totalPages, end),
    showLeftEllipsis: start > 1,
    showRightEllipsis: end < totalPages,
  };
};

/**
 * Generate array of page buttons with ellipsis
 *
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxPageButtons - Maximum number of page buttons
 * @returns Array of page button configurations
 */
export const generatePageButtons = (
  currentPage: number,
  totalPages: number,
  maxPageButtons: number = 5,
): PageButton[] => {
  const range = calculatePaginationRange(
    currentPage,
    totalPages,
    maxPageButtons,
  );
  const buttons: PageButton[] = [];

  // Add left ellipsis if needed
  if (range.showLeftEllipsis) {
    buttons.push({
      page: 1,
      label: "...",
      isActive: false,
      isDisabled: true,
      isEllipsis: true,
    });
  }

  // Add page number buttons
  for (let i = range.start; i <= range.end; i++) {
    buttons.push({
      page: i,
      label: i,
      isActive: i === currentPage,
      isDisabled: false,
      isEllipsis: false,
    });
  }

  // Add right ellipsis if needed
  if (range.showRightEllipsis) {
    buttons.push({
      page: totalPages,
      label: "...",
      isActive: false,
      isDisabled: true,
      isEllipsis: true,
    });
  }

  return buttons;
};

/**
 * Build URL with pagination parameters
 *
 * @param baseUrl - Base URL path
 * @param page - Page number
 * @param queryParams - Additional query parameters
 * @returns Complete URL with query parameters
 *
 * @example
 * buildPaginationUrl("/blog", 2) // "/blog?page=2"
 * buildPaginationUrl("/admin/blogs", 3, { status: "published" }) // "/admin/blogs?page=3&status=published"
 */
export const buildPaginationUrl = (
  baseUrl: string,
  page: number,
  queryParams?: Record<string, string>,
): string => {
  const params = new URLSearchParams(queryParams);
  params.set("page", String(page));
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Parse page number from URL
 *
 * @param url - URL or search params string
 * @param defaultPage - Default page number if not found
 * @returns Parsed page number
 */
export const parsePageFromUrl = (
  url: string | URLSearchParams,
  defaultPage: number = 1,
): number => {
  const params = typeof url === "string" ? new URLSearchParams(url) : url;
  const pageStr = params.get("page");
  const page = pageStr ? parseInt(pageStr, 10) : defaultPage;
  return isNaN(page) || page < 1 ? defaultPage : page;
};

/**
 * Calculate pagination info for display
 *
 * @param pagination - Pagination information
 * @returns Human-readable pagination info
 */
export const getPaginationInfo = (pagination: PaginationInfo): string => {
  const start = (pagination.page - 1) * pagination.pageSize + 1;
  const end = Math.min(pagination.page * pagination.pageSize, pagination.total);
  return `Showing ${start}-${end} of ${pagination.total}`;
};

/**
 * Calculate short pagination info
 *
 * @param pagination - Pagination information
 * @returns Short pagination info
 */
export const getShortPaginationInfo = (pagination: PaginationInfo): string => {
  return `Page ${pagination.page} of ${pagination.totalPages}`;
};

/**
 * Check if page number is valid
 *
 * @param page - Page number to check
 * @param totalPages - Total number of pages
 * @returns True if page is valid
 */
export const isValidPage = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages && !isNaN(page);
};

/**
 * Clamp page number to valid range
 *
 * @param page - Page number to clamp
 * @param totalPages - Total number of pages
 * @returns Clamped page number
 */
export const clampPage = (page: number, totalPages: number): number => {
  return Math.max(1, Math.min(page, totalPages));
};

/**
 * Calculate total pages from total items and page size
 *
 * @param total - Total number of items
 * @param pageSize - Number of items per page
 * @returns Total number of pages
 */
export const calculateTotalPages = (
  total: number,
  pageSize: number,
): number => {
  return Math.ceil(total / pageSize);
};

/**
 * Get page numbers for simple pagination (without ellipsis)
 *
 * @param totalPages - Total number of pages
 * @returns Array of all page numbers
 */
export const getSimplePageNumbers = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

/**
 * Format pagination info for screen readers
 *
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @returns Accessible pagination description
 */
export const getAccessiblePaginationLabel = (
  currentPage: number,
  totalPages: number,
): string => {
  return `Page ${currentPage} of ${totalPages}`;
};

/**
 * Merge query parameters preserving existing ones
 *
 * @param currentParams - Current URL search params
 * @param newParams - New parameters to add/update
 * @returns Merged query parameters object
 */
export const mergeQueryParams = (
  currentParams: URLSearchParams,
  newParams: Record<string, string>,
): Record<string, string> => {
  const merged: Record<string, string> = {};

  currentParams.forEach((value, key) => {
    if (key !== "page") {
      merged[key] = value;
    }
  });

  Object.entries(newParams).forEach(([key, value]) => {
    merged[key] = value;
  });

  return merged;
};
