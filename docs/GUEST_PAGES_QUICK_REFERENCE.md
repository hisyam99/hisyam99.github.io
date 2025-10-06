# Guest Pages Quick Reference Guide

## 🚀 Quick Start

All guest pages are located in `frontend/src/routes/(guest)/` and are publicly accessible without authentication.

## 📄 Pages Overview

| Page               | Route            | Purpose                            |
| ------------------ | ---------------- | ---------------------------------- |
| **Projects**       | `/projects`      | Portfolio showcase with pagination |
| **Project Detail** | `/projects/[id]` | Individual project details         |
| **Resume**         | `/resume`        | Professional experience & skills   |
| **About**          | `/about`         | Personal introduction & story      |
| **Contact**        | `/contact`       | Contact form & social links        |

---

## 🎨 Projects Page

**Route**: `/projects`

### Features

- 3x3 grid layout
- Pagination support
- Stats display
- Responsive design

### Navigation

```tsx
<Link href="/projects">View All Projects</Link>
```

### Key Components

```tsx
// Loader
export const useProjectsLoader = routeLoader$(async (requestEvent) => {
  const page = parseInt(requestEvent.url.searchParams.get("page") || "1", 10);
  return await getProjects({ page, pageSize: 9 });
});

// Pagination
<Pagination
  pagination={pagination}
  baseUrl="/projects"
  size="md"
  variant="outline"
/>;
```

---

## 📁 Project Detail Page

**Route**: `/projects/[id]`

### Features

- Full project information
- Technology badges
- Action buttons
- Author card

### Navigation

```tsx
<Link href={`/projects/${projectId}`}>View Details</Link>
```

### Loader

```tsx
export const useProjectDetailLoader = routeLoader$(async (requestEvent) => {
  const projectId = requestEvent.params.id;
  return await getProjectById(projectId);
});
```

---

## 📋 Resume Page

**Route**: `/resume`

### Features

- Timeline view
- Category filtering
- Skills showcase
- Downloadable PDF

### Service Functions

```tsx
// Get all resume contents grouped by categories
const resumeData = await getResumeContentsByCategories();

// Get by specific category
const categoryData = await getResumeContentsByCategory(categoryId);

// Get single item
const item = await getResumeContentById(id);
```

### Category Filtering

```tsx
const selectedCategory = useSignal<string>("all");

<button
  class={`tab ${selectedCategory.value === "all" ? "tab-active" : ""}`}
  onClick$={() => (selectedCategory.value = "all")}
>
  All Sections
</button>;
```

---

## 👤 About Page

**Route**: `/about`

### Features

- Profile avatar
- Tabbed content
- Core values display
- Tech stack showcase

### Tabbed Content

```tsx
const activeTab = useSignal<string>("story");

const handleTabChange = $((tab: string) => {
  activeTab.value = tab;
});

// Tabs: "story", "approach", "interests"
```

### Avatar Setup

```tsx
<img
  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Developer"
  alt="Profile"
  width="256"
  height="256"
/>
```

---

## 📧 Contact Page

**Route**: `/contact`

### Features

- Validated form
- Social media links
- Contact info cards
- Success/error messages

### Form Schema

```tsx
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});
```

### Form Action

```tsx
export const useContactAction = routeAction$(async (values) => {
  // Process submission
  return {
    success: true,
    message: "Thank you for your message!",
  };
}, zod$(contactFormSchema));
```

### Usage in Component

```tsx
const contactAction = useContactAction();

<Form action={contactAction} class="space-y-4">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</Form>;

{
  contactAction.value?.success && (
    <div class="alert alert-success">{contactAction.value.message}</div>
  );
}
```

---

## 🧩 Common Patterns

### 1. Breadcrumbs

```tsx
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "~/components/Breadcrumbs/useBreadcrumbs";

const breadcrumbs = useBreadcrumbs();

<Breadcrumbs items={breadcrumbs} size="sm" />;
```

### 2. Hero Section

```tsx
<section class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20">
  <div class="hero-content text-center">
    <div class="max-w-3xl">
      <h1 class="mb-5 text-5xl font-bold">
        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Page Title
        </span>
      </h1>
      <p class="mb-8 text-lg">Description</p>
    </div>
  </div>
</section>
```

### 3. Stats Display

```tsx
<div class="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
  <div class="stat">
    <div class="stat-title">Label</div>
    <div class="stat-value text-primary">100</div>
    <div class="stat-desc">Description</div>
  </div>
</div>
```

### 4. Animations

```tsx
import { useScrollAnimation, useStaggerAnimation } from "~/hooks/useScrollAnimation";

const { ref: heroRef } = useScrollAnimation();
const staggerRef = useStaggerAnimation(200);

<section ref={heroRef}>...</section>
<div ref={staggerRef}>...</div>
```

### 5. Loading States

