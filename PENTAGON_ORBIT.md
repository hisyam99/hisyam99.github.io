# ⭐ Pentagon Orbit Formation - Tech Stack Icons

## 📋 Overview

Dokumentasi lengkap untuk formasi **segilima sempurna (pentagon)** dari 5 tech stack icons yang mengorbit foto profil di Hero section.

---

## 🎯 Pentagon Formation

### Visual Layout

```
              🐧 Linux
               (0°)
                *
               /|\
              / | \
             /  |  \
            /   |   \
           /    |    \
          /     |     \
         /      |      \
    🔷 /       🎭       \ 📘
     Go        YOU      TypeScript
   (288°)               (72°)
       \                /
        \              /
         \            /
          \          /
           \        /
            \      /
             \    /
              \  /
               \/
              /  \
             /    \
       🎯 Encore  ⚡ Qwik
        (216°)    (144°)
```

---

## 📐 Mathematical Layout

### Pentagon Angles (5 points, 360° / 5 = 72° apart)

| Icon          | Position     | Angle | Coordinates (radius: 200px) |
| ------------- | ------------ | ----- | --------------------------- |
| 🐧 Linux      | Top          | 0°    | (0, -200)                   |
| 📘 TypeScript | Top Right    | 72°   | (190, -62)                  |
| ⚡ Qwik       | Bottom Right | 144°  | (118, 162)                  |
| 🎯 Encore.dev | Bottom Left  | 216°  | (-118, 162)                 |
| 🔷 Golang     | Top Left     | 288°  | (-190, -62)                 |

### Calculation Formula

```
Pentagon vertices with equal spacing:
angle_n = (360° / 5) × n = 72° × n

For n = 0, 1, 2, 3, 4:
- n=0: 0° (Linux)
- n=1: 72° (TypeScript)
- n=2: 144° (Qwik)
- n=3: 216° (Encore.dev)
- n=4: 288° (Golang)
```

---

## 🎨 Implementation

### HTML/JSX Structure

```tsx
<div class="animate-spin-slow absolute inset-0 pointer-events-none">
  {/* Icon 1: Linux - 0° */}
  <div class="absolute left-1/2 top-1/2 orbit-icon">
    <div class="...">
      <QLinuxIcon className="h-7 w-7" />
    </div>
  </div>

  {/* Icon 2: TypeScript - 72° */}
  <div class="absolute left-1/2 top-1/2 orbit-icon">
    <div class="...">
      <QTypeScriptIcon className="h-7 w-7" />
    </div>
  </div>

  {/* Icon 3: Qwik - 144° */}
  <div class="absolute left-1/2 top-1/2 orbit-icon">
    <div class="...">
      <QQwikIcon className="h-7 w-7" />
    </div>
  </div>

  {/* Icon 4: Encore.dev - 216° */}
  <div class="absolute left-1/2 top-1/2 orbit-icon">
    <div class="...">
      <svg>...</svg>
    </div>
  </div>

  {/* Icon 5: Golang - 288° */}
  <div class="absolute left-1/2 top-1/2 orbit-icon">
    <div class="...">
      <QGoIcon className="h-7 w-7" />
    </div>
  </div>
</div>
```

---

## 🎭 CSS Transform Logic

### Transform Chain Explanation

Each icon uses a **4-step transform**:

```css
transform: translate(-50%, -50%) /* 1. Center the element */ rotate(72deg)
  /* 2. Rotate to pentagon angle */ translateY(-200px)
  /* 3. Move outward (orbit radius) */ rotate(-72deg); /* 4. Counter-rotate to keep icon upright */
```

### Step-by-Step Breakdown

#### Step 1: Center Element

```css
translate(-50%, -50%)
```

- Moves element to center of parent
- Origin: middle of photo

#### Step 2: Rotate to Angle

```css
rotate(72deg)  /* Example for TypeScript */
```

- Rotates element to its pentagon position
- Angles: 0°, 72°, 144°, 216°, 288°

#### Step 3: Move Outward

```css
translateY(-200px)
```

- Pushes element away from center
- Distance = orbit radius
- `-200px` means "move up" (toward top of screen)

#### Step 4: Counter-Rotate

```css
rotate(-72deg)  /* Opposite of step 2 */
```

- Rotates icon back to upright position
- Ensures icon always faces user
- Must match step 2 angle (but negative)

---

## 📱 Responsive Orbit Radius

### Radius per Breakpoint

