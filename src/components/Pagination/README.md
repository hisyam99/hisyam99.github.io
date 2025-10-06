# Pagination Component

A reusable, accessible pagination component for Qwik applications, styled with DaisyUI.

## Features

- 🎯 **Multiple Variants**: Default, primary, outline, and ghost styles
- 📏 **Size Options**: xs, sm, md, lg, xl
- 🔢 **Smart Page Numbers**: Automatic ellipsis for long page lists
- 🎨 **DaisyUI Styling**: Native theme support with all DaisyUI themes
- ♿ **Fully Accessible**: WCAG 2.1 compliant with ARIA labels
- 📱 **Responsive**: Optimized for mobile, tablet, and desktop
- 🔗 **URL or Client-Side**: Support for both navigation modes
- 🎣 **Custom Hooks**: State management with `usePagination`
- 🚀 **Performance**: SSR compatible, minimal bundle size
- 📊 **Page Info Display**: Shows "X-Y of Z items"

## Installation

The component is already included in the project. Import from:

```tsx
import { Pagination } from "~/components/Pagination";
```

## Basic Usage

### Simple Pagination (URL-based)

```tsx
import { component$ } from "@builder.io/qwik";
import { Pagination } from "~/components/Pagination";

export default component$(() => {
  const pagination = {
    page: 1,
    pageSize: 10,
    total: 100,
    totalPages: 10,
  };

  return (
    <div>
      {/* Your content */}
      <Pagination pagination={pagination} baseUrl="/blog" />
    </div>
  );
});
```

### With Custom Styling

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/admin/blogs"
  size="sm"
  variant="outline"
  showPageNumbers={true}
  maxPageButtons={5}
  showFirstLast={false}
  showPageInfo={true}
  align="center"
/>
```

### Client-Side Navigation

```tsx
import { component$, $ } from "@builder.io/qwik";
import { Pagination } from "~/components/Pagination";

export default component$(() => {
  const pagination = {
    page: 1,
    pageSize: 10,
    total: 100,
    totalPages: 10,
  };

  const handlePageChange = $((page: number) => {
    console.log("Page changed to:", page);
    // Fetch new data or update state
  });

  return (
    <Pagination
      pagination={pagination}
      baseUrl="/data"
      clientSide={true}
      onPageChange={handlePageChange}
    />
  );
});
```

## Props Reference

### PaginationProps

| Prop              | Type                                             | Default      | Description                 |
| ----------------- | ------------------------------------------------ | ------------ | --------------------------- |
| `pagination`      | `PaginationInfo`                                 | **Required** | Pagination data from API    |
| `baseUrl`         | `string`                                         | **Required** | Base URL for navigation     |
| `queryParams`     | `Record<string, string>`                         | `{}`         | Additional query parameters |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | `'md'`       | Button size                 |
| `variant`         | `'default' \| 'primary' \| 'outline' \| 'ghost'` | `'default'`  | Button style                |
| `showPageNumbers` | `boolean`                                        | `true`       | Show page number buttons    |
| `maxPageButtons`  | `number`                                         | `5`          | Max page buttons to show    |
| `showFirstLast`   | `boolean`                                        | `false`      | Show first/last buttons     |
| `showPageInfo`    | `boolean`                                        | `true`       | Show "X-Y of Z" text        |
| `prevText`        | `string \| JSX.Element`                          | `'«'`        | Previous button text        |
| `nextText`        | `string \| JSX.Element`                          | `'»'`        | Next button text            |
| `firstText`       | `string \| JSX.Element`                          | `'««'`       | First button text           |
| `lastText`        | `string \| JSX.Element`                          | `'»»'`       | Last button text            |
| `class`           | `string`                                         | `''`         | Additional CSS classes      |
| `align`           | `'left' \| 'center' \| 'right'`                  | `'center'`   | Alignment                   |
| `onPageChange`    | `QRL<(page: number) => void>`                    | -            | Page change callback        |
| `clientSide`      | `boolean`                                        | `false`      | Use client-side navigation  |
| `loading`         | `boolean`                                        | `false`      | Show loading state          |

### PaginationInfo

```typescript
interface PaginationInfo {
  page: number; // Current page (1-based)
  pageSize: number; // Items per page
  total: number; // Total items
  totalPages: number; // Total pages
}
```

## Examples

### Blog Listing Page

```tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Pagination } from "~/components/Pagination";
import { getPublishedBlogs } from "~/services/blog";

export const useBlogLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 12;

  const result = await getPublishedBlogs({ page, pageSize });
  return result;
});

export default component$(() => {
  const blogData = useBlogLoader();
  const { data: blogs, pagination } = blogData.value;

  return (
    <div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.id}>{/* Blog card */}</article>
        ))}
      </div>

      <Pagination
        pagination={pagination}
        baseUrl="/blog"
        size="md"
        variant="outline"
        align="center"
      />
    </div>
  );
});
```

### Admin Table with Filters

```tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Pagination } from "~/components/Pagination";

