# ✨ Hero Visual Effects Documentation

## 📋 Overview

Hero section dengan visual effects yang menarik namun **tidak menggunakan scroll animations**. Semua effects adalah pure CSS animations yang berjalan otomatis tanpa trigger scroll, sehingga tidak menyebabkan scroll jump issues.

---

## 🎨 Visual Features

### 1. **Orbiting Tech Stack Icons**

#### Main Stack (Single Orbit)

5 teknologi utama yang berputar mengelilingi foto profil dalam satu orbit:

```tsx
<div class="animate-spin-slow absolute inset-0">
  {/* Linux - Top */}
  <div class="absolute -top-8 left-1/2 -translate-x-1/2">
    <QLinuxIcon />
  </div>

  {/* TypeScript - Top Right (diagonal) */}
  <div class="absolute top-0 right-0 translate-x-4 -translate-y-4">
    <QTypeScriptIcon />
  </div>

  {/* Qwik - Right */}
  <div class="absolute top-1/2 -right-8 -translate-y-1/2">
    <QQwikIcon />
  </div>

  {/* Encore.dev - Bottom */}
  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2">
    {/* Custom SVG Icon */}
  </div>

  {/* Go - Left */}
  <div class="absolute top-1/2 -left-8 -translate-y-1/2">
    <QGoIcon />
  </div>
</div>
```

**Specifications:**

