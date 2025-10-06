import type { JSX, QRL } from "@builder.io/qwik";

/**
 * Pagination information from the API
 */
export interface PaginationInfo {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Pagination component props
 */
export interface PaginationProps {
  /** Pagination information */
  pagination: PaginationInfo;
  /** Base URL for navigation (e.g., "/blog" or "/admin/blogs") */
  baseUrl: string;
  /** Additional query parameters to preserve */
  queryParams?: Record<string, string>;
  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Button style variant */
  variant?: "default" | "primary" | "outline" | "ghost";
  /** Show page numbers or just prev/next */
  showPageNumbers?: boolean;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show page info text */
  showPageInfo?: boolean;
  /** Custom text for previous button */
  prevText?: string | JSX.Element;
  /** Custom text for next button */
  nextText?: string | JSX.Element;
  /** Custom text for first button */
  firstText?: string | JSX.Element;
  /** Custom text for last button */
  lastText?: string | JSX.Element;
  /** Additional CSS classes */
  class?: string;
  /** Align pagination (left, center, right) */
  align?: "left" | "center" | "right";
  /** Callback when page changes (for client-side handling) */
  onPageChange?: QRL<(page: number) => void>;
  /** Use client-side navigation instead of links */
  clientSide?: boolean;
  /** Show loading state */
  loading?: boolean;
}

/**
 * Page button configuration
 */
export interface PageButton {
  /** Page number */
  page: number;
  /** Display label */
  label: string | number;
  /** Is current page */
  isActive: boolean;
  /** Is disabled */
  isDisabled: boolean;
  /** Is ellipsis */
  isEllipsis: boolean;
}

/**
 * Pagination state for client-side usage
 */
export interface PaginationState {
  /** Current page */
  currentPage: number;
  /** Total pages */
  totalPages: number;
  /** Go to specific page */
  goToPage: (page: number) => void;
  /** Go to next page */
  nextPage: () => void;
  /** Go to previous page */
  prevPage: () => void;
  /** Go to first page */
  firstPage: () => void;
  /** Go to last page */
  lastPage: () => void;
  /** Check if can go to next page */
  canGoNext: boolean;
  /** Check if can go to previous page */
  canGoPrev: boolean;
}

/**
 * Options for usePagination hook
 */
export interface UsePaginationOptions {
  /** Initial page number */
  initialPage?: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange?: QRL<(page: number) => void>;
  /** Enable URL sync */
  syncWithUrl?: boolean;
  /** URL parameter name for page */
  pageParam?: string;
}

/**
 * Pagination range configuration
 */
export interface PaginationRange {
  /** Start page number */
  start: number;
  /** End page number */
  end: number;
  /** Show left ellipsis */
  showLeftEllipsis: boolean;
  /** Show right ellipsis */
  showRightEllipsis: boolean;
}