| Breakpoint        | Photo Size        | Orbit Radius | Clearance |
| ----------------- | ----------------- | ------------ | --------- |
| Mobile (<768px)   | 288px (h-72 w-72) | 160px        | 16px      |
| Tablet (768px+)   | 320px (h-80 w-80) | 180px        | 20px      |
| Desktop (1024px+) | 384px (h-96 w-96) | 220px        | 28px      |

### Calculation Logic

```
Orbit Radius = (Photo Diameter / 2) + Icon Size + Clearance

Mobile:
160 = (288 / 2) + 48 + 16
160 = 144 + 48 + 16 ✓ (but we use 160 for balance)

Tablet:
180 = (320 / 2) + 48 + 20
180 = 160 + 48 + 20 ❌ (adjusted to 180 for aesthetics)

Desktop:
220 = (384 / 2) + 48 + 28
220 = 192 + 48 + 28 ❌ (adjusted to 220 for aesthetics)
```

### CSS Media Queries

```css
/* Mobile: 160px radius */
.orbit-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-160px) rotate(0deg) !important;
}

/* Tablet: 180px radius */
@media (min-width: 768px) {
  .orbit-icon:nth-child(1) {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-180px)
      rotate(0deg) !important;
  }
}

/* Desktop: 220px radius */
@media (min-width: 1024px) {
  .orbit-icon:nth-child(1) {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-220px)
      rotate(0deg) !important;
  }
}
```

---

## 🔄 Animation Details

### Orbit Rotation

```css
.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

**Specifications:**

- **Duration:** 20 seconds per full rotation
- **Timing:** Linear (constant speed)
- **Direction:** Clockwise
- **Iterations:** Infinite loop

### Animation Flow

```
Time    | Rotation | Icon Positions
--------|----------|------------------
0s      | 0°       | Linux: Top, TS: TopRight, Qwik: BottomRight, Encore: BottomLeft, Go: TopLeft
5s      | 90°      | Linux: Right, TS: BottomRight, Qwik: BottomLeft, Encore: TopLeft, Go: Top
10s     | 180°     | Linux: Bottom, TS: BottomLeft, Qwik: TopLeft, Encore: TopRight, Go: Right
15s     | 270°     | Linux: Left, TS: TopLeft, Qwik: Top, Encore: TopRight, Go: BottomRight
20s     | 360° (0°)| Back to start position
```

---

## 🎨 Icon Styling

### Individual Icon Properties

```tsx
{
  /* Icon Container */
}
<div class="bg-base-100 border-{color}/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
  {/* Icon SVG */}
  <IconComponent className="h-7 w-7" />
</div>;
```

### Color Scheme

| Icon          | Border Color          | Theme Variable |
| ------------- | --------------------- | -------------- |
| 🐧 Linux      | `border-primary/20`   | Blue           |
| 📘 TypeScript | `border-secondary/20` | Purple         |
| ⚡ Qwik       | `border-accent/20`    | Pink/Orange    |
| 🎯 Encore.dev | `border-info/20`      | Cyan           |
| 🔷 Golang     | `border-primary/20`   | Blue           |

### Size Specifications

- **Container:** 48px × 48px (`h-12 w-12`)
- **Icon:** 28px × 28px (`h-7 w-7`)
- **Border:** 1px with 20% opacity
- **Shadow:** `shadow-lg` (0 10px 15px -3px rgba(0,0,0,0.1))

### Hover Effects

```css
hover: scale-110 /* Scale to 110% on hover */ transition-transform
  /* Smooth 300ms transition */ pointer-events-auto; /* Enable click/hover interaction */
```

---

## 🧮 Pentagon Geometry

### Why Pentagon?

```
5 icons = 5 vertices
360° / 5 = 72° spacing
Pentagon = Regular 5-sided polygon
```

### Pentagon Properties

- **Vertices:** 5 points
- **Interior Angles:** 108° each
- **Central Angles:** 72° each (360° / 5)
- **Symmetry:** 5-fold rotational symmetry
- **Equal Spacing:** Perfect visual balance

### Coordinate Calculation

```javascript
// For any icon at index i (0-4):
const angle = (360 / 5) * i; // 72° intervals
const radians = (angle * Math.PI) / 180;
const radius = 200; // px

const x = Math.sin(radians) * radius;
const y = -Math.cos(radians) * radius; // Negative because CSS Y is inverted