export const useDataLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const status = url.searchParams.get("status") || "all";

  return await getData({ page, pageSize: 20, status });
});

export default component$(() => {
  const data = useDataLoader();
  const location = useLocation();
  const { pagination } = data.value;

  // Preserve filter parameters
  const queryParams = {
    status: location.url.searchParams.get("status") || "all",
  };

  return (
    <div>
      {/* Table content */}

      <Pagination
        pagination={pagination}
        baseUrl="/admin/data"
        queryParams={queryParams}
        size="sm"
        showPageInfo={true}
      />
    </div>
  );
});
```

### Different Size Variants

```tsx
// Extra Small - Compact layouts
<Pagination pagination={pagination} baseUrl="/data" size="xs" />

// Small - Admin panels
<Pagination pagination={pagination} baseUrl="/data" size="sm" />

// Medium (default) - Standard pages
<Pagination pagination={pagination} baseUrl="/data" size="md" />

// Large - Emphasis
<Pagination pagination={pagination} baseUrl="/data" size="lg" />

// Extra Large - Hero sections
<Pagination pagination={pagination} baseUrl="/data" size="xl" />
```

### Different Style Variants

```tsx
// Default - Standard buttons
<Pagination pagination={pagination} baseUrl="/data" variant="default" />

// Primary - Highlighted
<Pagination pagination={pagination} baseUrl="/data" variant="primary" />

// Outline - Minimal
<Pagination pagination={pagination} baseUrl="/data" variant="outline" />

// Ghost - Subtle
<Pagination pagination={pagination} baseUrl="/data" variant="ghost" />
```

### With First/Last Buttons

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/data"
  showFirstLast={true}
  firstText="First"
  lastText="Last"
/>
```

### Custom Button Text

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/data"
  prevText="Previous"
  nextText="Next"
  firstText="← First"
  lastText="Last →"
/>
```

### With Icons

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/data"
  prevText={
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  }
  nextText={
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  }
/>
```

### Loading State

```tsx
import { component$, useSignal } from "@builder.io/qwik";
import { Pagination } from "~/components/Pagination";

export default component$(() => {
  const loading = useSignal(false);

  return (
    <Pagination
      pagination={pagination}
      baseUrl="/data"
      loading={loading.value}
    />
  );
});
```

## Using the Hook

### usePagination - Full Control

```tsx
import { component$ } from "@builder.io/qwik";
import { usePagination } from "~/components/Pagination";

export default component$(() => {
  const pagination = usePagination({
    totalPages: 10,
    initialPage: 1,
    syncWithUrl: true,
    onPageChange: $((page) => {
      console.log("Page changed:", page);
    }),
  });

  return (
    <div>
      <div class="join">
        <button
          class="join-item btn"
          onClick$={pagination.prevPage}
          disabled={!pagination.canGoPrev}
        >
          Previous
        </button>
        <button class="join-item btn btn-active">
          Page {pagination.currentPage}
        </button>
        <button
          class="join-item btn"
          onClick$={pagination.nextPage}
          disabled={!pagination.canGoNext}
        >
          Next
        </button>
      </div>
    </div>
  );
});
```

### useSimplePagination - No URL Sync

```tsx
import { component$ } from "@builder.io/qwik";
import { useSimplePagination } from "~/components/Pagination";

export default component$(() => {
  const pagination = useSimplePagination(10, 1);

  return (
    <div>
      <button onClick$={pagination.prevPage} disabled={!pagination.canGoPrev}>
        Previous
      </button>
      <span>
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <button onClick$={pagination.nextPage} disabled={!pagination.canGoNext}>
        Next
      </button>
    </div>
  );
});
```

### useUrlPagination - Auto URL Sync

```tsx
import { component$ } from "@builder.io/qwik";
import { useUrlPagination } from "~/components/Pagination";

export default component$(() => {
  const pagination = useUrlPagination(10);

  // Automatically syncs with ?page=X in URL
  return (
    <div>
      <span>Current page: {pagination.currentPage}</span>
      <button onClick$={pagination.goToPage(5)}>Go to page 5</button>
    </div>
  );
});
```

## Utility Functions

### Calculate Pagination Range

```tsx
import { calculatePaginationRange } from "~/components/Pagination";

const range = calculatePaginationRange(5, 10, 5);
// { start: 3, end: 7, showLeftEllipsis: true, showRightEllipsis: true }
```

### Generate Page Buttons

```tsx
import { generatePageButtons } from "~/components/Pagination";

const buttons = generatePageButtons(5, 10, 5);
// Array of PageButton objects with ellipsis
```

### Build Pagination URL

```tsx
import { buildPaginationUrl } from "~/components/Pagination";

const url = buildPaginationUrl("/blog", 2, { category: "tech" });
// "/blog?page=2&category=tech"
```

### Get Pagination Info