- **Animation:** `animate-spin-slow` (20s rotation)
- **Direction:** Clockwise
- **Size:** 48px × 48px (h-12 w-12)
- **Positions:**
  - Linux: Top (12 o'clock)
  - TypeScript: Top-Right diagonal (1:30 position)
  - Qwik: Right (3 o'clock)
  - Encore.dev: Bottom (6 o'clock)
  - Go: Left (9 o'clock)
- **Icons:** Linux, TypeScript, Qwik, Encore.dev, Golang

---

### 2. **Particle Effects**

Floating particles dengan berbagai animasi:

```tsx
<div class="pointer-events-none absolute inset-0">
  {/* Primary particles */}
  <div class="bg-primary absolute top-12 right-12 h-1 w-1 animate-ping" />

  {/* Secondary particles */}
  <div class="bg-secondary absolute bottom-16 left-16 h-1 w-1 animate-pulse" />

  {/* Accent particles with delays */}
  <div
    class="bg-accent absolute top-20 left-12 h-0.5 w-0.5 animate-ping"
    style="animation-delay: 1s"
  />
  {/* ... more particles ... */}
</div>
```

**Particle Types:**

1. **Ping particles** (6 total)
   - Colors: primary, accent, primary
   - Sizes: 1px, 0.5px, 0.5px
   - Animation: `animate-ping` (expand & fade)
   - Delays: 0s, 1s, 1.5s

2. **Pulse particles** (3 total)
   - Colors: secondary, info, secondary
   - Sizes: 1px, 0.5px, 1px
   - Animation: `animate-pulse` (fade in/out)
   - Delays: 0s, 2s, 0.5s

---

### 3. **Floating Tech Elements**

Small decorative elements around the photo frame:

```tsx
{/* Corner accents */}
<div class="bg-primary absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full" />
<div class="bg-secondary absolute -bottom-3 -left-3 h-3 w-3 animate-pulse rounded-full" />
<div class="bg-accent absolute top-1/4 -right-4 h-2 w-2 animate-bounce rounded-full" />
<div class="bg-info absolute bottom-1/4 -left-4 h-2 w-2 animate-pulse rounded-full" />
```

**Specifications:**

- **Positions:** Corners and quarter points
- **Sizes:** 4px, 3px, 2px, 2px
- **Animations:** ping, pulse, bounce, pulse
- **Colors:** primary, secondary, accent, info

---

### 4. **Complex Geometric Backgrounds**

Multiple layered backgrounds with animations:

#### Layer 1: Rotating Dashed Border

```tsx
<div class="animate-spin-slow absolute inset-0">
  <div class="border-primary/30 absolute inset-0 rounded-full border-2 border-dashed" />
  <div class="border-secondary/40 absolute inset-4 animate-pulse rounded-full border border-dotted" />
</div>
```

#### Layer 2: Holographic Glass Frame

```tsx
<div class="relative p-2">
  <div class="from-primary/20 via-secondary/20 to-accent/20 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r blur-xl" />
  <div class="glass relative rounded-full p-3 hover:scale-105" />
</div>
```

#### Layer 3: Animated Gradient Overlay

```tsx
<div class="from-primary to-secondary animate-gradient absolute inset-0 rounded-full bg-gradient-to-br opacity-50" />
```

#### Layer 4: Hover Overlay

```tsx
<div class="from-primary/20 to-secondary/20 absolute inset-0 rounded-full bg-gradient-to-t via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
```

---

### 5. **Photo Frame Effects**

Main profile photo with multiple effects:

```tsx
<ImgHisyam
  class="
    border-base-content/10 
    group-hover:shadow-primary/30 
    relative h-72 w-72 
    rounded-full border-4 
    object-cover shadow-2xl 
    filter transition-all duration-700 
    group-hover:scale-105 
    group-hover:brightness-110 
    lg:h-96 lg:w-96
  "
/>
```

**Effects:**

- **Base:** 288px × 288px (mobile), 384px × 384px (desktop)
- **Border:** 4px border with low opacity
- **Shadow:** 2xl shadow, enhanced on hover
- **Hover:** Scale 1.05 + brightness 110%
- **Transition:** 700ms smooth transition

---

### 6. **Status Indicator**

Live status badge with pulse animation:

```tsx
<div class="bg-base-100/90 border-base-content/10 absolute right-4 bottom-4 flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-sm">
  <div class="bg-success h-2 w-2 animate-pulse rounded-full" />
  <span class="text-xs font-medium">Available</span>
</div>
```

**Features:**

- **Position:** Bottom right corner
- **Background:** Frosted glass effect
- **Indicator:** Green pulsing dot
- **Text:** "Available" status

---

## 🎭 CSS Animations

### Custom Animations in `global.css`:

```css
/* Slow spin - 20s clockwise */
.animate-spin-slow {
  animation: spin 20s linear infinite;
}

/* Reverse spin - 15s counter-clockwise */
.animate-spin-reverse {
  animation: spin-reverse 15s linear infinite;
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

/* Gradient animation */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

### Built-in Tailwind Animations:

- `animate-pulse` - Fade in/out (2s)
- `animate-ping` - Expand & fade (1s)
- `animate-bounce` - Bounce up/down (1s)

---

## 🛠️ Tech Stack Icons

### Available Icons (5 in Single Orbit):

1. **Linux** - `QLinuxIcon` (from developer-icons) - Top position
2. **TypeScript** - `QTypeScriptIcon` (from developer-icons) - Top-Right diagonal
3. **Qwik** - `QQwikIcon` (from developer-icons) - Right position
4. **Encore.dev** - Custom SVG (no package available) - Bottom position
5. **Golang** - `QGoIcon` (from developer-icons) - Left position

### Custom Encore.dev Icon:

```tsx
<svg class="h-7 w-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.47l7 3.5v7.06l-7-3.5V9.47zm16 0v7.06l-7 3.5v-7.06l7-3.5z" />
</svg>
```

---

## 🎨 Color Scheme

### DaisyUI Theme Colors:

- **Primary:** Main brand color (blue)
- **Secondary:** Accent brand color (purple)
- **Accent:** Highlight color (pink/orange)
- **Info:** Information color (cyan)
- **Success:** Status indicator (green)

### Opacity Variations:

- `/20` - Very subtle (20% opacity)
- `/30` - Subtle (30% opacity)
- `/40` - Moderate (40% opacity)
- `/50` - Half visible (50% opacity)

---

## 🚀 Performance Considerations

### Why This Approach Works:

1. **Pure CSS Animations**
   - No JavaScript overhead
   - GPU-accelerated transforms
   - No layout recalculation

2. **No Scroll Triggers**
   - Animations run on page load
   - No Intersection Observers
   - No scroll event listeners

3. **Layered Approach**
   - Each effect is independent
   - Can be toggled individually
   - Easy to debug

4. **Pointer Events**
   - `pointer-events-none` on decorative elements
   - `pointer-events-auto` on interactive icons
   - Prevents interference with user interaction

---

## 📱 Responsive Behavior

### Mobile (< 768px):

- Photo: 288px × 288px (h-72 w-72)
- Icon size: 48px (h-12 w-12)
- Particle size: Same as desktop
- Orbit radius: Adjusted with translate

### Tablet (768px - 1024px):

- Photo: 320px × 320px (h-80 w-80)
- Icon size: 48px (maintained)
- Animations: Same speed

### Desktop (> 1024px):

- Photo: 384px × 384px (h-96 w-96)
- Icon size: 48px (maintained)
- Full effects enabled

---

## 🎯 Interaction States

### Hover Effects:

**Photo:**

- Scale: 1.0 → 1.05
- Brightness: 100% → 110%
- Shadow: 2xl → primary/30
- Overlay: opacity 0 → 100

**Orbiting Icons:**

- Scale: 1.0 → 1.1
- Transition: 300ms ease
- Cursor: pointer
- Interactive tooltip available

**Glass Frame:**

- Scale: 1.0 → 1.05
- Duration: 500ms
- Easing: ease-in-out

---

## 🔧 Customization Guide

### Change Orbit Speed:

```css
/* Slower orbit */
.animate-spin-slow {
  animation: spin 30s linear infinite;
}

/* Faster orbit */
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
```

### Add More Icons:

```tsx
{
  /* New position - Top Right diagonal */
}
<div class="absolute top-0 right-0 translate-x-4 -translate-y-4">
  <div class="bg-base-100 border-primary/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg">
    <YourIcon className="h-7 w-7" />
  </div>
</div>;
```

### Change Colors:

```tsx
{/* Use different theme colors */}
<div class="bg-warning h-1 w-1 animate-ping" />
<div class="bg-error h-1 w-1 animate-pulse" />
```

### Adjust Particle Density:

```tsx
{
  /* Add more particles */
}
<div
  class="bg-accent absolute top-40 right-32 h-0.5 w-0.5 animate-ping"
  style="animation-delay: 3s"
/>;
```

---

## 📊 Animation Timeline

```
0s  ─────────────────────────────────────────────
    │ Main orbit starts (clockwise) - 5 icons
    │ Gradient animation starts
    │ Pulse animations start
    │ Ping animations start
    │
0.5s ─── Secondary pulse starts
    │
1s  ─── Accent ping starts
    │
1.5s ─── Primary ping starts
    │
2s  ─── Info pulse starts
    │
5s  ─── Gradient animation loops
    │
20s ─── Main orbit completes one rotation
    │
∞   ─── All animations continue infinitely
```

---

## ✅ Benefits

### Visual Appeal:

- ✨ Eye-catching hero section
- 🎨 Professional & modern design
- 🎭 Subtle but engaging animations
- 💎 Premium feel

### User Experience:

- 🚫 No scroll jump issues
- ⚡ Fast page load
- 📱 Responsive on all devices
- ♿ Doesn't interfere with accessibility

### Technical:

- 🎯 Pure CSS animations
- 🔧 Easy to customize
- 🐛 Easy to debug
- 📦 No external dependencies (except developer-icons)

---

## 🐛 Troubleshooting

### Icons Not Rotating:

- Check that `animate-spin-slow` class is applied
- Verify CSS animation is defined in global.css
- Check browser DevTools for animation errors

### Particles Not Visible:

- Check z-index stacking
- Verify colors match theme
- Check `pointer-events-none` doesn't hide them

### Performance Issues:

- Reduce number of particles
- Increase animation duration
- Use `will-change: transform` on animated elements

---

## 📚 Related Files

- `frontend/src/components/starter/hero/hero.tsx` - Hero component
- `frontend/src/global.css` - Animation definitions
- `frontend/src/integrations/react/tech-icons.tsx` - Icon exports
- `frontend/CLEAN_LANDING_PAGE.md` - Landing page documentation

---

## 🎉 Status

**✅ PRODUCTION READY**

All visual effects are:

- ✅ Fully implemented
- ✅ Performance optimized
- ✅ Responsive
- ✅ Cross-browser compatible
- ✅ No scroll issues
- ✅ Accessible

---

**Created:** 2025-01-XX  
**Author:** Hisyam Kamil  
**Version:** 1.0.0  
**Status:** Complete
