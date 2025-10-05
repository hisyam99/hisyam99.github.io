# Breadcrumbs Implementation Guide

## Overview

This guide provides comprehensive documentation for implementing and using the Breadcrumbs component across all pages in the application. The implementation follows Qwik and DaisyUI best practices for creating reusable, accessible, and performant navigation components.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Implementation Status](#implementation-status)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Automatic Generation**: Breadcrumbs are automatically generated from route paths
- **DaisyUI Styling**: Fully styled with DaisyUI components and theme support
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Responsive**: Works seamlessly on all screen sizes
- **Customizable**: Multiple separator styles, sizes, and icons
- **TypeScript**: Full type safety with exported interfaces
- **Performance**: Optimized for Qwik's resumability pattern
- **Server-Side Compatible**: Works with SSR and SSG

## 🚀 Quick Start

### 1. Automatic Breadcrumbs

The simplest way to add breadcrumbs to any page:

```tsx
import { component$ } from "@builder.io/qwik";
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

export default component$(() => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      {/* Your page content */}
    </div>
  );
});
```

### 2. Manual Breadcrumbs

For custom breadcrumb paths:

```tsx
import { component$ } from "@builder.io/qwik";
import { Breadcrumbs, createBreadcrumbs } from "~/components/Breadcrumbs";

export default component$(() => {
  const breadcrumbs = createBreadcrumbs([
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Product Details", isActive: true },
  ]);

  return <Breadcrumbs items={breadcrumbs} />;
});
```

### 3. Merge Auto and Custom

Combine automatic generation with custom labels:

```tsx
import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  Breadcrumbs,
  useBreadcrumbs,
  mergeBreadcrumbs,
} from "~/components/Breadcrumbs";

export default component$(() => {
  const location = useLocation();
  const autoBreadcrumbs = useBreadcrumbs();
  const productName = location.params.name;

  const breadcrumbs = mergeBreadcrumbs(autoBreadcrumbs, [
    { label: productName, isActive: true },
  ]);

  return <Breadcrumbs items={breadcrumbs} />;
});
```

## 📊 Implementation Status

### ✅ Completed

| Page/Section          | Status  | Implementation Type |
| --------------------- | ------- | ------------------- |
| Admin Dashboard       | ✅ Done | Automatic (Layout)  |
| Admin Categories      | ✅ Done | Automatic (Layout)  |
| Admin Blogs           | ✅ Done | Automatic (Layout)  |
| Admin Projects        | ✅ Done | Automatic (Layout)  |
| Admin Resume Contents | ✅ Done | Automatic (Layout)  |
| Admin Users           | ✅ Done | Automatic (Layout)  |
| Blog Listing          | ✅ Done | Automatic           |
| Blog Detail           | ✅ Done | Custom Merge        |
| Profile               | ✅ Done | Automatic           |
| Schedule              | ✅ Done | Automatic           |

### 🔄 Pending (if any)

| Page/Section | Priority | Notes                       |
| ------------ | -------- | --------------------------- |
| -            | -        | All major pages implemented |

## 📚 Usage Examples

### Example 1: Basic Implementation (Admin Pages)

All admin pages automatically get breadcrumbs through the `AdminLayout.tsx`:

```tsx
// src/components/admin/AdminLayout.tsx
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

export default component$<AdminLayoutProps>(({ authData }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <main class="flex-1 overflow-y-auto">
      <div class="container mx-auto p-4 lg:p-6 xl:p-8 max-w-7xl">
        {/* Breadcrumbs */}
        <div class="mb-4 lg:mb-6">
          <Breadcrumbs items={breadcrumbs} size="sm" />
        </div>
        <Slot />
      </div>
    </main>
  );
});
```

**Result**: All admin pages (`/admin/categories`, `/admin/blogs/new`, etc.) automatically display breadcrumbs.

### Example 2: Blog Detail with Custom Title

```tsx
// src/routes/blog/[slug]/index.tsx
export default component$(() => {
  const blogData = useBlogDetailLoader();
  const blog = blogData.value;
  const autoBreadcrumbs = useBreadcrumbs();

  // Merge auto breadcrumbs with blog title
  const breadcrumbs = mergeBreadcrumbs(autoBreadcrumbs, [
    { label: blog.title, isActive: true },
  ]);

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} size="sm" class="text-base-content/70" />
      {/* Blog content */}
    </div>
  );
});
```

**Result**: Shows `Home > Blog > [Blog Title]` with the actual blog post title.

### Example 3: Different Separator Styles

```tsx
// Chevron (default) - Home > Admin > Categories
<Breadcrumbs items={breadcrumbs} separator="chevron" />

// Slash - Home / Admin / Categories
<Breadcrumbs items={breadcrumbs} separator="slash" />

// Arrow - Home → Admin → Categories
<Breadcrumbs items={breadcrumbs} separator="arrow" />

// Dot - Home • Admin • Categories
<Breadcrumbs items={breadcrumbs} separator="dot" />
```

### Example 4: With Icons

```tsx
const breadcrumbs = createBreadcrumbs([
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  { label: "Settings", isActive: true },
]);

<Breadcrumbs items={breadcrumbs} />;
```

### Example 5: Size Variants

```tsx
// Small - Best for dense layouts
<Breadcrumbs items={breadcrumbs} size="sm" />

// Medium (default) - Standard size
<Breadcrumbs items={breadcrumbs} size="md" />

// Large - For prominent navigation
<Breadcrumbs items={breadcrumbs} size="lg" />
```

### Example 6: Scrollable Breadcrumbs

For very long paths:

```tsx
<Breadcrumbs items={breadcrumbs} maxWidth="500px" class="overflow-x-auto" />
```

## 📖 API Reference

### BreadcrumbsProps

| Prop           | Type                                       | Default                   | Description                    |
| -------------- | ------------------------------------------ | ------------------------- | ------------------------------ |
| `items`        | `BreadcrumbItem[]`                         | **Required**              | Array of breadcrumb items      |
| `separator`    | `'chevron' \| 'slash' \| 'arrow' \| 'dot'` | `'chevron'`               | Visual separator between items |
| `size`         | `'sm' \| 'md' \| 'lg'`                     | `'md'`                    | Text size of breadcrumbs       |
| `class`        | `string`                                   | `''`                      | Additional CSS classes         |
| `maxWidth`     | `string`                                   | `undefined`               | Max width before scrolling     |
| `showHomeIcon` | `boolean`                                  | `true`                    | Show home icon for first item  |
| `ariaLabel`    | `string`                                   | `'Breadcrumb navigation'` | ARIA label for accessibility   |

### BreadcrumbItem

| Property   | Type          | Required | Description                      |
| ---------- | ------------- | -------- | -------------------------------- |
| `label`    | `string`      | ✅ Yes   | Display text                     |
| `href`     | `string`      | ❌ No    | Link URL (omit for current page) |
| `icon`     | `JSX.Element` | ❌ No    | Icon component                   |
| `isActive` | `boolean`     | ❌ No    | Mark as current page             |

### Hooks & Utilities

#### `useBreadcrumbs()`

Automatically generates breadcrumbs from the current route.

```tsx
const breadcrumbs = useBreadcrumbs();
// Returns: BreadcrumbItem[]
```

#### `createBreadcrumbs(items: BreadcrumbItem[])`

Helper for creating manual breadcrumb arrays with type safety.

```tsx
const breadcrumbs = createBreadcrumbs([
  { label: "Home", href: "/" },
  { label: "Page", isActive: true },
]);
```

#### `mergeBreadcrumbs(auto: BreadcrumbItem[], custom: BreadcrumbItem[])`

Merges automatic breadcrumbs with custom items.

```tsx
const merged = mergeBreadcrumbs(autoBreadcrumbs, [
  { label: "Custom Label", isActive: true },
]);
```

## ⚙️ Configuration

### Route Configuration

Edit `src/components/Breadcrumbs/useBreadcrumbs.ts` to customize route labels:

```typescript
const ROUTE_CONFIG: Record<string, { label: string; icon?: JSX.Element }> = {
  "/": { label: "Home" },
  "/blog": { label: "Blog" },
  "/admin": { label: "Admin Dashboard" },
  "/admin/blogs": { label: "Blogs" },
  // Add your routes here
};
```

### Dynamic Routes

Configure patterns for dynamic segments:

```typescript
const DYNAMIC_ROUTE_PATTERNS: Record<
  string,
  (params: Record<string, string>) => string
> = {
  "/blog/:slug": (params) => params.slug?.replace(/-/g, " ") || "Post",
  "/admin/blogs/:id/edit": () => "Edit Blog",
  // Add your patterns here
};
```

## 🎯 Best Practices

### 1. Placement

Place breadcrumbs **above the page title** for optimal UX:

```tsx
<div>
  <Breadcrumbs items={breadcrumbs} size="sm" class="mb-6" />
  <h1>Page Title</h1>
  {/* Content */}
</div>
```

### 2. Consistency

Use the same separator style across your application:

```tsx
// Good: Consistent separator
<Breadcrumbs items={breadcrumbs} separator="chevron" />

// Bad: Mixing separators
<Breadcrumbs items={breadcrumbs} separator="slash" /> // On one page
<Breadcrumbs items={breadcrumbs} separator="dot" />   // On another
```

### 3. Size Guidelines

- **Admin pages**: Use `size="sm"` for more space
- **Public pages**: Use `size="md"` for better readability
- **Landing pages**: Consider `size="lg"` for prominence

### 4. Last Item

Always make the last item non-clickable (current page):

```tsx
// Good
{ label: "Current Page", isActive: true }

// Bad
{ label: "Current Page", href: "/current", isActive: true }
```

### 5. Label Length

Keep labels concise (2-3 words max):

```tsx
// Good
{
  label: "Blog Posts";
}

// Bad
{
  label: "All Published Blog Posts and Articles";
}
```

### 6. Mobile Considerations

For mobile, consider using smaller size or scrolling:

```tsx
<Breadcrumbs
  items={breadcrumbs}
  size="sm"
  maxWidth="100%"
  class="overflow-x-auto"
/>
```

## ♿ Accessibility

The component follows WCAG 2.1 Level AA guidelines:

- ✅ Semantic `<nav>` element
- ✅ ARIA label: `aria-label="Breadcrumb navigation"`
- ✅ Current page marked: `aria-current="page"`
- ✅ Icons hidden from screen readers: `aria-hidden="true"`
- ✅ Keyboard navigable links
- ✅ Focus indicators

### Testing Accessibility

```bash
# Test with screen reader
# - Navigate to page with breadcrumbs
# - Screen reader should announce "Breadcrumb navigation"
# - Each link should be readable
# - Current page should be announced as "current page"
```

## 🎨 Styling

### Default Styles

The component uses DaisyUI classes:

- **Links**: `hover:text-primary transition-colors`
- **Active**: `text-base-content font-semibold`
- **Separator**: `text-base-content/40`

### Custom Styling

Add custom classes via the `class` prop:

```tsx
<Breadcrumbs items={breadcrumbs} class="bg-base-200 p-4 rounded-lg shadow-md" />
```

### Theme Integration

Breadcrumbs automatically adapt to DaisyUI themes:

```tsx
// Works with all themes: light, dark, cupcake, etc.
<html data-theme="dark">
  <Breadcrumbs items={breadcrumbs} />
</html>
```

## 🐛 Troubleshooting

### Issue: Breadcrumbs Not Showing

**Possible Causes:**

- Empty items array
- Route not configured
- Component not imported

**Solution:**

```tsx
// Check items array
console.log("Breadcrumbs:", breadcrumbs);

// Verify import
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";
```

### Issue: Wrong Labels

**Problem:** Display shows "Edit" instead of "Edit Category"

**Solution:** Update `ROUTE_CONFIG` or `DYNAMIC_ROUTE_PATTERNS`:

```typescript
const ROUTE_CONFIG = {
  "/admin/categories/:id/edit": { label: "Edit Category" },
};
```

### Issue: Breadcrumbs Too Long on Mobile

**Solution:** Use scrolling:

```tsx
<Breadcrumbs items={breadcrumbs} maxWidth="90vw" class="overflow-x-auto" />
```

### Issue: Icons Not Displaying

**Problem:** Icons show as blank

**Solution:** Ensure JSX element is properly formed:

```tsx
// Correct
icon: (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path ... />
  </svg>
)

// Incorrect
icon: "<svg>...</svg>" // String, not JSX
```

### Issue: TypeScript Errors

**Problem:** Type errors with BreadcrumbItem

**Solution:** Import types:

```tsx
import type { BreadcrumbItem } from "~/components/Breadcrumbs";

const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
```

## 🔧 Advanced Usage

### Custom Separator Component

```tsx
const CustomSeparator = <span class="mx-2 text-primary">|</span>;

// Note: Currently, custom separators require modifying Breadcrumbs.tsx
// Consider adding this as a prop enhancement
```

### Conditional Breadcrumbs

```tsx
export default component$(() => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.url.pathname === "/") {
    return <Slot />;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <Slot />
    </div>
  );
});
```

### With Loading State

```tsx
export default component$(() => {
  const data = useLoader();
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      {data.isLoading ? (
        <div class="skeleton h-6 w-64"></div>
      ) : (
        <Breadcrumbs items={breadcrumbs} />
      )}
    </div>
  );
});
```

## 📈 Performance

### Bundle Size

- Component: ~2KB (minified + gzipped)
- No runtime dependencies
- Tree-shakeable

### Optimization Tips

1. **Use in Layouts**: Implement once in layout for all child routes
2. **Server-Side**: Breadcrumbs generate during SSR, no client-side overhead
3. **Lazy Loading**: Component uses `component$` for automatic code splitting

## 🔄 Migration Guide

### From Manual Breadcrumbs

**Before:**

```tsx
<nav class="breadcrumbs">
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/blog">Blog</a>
    </li>
    <li>Post</li>
  </ul>
</nav>
```

**After:**

```tsx
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

const breadcrumbs = useBreadcrumbs();
<Breadcrumbs items={breadcrumbs} />;
```

## 📝 Contributing

To add new route configurations:

1. Open `src/components/Breadcrumbs/useBreadcrumbs.ts`
2. Add to `ROUTE_CONFIG` for static routes
3. Add to `DYNAMIC_ROUTE_PATTERNS` for dynamic routes
4. Test the breadcrumb generation
5. Update this documentation

## 📞 Support

For issues or questions:

- Check this documentation first
- Review `src/components/Breadcrumbs/README.md`
- Check TypeScript types in `types.ts`
- Test with different themes and screen sizes

## 📚 Related Documentation

- [Qwik Routing](https://qwik.dev/docs/routing/)
- [DaisyUI Breadcrumbs](https://daisyui.com/components/breadcrumbs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team
