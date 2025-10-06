# Pagination Quick Reference Card

## 🚀 Quick Start

```tsx
import { Pagination } from "~/components/Pagination";

<Pagination
  pagination={{ page: 1, pageSize: 10, total: 100, totalPages: 10 }}
  baseUrl="/blog"
/>;
```

## 📖 Common Patterns

### 1. URL-Based Pagination (Most Common)

```tsx
export const useDataLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  return await getData({ page, pageSize: 10 });
});

export default component$(() => {
  const data = useDataLoader();
  return <Pagination pagination={data.value.pagination} baseUrl="/data" />;
});
```

### 2. With Query Parameters

```tsx
const queryParams = {
  search: location.url.searchParams.get("search") || "",
  status: location.url.searchParams.get("status") || "",
};

<Pagination
  pagination={pagination}
  baseUrl="/admin/blogs"
  queryParams={queryParams}
/>;
```

### 3. Client-Side Navigation

```tsx
const handlePageChange = $((page: number) => {
  console.log("Page:", page);
  // Fetch new data
});

<Pagination
  pagination={pagination}
  baseUrl="/data"
  clientSide={true}
  onPageChange={handlePageChange}
/>;
```

## 🎨 Styling Options

```tsx
// Size
<Pagination size="xs" />  // Extra small
<Pagination size="sm" />  // Small (admin panels)
<Pagination size="md" />  // Medium (default)
<Pagination size="lg" />  // Large
<Pagination size="xl" />  // Extra large

// Variant
<Pagination variant="default" />  // Standard
<Pagination variant="primary" />  // Highlighted
<Pagination variant="outline" />  // Minimal (recommended)
<Pagination variant="ghost" />    // Subtle

// Alignment
<Pagination align="left" />
<Pagination align="center" />  // Default
<Pagination align="right" />
```

## 🔧 Common Configurations

```tsx
// Blog Listing (Public)
<Pagination
  pagination={pagination}
  baseUrl="/blog"
  size="md"
  variant="outline"
  showPageNumbers={true}
  maxPageButtons={5}
  showFirstLast={false}
  showPageInfo={true}
/>

// Admin Table (Compact)
<Pagination
  pagination={pagination}
  baseUrl="/admin/data"
  size="sm"
  variant="outline"
  showPageNumbers={true}
  maxPageButtons={7}
  showFirstLast={false}
  showPageInfo={true}
/>

// Mobile Optimized
<Pagination
  pagination={pagination}
  baseUrl="/data"
  size="sm"
  maxPageButtons={3}
  showPageInfo={false}
/>
```

## 📦 Props Quick Reference

| Prop              | Type             | Default      | Common Values             |
| ----------------- | ---------------- | ------------ | ------------------------- |
| `pagination`      | `PaginationInfo` | **Required** | From API                  |
| `baseUrl`         | `string`         | **Required** | `"/blog"`                 |
| `queryParams`     | `object`         | `{}`         | `{ status: "published" }` |
| `size`            | `string`         | `"md"`       | `"sm"`, `"md"`, `"lg"`    |
| `variant`         | `string`         | `"default"`  | `"outline"`, `"primary"`  |
| `showPageNumbers` | `boolean`        | `true`       | -                         |
| `maxPageButtons`  | `number`         | `5`          | `3`, `5`, `7`             |
| `showFirstLast`   | `boolean`        | `false`      | -                         |
| `showPageInfo`    | `boolean`        | `true`       | -                         |
| `align`           | `string`         | `"center"`   | `"left"`, `"right"`       |
| `clientSide`      | `boolean`        | `false`      | -                         |
| `loading`         | `boolean`        | `false`      | -                         |

## 🎣 Using Hooks

### usePagination (Full Control)

```tsx
const pagination = usePagination({
  totalPages: 10,
  syncWithUrl: true,
  onPageChange: $((page) => console.log(page)),
});

// Access: pagination.currentPage, pagination.nextPage(), etc.
```

### useSimplePagination (No URL Sync)

```tsx
const pagination = useSimplePagination(10, 1);
```

