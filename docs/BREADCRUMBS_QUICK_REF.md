# Breadcrumbs Quick Reference Card

## 🚀 Quick Start

```tsx
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

const breadcrumbs = useBreadcrumbs();
<Breadcrumbs items={breadcrumbs} />;
```

## 📖 Common Patterns

### 1. Automatic (90% of cases)

```tsx
const breadcrumbs = useBreadcrumbs();
<Breadcrumbs items={breadcrumbs} />;
```

### 2. Manual

```tsx
const breadcrumbs = createBreadcrumbs([
  { label: "Home", href: "/" },
  { label: "Page", isActive: true },
]);
<Breadcrumbs items={breadcrumbs} />;
```

### 3. Merge Custom

```tsx
const auto = useBreadcrumbs();
const breadcrumbs = mergeBreadcrumbs(auto, [
  { label: customTitle, isActive: true },
]);
<Breadcrumbs items={breadcrumbs} />;
```

## 🎨 Styling Options

```tsx
// Size
<Breadcrumbs size="sm" />  // Small
<Breadcrumbs size="md" />  // Medium (default)
<Breadcrumbs size="lg" />  // Large

// Separator
<Breadcrumbs separator="chevron" />  // > (default)
<Breadcrumbs separator="slash" />    // /
<Breadcrumbs separator="arrow" />    // →
<Breadcrumbs separator="dot" />      // •

// Custom classes
<Breadcrumbs class="mb-6 text-base-content/70" />

// Hide home icon
<Breadcrumbs showHomeIcon={false} />
```

## 📐 Layout Guidelines

```tsx
// Admin pages (compact)
<Breadcrumbs items={breadcrumbs} size="sm" class="mb-4" />

// Public pages (readable)
<Breadcrumbs items={breadcrumbs} size="md" class="mb-6" />

// Mobile (scrollable)
<Breadcrumbs maxWidth="90vw" class="overflow-x-auto" />
```

## 🔧 Configuration

### Add Static Route

```typescript
// src/components/Breadcrumbs/useBreadcrumbs.ts
const ROUTE_CONFIG = {
  "/your-route": { label: "Your Label" },
};
```

### Add Dynamic Route

```typescript
const DYNAMIC_ROUTE_PATTERNS = {
  "/items/:id": (params) => `Item ${params.id}`,
};
```

## 📦 Props Reference

| Prop           | Type               | Default     | Example                        |
| -------------- | ------------------ | ----------- | ------------------------------ |
| `items`        | `BreadcrumbItem[]` | Required    | `[{label: "Home", href: "/"}]` |
| `separator`    | `string`           | `"chevron"` | `"slash"`                      |
| `size`         | `string`           | `"md"`      | `"sm"`                         |
| `class`        | `string`           | `""`        | `"mb-6"`                       |
| `showHomeIcon` | `boolean`          | `true`      | `false`                        |

## 🎯 BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string; // Required
  href?: string; // Omit for current page
  icon?: JSX.Element; // Optional icon
  isActive?: boolean; // Mark as current
}
```

## ✅ Dos and Don'ts

### ✅ Do

- Use automatic generation when possible
- Keep labels short (2-3 words)
- Make last item non-clickable
- Place above page title
- Use consistent separator style

### ❌ Don't

- Use different separators on different pages
- Make current page clickable
- Use very long labels
- Skip breadcrumbs on deep pages
- Forget accessibility attributes

## 🐛 Troubleshooting

### Not showing?

```tsx
console.log("Breadcrumbs:", breadcrumbs);
// Check if items array is empty
```

### Wrong label?

```typescript
// Add to ROUTE_CONFIG or DYNAMIC_ROUTE_PATTERNS
```

### Too long?

```tsx
<Breadcrumbs maxWidth="500px" class="overflow-x-auto" />
```

## 📍 File Locations

- Component: `src/components/Breadcrumbs/Breadcrumbs.tsx`
- Hook: `src/components/Breadcrumbs/useBreadcrumbs.ts`
- Types: `src/components/Breadcrumbs/types.ts`
- Docs: `src/components/Breadcrumbs/README.md`
- Guide: `frontend/docs/BREADCRUMBS_GUIDE.md`

## 💡 Pro Tips

1. **Admin pages**: Already included in `AdminLayout.tsx`
2. **Blog detail**: Use `mergeBreadcrumbs()` for custom title
3. **Mobile**: Use `size="sm"` for more space
4. **Long paths**: Add `maxWidth` with scrolling
5. **Custom icon**: Pass JSX element in `icon` prop

## 🔗 Quick Links

- [Full Documentation](./BREADCRUMBS_GUIDE.md)
- [Component README](../src/components/Breadcrumbs/README.md)
- [DaisyUI Docs](https://daisyui.com/components/breadcrumbs/)
- [Qwik Routing](https://qwik.dev/docs/routing/)

---

**Last Updated**: January 2025
