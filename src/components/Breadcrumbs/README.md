# Breadcrumbs Component

A reusable, accessible breadcrumb navigation component for Qwik applications, styled with DaisyUI.

## Features

- 🎯 **Automatic breadcrumb generation** from route location
- 🎨 **DaisyUI styling** with multiple themes support
- ♿ **Fully accessible** with ARIA labels and semantic HTML
- 📱 **Responsive design** with optional scrolling for long paths
- 🎭 **Multiple separator styles** (chevron, slash, arrow, dot)
- 🔧 **Highly customizable** with TypeScript support
- 🏠 **Home icon support** for the first breadcrumb
- 🚀 **Performance optimized** for Qwik's resumability

## Installation

The component is already included in the project. Import from:

```tsx
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";
```

## Basic Usage

### Automatic Breadcrumbs

The easiest way to use breadcrumbs is with the `useBreadcrumbs()` hook, which automatically generates breadcrumbs from the current route:

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

### Manual Breadcrumbs

For custom breadcrumb items:

```tsx
import { component$ } from "@builder.io/qwik";
import { Breadcrumbs, createBreadcrumbs } from "~/components/Breadcrumbs";

export default component$(() => {
  const breadcrumbs = createBreadcrumbs([
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Laptop Details", isActive: true },
  ]);

  return <Breadcrumbs items={breadcrumbs} />;
});
```

## Props

### BreadcrumbsProps

| Prop           | Type                                       | Default                   | Description                                    |
| -------------- | ------------------------------------------ | ------------------------- | ---------------------------------------------- |
| `items`        | `BreadcrumbItem[]`                         | **Required**              | Array of breadcrumb items to display           |
| `separator`    | `'chevron' \| 'slash' \| 'arrow' \| 'dot'` | `'chevron'`               | Separator style between breadcrumbs            |
| `size`         | `'sm' \| 'md' \| 'lg'`                     | `'md'`                    | Size of the breadcrumbs                        |
| `class`        | `string`                                   | `''`                      | Additional CSS classes                         |
| `maxWidth`     | `string`                                   | `undefined`               | Maximum width before scrolling (e.g., '500px') |
| `showHomeIcon` | `boolean`                                  | `true`                    | Show home icon on first item if it's "/"       |
| `ariaLabel`    | `string`                                   | `'Breadcrumb navigation'` | ARIA label for screen readers                  |

### BreadcrumbItem

| Property   | Type       | Description                             |
| ---------- | ---------- | --------------------------------------- |
| `label`    | `string`   | Display text for the breadcrumb         |
| `href`     | `string?`  | URL path (optional for current page)    |
| `icon`     | `any?`     | Icon component or SVG element           |
| `isActive` | `boolean?` | Whether this is the current/active page |

## Examples

### With Different Separators

```tsx
// Chevron (default)
<Breadcrumbs items={breadcrumbs} separator="chevron" />

// Slash
<Breadcrumbs items={breadcrumbs} separator="slash" />

// Arrow
<Breadcrumbs items={breadcrumbs} separator="arrow" />

// Dot
<Breadcrumbs items={breadcrumbs} separator="dot" />
```

### With Custom Icons

```tsx
const breadcrumbs = createBreadcrumbs([
  {
    label: "Home",
    href: "/",
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
  { label: "Settings", href: "/settings" },
  { label: "Profile", isActive: true },
]);

<Breadcrumbs items={breadcrumbs} />;
```

### With Size Variants

```tsx
// Small
<Breadcrumbs items={breadcrumbs} size="sm" />

// Medium (default)
<Breadcrumbs items={breadcrumbs} size="md" />

// Large
<Breadcrumbs items={breadcrumbs} size="lg" />
```

### With Scrolling for Long Paths

```tsx
<Breadcrumbs items={breadcrumbs} maxWidth="500px" class="overflow-x-auto" />
```

### Without Home Icon