### useUrlPagination (Auto URL Sync)

```tsx
const pagination = useUrlPagination(10);
```

## 🛠️ Utility Functions

```tsx
import {
  buildPaginationUrl,
  getPaginationInfo,
  calculatePaginationRange,
} from "~/components/Pagination";

// Build URL
const url = buildPaginationUrl("/blog", 2, { status: "published" });
// Result: "/blog?page=2&status=published"

// Get info text
const info = getPaginationInfo(pagination);
// Result: "Showing 11-20 of 95"

// Calculate range
const range = calculatePaginationRange(5, 10, 5);
// Result: { start: 3, end: 7, ... }
```

## ✅ Best Practices

### ✅ Do

- Use `size="sm"` for admin panels
- Use `size="md"` for public pages
- Use `variant="outline"` for clean look
- Preserve query parameters
- Show page info for better UX
- Use consistent styling across app

### ❌ Don't

- Mix different sizes on same page
- Forget to preserve filters in queryParams
- Show pagination with only 1 page
- Use too many page buttons (keep 3-7)
- Ignore mobile optimization

## 📱 Responsive Patterns

```tsx
// Show different configs for mobile/desktop
<div class="sm:hidden">
  <Pagination
    pagination={pagination}
    baseUrl="/blog"
    size="sm"
    maxPageButtons={3}
    showPageInfo={false}
  />
</div>

<div class="hidden sm:block">
  <Pagination
    pagination={pagination}
    baseUrl="/blog"
    size="md"
    maxPageButtons={5}
    showPageInfo={true}
  />
</div>
```

## 🐛 Common Issues

### Not Showing?

```tsx
// Check these:
console.log("Total Pages:", pagination.totalPages); // Must be > 1
console.log("Total Items:", pagination.total); // Must be > 0
```

### Wrong Page?

```tsx
// Ensure 1-based indexing
{ page: 1, ... } // ✅ Correct
{ page: 0, ... } // ❌ Wrong
```

### Filters Not Preserved?

```tsx
// Pass queryParams explicitly
const queryParams = Object.fromEntries(location.url.searchParams.entries());
delete queryParams.page; // Remove page to avoid duplication

<Pagination queryParams={queryParams} />;
```

## 📍 File Locations

- Component: `src/components/Pagination/Pagination.tsx`
- Hook: `src/components/Pagination/usePagination.ts`
- Utils: `src/components/Pagination/utils.ts`
- Types: `src/components/Pagination/types.ts`
- Docs: `src/components/Pagination/README.md`

## 💡 Pro Tips

1. **Admin pages**: Use `size="sm"` and `variant="outline"`
2. **Public pages**: Use `size="md"` and `variant="outline"`
3. **Mobile**: Reduce `maxPageButtons` to 3
4. **Loading**: Pass `loading={true}` during fetch
5. **No results**: Don't render if `total === 0`

## 🔗 Integration Example

```tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Pagination } from "~/components/Pagination";

export const useDataLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 12;

  const result = await fetchData({ page, pageSize });
  return result; // { data: [...], pagination: {...} }
});

export default component$(() => {
  const data = useDataLoader();
  const { data: items, pagination } = data.value;

  return (
    <div class="container mx-auto px-4">
      {/* Content */}
      <div class="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id}>{/* Item card */}</div>
        ))}
      </div>

      {/* Pagination */}
      <div class="mt-12">
        <Pagination
          pagination={pagination}
          baseUrl="/data"
          size="md"
          variant="outline"
          align="center"
        />
      </div>
    </div>
  );
});
```

## 🔄 Migration from Manual

**Before:**

```tsx
<div class="join">
  {pagination.page > 1 && (
    <Link href={`/blog?page=${pagination.page - 1}`} class="join-item btn">
      Previous
    </Link>
  )}
  {/* ... lots of code ... */}
</div>
```

**After:**

```tsx
<Pagination pagination={pagination} baseUrl="/blog" />
```

---

**Last Updated**: January 2025
**Version**: 1.0.0
