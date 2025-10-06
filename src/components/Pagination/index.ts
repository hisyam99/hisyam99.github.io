/**
 * Pagination Component
 *
 * A reusable pagination component following Qwik and DaisyUI best practices.
 * Provides navigation through paginated data with customizable appearance.
 *
 * @module components/Pagination
 */

export { Pagination } from "./Pagination";
export {
  usePagination,
  useSimplePagination,
  useUrlPagination,
} from "./usePagination";
export type {
  PaginationInfo,
  PaginationProps,
  PaginationState,
  PaginationRange,
  PageButton,
  UsePaginationOptions,
} from "./types";
export {
  calculatePaginationRange,
  generatePageButtons,
  buildPaginationUrl,
  parsePageFromUrl,
  getPaginationInfo,
  getShortPaginationInfo,
  isValidPage,
  clampPage,
  calculateTotalPages,
  getSimplePageNumbers,
  getAccessiblePaginationLabel,
  mergeQueryParams,
} from "./utils";