```tsx
<Breadcrumbs items={breadcrumbs} showHomeIcon={false} />
```

### In Admin Layout

```tsx
import { component$, Slot } from "@builder.io/qwik";
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

export default component$(() => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div class="min-h-screen">
      <nav class="navbar bg-base-200">{/* Navigation content */}</nav>

      <div class="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} class="mb-6" />
        <Slot />
      </div>
    </div>
  );
});
```

### Merging Auto and Custom Breadcrumbs

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

  // Get product name from loader or params
  const productName = location.params.name;

  const breadcrumbs = mergeBreadcrumbs(autoBreadcrumbs, [
    { label: productName, isActive: true },
  ]);

  return <Breadcrumbs items={breadcrumbs} />;
});
```

## Automatic Route Configuration

The `useBreadcrumbs()` hook automatically generates breadcrumbs based on the route configuration defined in `useBreadcrumbs.ts`.

### Supported Routes

The component automatically handles:

- **Public routes**: `/`, `/blog`, `/profile`, `/schedule`
- **Auth routes**: `/auth/login`, `/auth/register`
- **Admin routes**: All admin pages including CRUD operations
- **Dynamic routes**: Blog posts, edit pages, etc.

### Customizing Route Labels

To customize labels for specific routes, edit the `ROUTE_CONFIG` in `useBreadcrumbs.ts`:

```typescript
const ROUTE_CONFIG: Record<string, { label: string; icon?: any }> = {
  "/your-route": { label: "Your Custom Label" },
  // ... other routes
};
```

For dynamic routes, add patterns to `DYNAMIC_ROUTE_PATTERNS`:

```typescript
const DYNAMIC_ROUTE_PATTERNS: Record<
  string,
  (params: Record<string, string>) => string
> = {
  "/products/:id": (params) => `Product ${params.id}`,
  // ... other patterns
};
```

## Accessibility

The component follows WCAG 2.1 guidelines:

- ✅ Uses semantic `<nav>` element with `aria-label`
- ✅ Marks current page with `aria-current="page"`
- ✅ Icons are marked with `aria-hidden="true"`
- ✅ Keyboard navigable links
- ✅ Screen reader friendly

## Styling

The component uses DaisyUI classes and inherits the current theme:

- Hover effects on links (`hover:text-primary`)
- Active page styling (bold text)
- Responsive text sizes
- Theme-aware colors

### Custom Styling

Add custom classes via the `class` prop:

```tsx
<Breadcrumbs items={breadcrumbs} class="bg-base-200 p-4 rounded-lg shadow-md" />
```

## Best Practices

1. **Use automatic breadcrumbs** when possible for consistency
2. **Add breadcrumbs to all pages** except the home page
3. **Keep breadcrumb labels short** and descriptive
4. **Use the last item as the current page** without a link
5. **Place breadcrumbs above the page title** for better UX
6. **Consider mobile layout** - use `maxWidth` for very long paths
7. **Test with screen readers** to ensure accessibility

## Performance

The component is optimized for Qwik:

- Uses Qwik's `component$` for lazy loading
- Minimal runtime overhead
- No unnecessary re-renders
- Server-side compatible

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  BreadcrumbItem,
  BreadcrumbsProps,
  RouteConfig,
} from "~/components/Breadcrumbs";
```

## Troubleshooting

### Breadcrumbs not showing

- Check that `items` array is not empty
- Verify the route is configured in `ROUTE_CONFIG`

### Wrong labels

- Update `ROUTE_CONFIG` for static routes
- Update `DYNAMIC_ROUTE_PATTERNS` for dynamic routes

### Styling issues

- Ensure DaisyUI is properly installed
- Check that Tailwind CSS is configured correctly
- Verify theme classes are available

## Related Components

- `Link` - For navigation links
- `useLocation` - For accessing route information
- `useNavigate` - For programmatic navigation

## License

Part of the project's codebase. See project license.