```tsx
import { getPaginationInfo } from "~/components/Pagination";

const info = getPaginationInfo({
  page: 2,
  pageSize: 10,
  total: 95,
  totalPages: 10,
});
// "Showing 11-20 of 95"
```

## Best Practices

### 1. Consistent Styling

Use the same size and variant across your application:

```tsx
// Good: Consistent across admin pages
<Pagination size="sm" variant="outline" />

// Bad: Mixed sizes
<Pagination size="lg" /> // On one page
<Pagination size="xs" /> // On another
```

### 2. Preserve Query Parameters

Always preserve filters and search when paginating:

```tsx
const queryParams = {
  search: location.url.searchParams.get("search") || "",
  status: location.url.searchParams.get("status") || "",
};

<Pagination
  pagination={pagination}
  baseUrl="/data"
  queryParams={queryParams}
/>;
```

### 3. Loading States

Show loading state when fetching new data:

```tsx
const loading = useSignal(false);

const handlePageChange = $(async (page: number) => {
  loading.value = true;
  await fetchData(page);
  loading.value = false;
});

<Pagination loading={loading.value} onPageChange={handlePageChange} />;
```

### 4. Mobile Optimization

Use smaller sizes and fewer buttons on mobile:

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/data"
  size="sm"
  maxPageButtons={3}
  showPageInfo={false}
  class="sm:hidden"
/>

<Pagination
  pagination={pagination}
  baseUrl="/data"
  size="md"
  maxPageButtons={5}
  class="hidden sm:flex"
/>
```

### 5. First Page Check

Don't render pagination if on page 1 with no other pages:

```tsx
{
  pagination.totalPages > 1 && (
    <Pagination pagination={pagination} baseUrl="/data" />
  );
}
```

## Accessibility

The component follows WCAG 2.1 Level AA guidelines:

- ✅ Semantic `<nav>` element with `role="navigation"`
- ✅ ARIA labels for all buttons
- ✅ Current page marked with `aria-current="page"`
- ✅ Disabled state for unavailable actions
- ✅ Screen reader announcements (`aria-live`)
- ✅ Keyboard navigable
- ✅ Focus indicators

### Testing with Screen Readers

```bash
# Test with screen reader (NVDA/JAWS/VoiceOver)
# 1. Navigate to pagination
# 2. Verify "Pagination navigation" is announced
# 3. Tab through buttons
# 4. Verify each button purpose is announced
# 5. Verify current page is announced as "current"
```

## Styling

### Default Styles

Uses DaisyUI button classes:

- `btn` - Base button style
- `btn-active` - Active page highlight
- `btn-disabled` - Disabled state
- `join` - Group buttons together
- `join-item` - Individual button in group

### Custom Styling

Add custom classes via the `class` prop:

```tsx
<Pagination
  pagination={pagination}
  baseUrl="/data"
  class="my-4 bg-base-200 p-4 rounded-lg"
/>
```

### Theme Integration

Works with all DaisyUI themes:

```tsx
// Automatically adapts to theme
<html data-theme="dark">
  <Pagination pagination={pagination} baseUrl="/data" />
</html>
```

## Performance

### Bundle Size

- Component: ~3KB (minified + gzipped)
- Utilities: ~1KB (minified + gzipped)
- Total: ~4KB

### Optimization Tips

1. **SSR Compatible**: Renders on server, no hydration needed
2. **Lazy Loading**: Uses Qwik's `component$` for code splitting
3. **Minimal Re-renders**: Only updates when props change
4. **No Dependencies**: Self-contained, no external deps

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  PaginationInfo,
  PaginationProps,
  PaginationState,
  PageButton,
  UsePaginationOptions,
} from "~/components/Pagination";
```

## Troubleshooting

### Pagination not showing

Check that:

- `totalPages > 1`
- `total > 0`
- Pagination prop is valid

```tsx
console.log("Pagination:", pagination);
```

### Wrong page numbers

Ensure API returns 1-based page numbers:

```tsx
// Correct (1-based)
{ page: 1, pageSize: 10, total: 100, totalPages: 10 }

// Incorrect (0-based)
{ page: 0, pageSize: 10, total: 100, totalPages: 10 }
```

### Query params not preserved

Pass current params explicitly:

```tsx
const location = useLocation();
const queryParams = Object.fromEntries(location.url.searchParams.entries());

<Pagination queryParams={queryParams} />;
```

### Buttons too small on mobile

Use responsive sizing:

```tsx
<Pagination size="sm" class="btn-sm sm:btn-md" />
```

## Related Components

- `Link` - For navigation links
- `useLocation` - For accessing route information
- `useNavigate` - For programmatic navigation
- `Breadcrumbs` - For hierarchical navigation

## License

Part of the project's codebase. See project license.

## Support

For issues or questions:

- Check this documentation
- Review examples in the codebase
- Check TypeScript types in `types.ts`
- Test with different themes and screen sizes