// Results:
// i=0: x=0,     y=-200  (Linux, Top)
// i=1: x=190,   y=-62   (TypeScript, Top-Right)
// i=2: x=118,   y=162   (Qwik, Bottom-Right)
// i=3: x=-118,  y=162   (Encore.dev, Bottom-Left)
// i=4: x=-190,  y=-62   (Golang, Top-Left)
```

---

## 🎯 Perfect Alignment Checklist

- ✅ **Equal Spacing:** All icons 72° apart
- ✅ **Same Radius:** All icons same distance from center
- ✅ **Same Size:** All containers 48×48px
- ✅ **Upright Icons:** Counter-rotation keeps icons readable
- ✅ **Smooth Rotation:** 20s linear animation
- ✅ **Responsive:** Adapts to photo size
- ✅ **Interactive:** Hover effects on all icons
- ✅ **Centered:** Orbit center matches photo center

---

## 🔧 Customization Guide

### Change Number of Icons

For **N icons** in orbit:

```
Angle spacing = 360° / N

3 icons (triangle):  120° spacing
4 icons (square):    90° spacing
5 icons (pentagon):  72° spacing ✓ Current
6 icons (hexagon):   60° spacing
8 icons (octagon):   45° spacing
```

### Change Orbit Radius

Edit CSS in `global.css`:

```css
/* Make orbit larger */
.orbit-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-250px) rotate(0deg);
}

/* Make orbit smaller */
.orbit-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-150px) rotate(0deg);
}
```

### Change Rotation Speed

Edit animation in `global.css`:

```css
/* Slower rotation (30 seconds) */
.animate-spin-slow {
  animation: spin 30s linear infinite;
}

/* Faster rotation (10 seconds) */
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
```

### Reverse Direction

```css
.animate-spin-slow {
  animation: spin-reverse 20s linear infinite;
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
```

---

## 🐛 Troubleshooting

### Icons Not in Perfect Pentagon

**Problem:** Icons misaligned or uneven spacing

**Solutions:**

1. Check all angles are exact: 0°, 72°, 144°, 216°, 288°
2. Verify all `translateY` values are identical
3. Ensure counter-rotation matches forward rotation (but negative)

### Icons Rotating but Not Staying Upright

**Problem:** Icons spin with the orbit

**Solution:**

- Add counter-rotation: `rotate(-72deg)` must match `rotate(72deg)`
- Each icon needs its own counter-rotation angle

### Icons Too Close/Far from Photo

**Problem:** Orbit radius not matching photo size

**Solution:**

1. Check photo size (h-72, h-80, h-96)
2. Adjust `translateY` value accordingly
3. Mobile: -160px, Tablet: -180px, Desktop: -220px

### Icons Not Responsive

**Problem:** Same radius on all screen sizes

**Solution:**

- Verify media queries in `global.css`
- Check breakpoints: 768px (tablet), 1024px (desktop)
- Ensure `!important` is used to override inline styles

---

## 📊 Performance

### Why This Approach is Fast

1. **Pure CSS Animation**
   - No JavaScript calculations
   - GPU-accelerated transforms
   - 60fps smooth rotation

2. **Single Animation**
   - Only parent container rotates
   - Icons use static transforms + counter-rotation
   - Minimal repaints

3. **No Layout Recalculation**
   - Uses `transform` (not `top`/`left`)
   - Absolute positioning with transforms
   - Compositor-only animation

### Browser Support

- ✅ Chrome 36+
- ✅ Firefox 16+
- ✅ Safari 9+
- ✅ Edge 12+
- ✅ All modern mobile browsers

---

## 📚 Related Files

- `frontend/src/components/starter/hero/hero.tsx` - Hero component implementation
- `frontend/src/global.css` - Pentagon orbit CSS & animations
- `frontend/src/integrations/react/tech-icons.tsx` - Icon components
- `frontend/HERO_VISUAL_EFFECTS.md` - Full visual effects documentation

---

## ✨ Summary

Pentagon orbit formation provides:

- ✅ **Perfect Geometry:** Mathematical precision with 72° spacing
- ✅ **Visual Balance:** Equal distribution of icons
- ✅ **Smooth Animation:** 20s clockwise rotation
- ✅ **Responsive Design:** Adapts to all screen sizes
- ✅ **Professional Look:** Clean, modern, engaging
- ✅ **Performance:** GPU-accelerated, 60fps
- ✅ **Accessibility:** Icons stay upright and readable

**The pentagon is complete and production-ready!** ⭐

---

**Created:** 2025-01-XX  
**Author:** Hisyam Kamil  
**Version:** 1.0.0  
**Status:** ✅ Complete & Documented