```tsx
const isSubmitting = useSignal(false);

<button disabled={isSubmitting.value || action.isRunning}>
  {action.isRunning ? (
    <>
      <span class="loading loading-spinner"></span>
      Loading...
    </>
  ) : (
    "Submit"
  )}
</button>;
```

---

## 🎯 DaisyUI Components Used

### Cards

```tsx
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

### Badges

```tsx
<div class="badge badge-primary">Primary</div>
<div class="badge badge-secondary badge-lg">Large</div>
<div class="badge badge-outline">Outline</div>
```

### Timeline

```tsx
<ul class="timeline timeline-vertical">
  <li>
    <hr class="bg-primary" />
    <div class="timeline-middle">🎯</div>
    <div class="timeline-end">
      <time>2024</time>
      <div class="text-lg font-black">Event Title</div>
    </div>
    <hr class="bg-primary" />
  </li>
</ul>
```

### Tabs

```tsx
<div class="tabs tabs-boxed">
  <button class={`tab ${activeTab.value === "tab1" ? "tab-active" : ""}`}>
    Tab 1
  </button>
</div>
```

### Form Controls

```tsx
<div class="form-control">
  <label class="label">
    <span class="label-text">Label</span>
  </label>
  <input type="text" class="input input-bordered" />
</div>
```

---

## 🔗 Navigation Between Pages

### Internal Links

```tsx
import { Link } from "@builder.io/qwik-city";

<Link href="/projects">Projects</Link>
<Link href="/resume">Resume</Link>
<Link href="/about">About</Link>
<Link href="/contact">Contact</Link>
```

### Programmatic Navigation

```tsx
import { useNavigate } from "@builder.io/qwik-city";

const nav = useNavigate();
await nav("/projects");
```

---

## 📊 Data Fetching

### Projects

```tsx
import { getProjects, getProjectById } from "~/services/project";

// List
const projects = await getProjects({ page: 1, pageSize: 10 });

// Single
const project = await getProjectById("project-id");
```

### Resume

```tsx
import {
  getResumeContentsByCategories,
  getResumeContentsByCategory,
} from "~/services/resume";

// All categories
const allContent = await getResumeContentsByCategories();

// By category
const categoryContent = await getResumeContentsByCategory("cat-id");
```

---

## 🎨 Styling Conventions

### Colors

- Primary: `text-primary`, `bg-primary`, `border-primary`
- Secondary: `text-secondary`, `bg-secondary`
- Accent: `text-accent`, `bg-accent`
- Base: `bg-base-100`, `bg-base-200`, `bg-base-300`

### Gradients

```tsx
// Background
class="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"

// Text
class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
```

### Spacing

- Padding: `p-4`, `px-4`, `py-20`, `pt-32`
- Margin: `m-4`, `mx-auto`, `my-8`, `mb-12`
- Gap: `gap-4`, `gap-6`, `gap-8`

### Responsive

```tsx
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
class="text-sm md:text-base lg:text-lg"
class="px-4 md:px-6 lg:px-8"
```

---

## 🐛 Common Issues & Solutions

### Issue: Pagination not working

```tsx
// ❌ Wrong
<Pagination currentPage={1} totalPages={10} />

// ✅ Correct
<Pagination
  pagination={{ page: 1, pageSize: 10, total: 100, totalPages: 10 }}
  baseUrl="/projects"
/>
```

### Issue: Form validation errors not showing

```tsx
// Check action value
{
  action.value?.fieldErrors?.fieldName && (
    <span class="text-error">{action.value.fieldErrors.fieldName}</span>
  );
}
```

### Issue: Images causing layout shifts

```tsx
// Always add width and height
<img src="..." alt="..." width="256" height="256" />
```

### Issue: GraphQL enum errors

```tsx
// ❌ Don't send string values for enums
sortDirection: "DESC";

// ✅ Remove or use proper enum
// Let backend use default values
```

---

## 📚 Related Documentation

- [Full Guest Pages Documentation](./GUEST_PAGES.md)
- [Breadcrumbs Guide](./BREADCRUMBS.md)
- [Pagination Guide](./PAGINATION.md)
- [Qwik Documentation](https://qwik.dev/docs/)
- [DaisyUI Components](https://daisyui.com/components/)

---

## ✅ Checklist for New Pages

- [ ] Add breadcrumbs navigation
- [ ] Implement responsive design
- [ ] Add loading states
- [ ] Include error handling
- [ ] Add SEO meta tags
- [ ] Test on mobile/tablet/desktop
- [ ] Add accessibility features
- [ ] Implement animations
- [ ] Add TypeScript types
- [ ] Document the page

---

**Quick Access**: All guest pages are at `frontend/src/routes/(guest)/`

**Build**: `bun run build`
**Lint**: `bun run lint`
**Dev**: `bun run dev`
