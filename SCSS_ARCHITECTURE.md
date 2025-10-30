# SCSS Architecture Documentation

## 📁 File Structure

```
src/shared/styles/
├── _design-tokens.scss      # All design tokens (DO NOT REPEAT VALUES!)
├── _colors.scss              # Brand colors only
├── _variables.scss           # Breakpoints
├── _mixins.scss              # Reusable mixins
├── main.scss                 # Main entry point
├── index.css                 # Import main.scss
├── App.css                   # Animations
└── components/
    ├── _header.scss
    ├── _categories.scss
    ├── _product-card.scss
    ├── _product-list.scss
    └── _whatsapp-button.scss
```

---

## 🎨 Design Tokens (`_design-tokens.scss`)

### Font Sizes
```scss
$font-size-xs: 0.75em;      // 12px
$font-size-sm: 0.875em;     // 14px
$font-size-base: 1em;       // 16px (base)
$font-size-md: 1.125em;     // 18px
$font-size-lg: 1.25em;      // 20px
$font-size-xl: 1.5em;       // 24px
$font-size-2xl: 1.875em;    // 30px
$font-size-3xl: 2.25em;     // 36px
$font-size-4xl: 3em;        // 48px
```

### Font Weights
```scss
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-extrabold: 800;
$font-weight-black: 900;
```

### Spacing (8px grid)
```scss
$space-0: 0;
$space-1: 0.25rem;    // 4px
$space-2: 0.5rem;     // 8px
$space-3: 0.75rem;    // 12px
$space-4: 1rem;       // 16px
$space-5: 1.25rem;    // 20px
$space-6: 1.5rem;     // 24px
$space-8: 2rem;       // 32px
$space-10: 2.5rem;    // 40px
$space-12: 3rem;      // 48px
$space-16: 4rem;      // 64px
$space-20: 5rem;      // 80px
$space-24: 6rem;      // 96px
```

### Border Radius
```scss
$radius-sm: 0.25rem;      // 4px
$radius-base: 0.5rem;     // 8px
$radius-md: 0.75rem;      // 12px
$radius-lg: 1rem;         // 16px (brand)
$radius-xl: 1.5rem;       // 24px (brand-lg)
$radius-2xl: 2rem;        // 32px
$radius-full: 9999px;
```

### Transitions
```scss
$duration-fast: 150ms;
$duration-base: 300ms;
$duration-slow: 500ms;
$duration-slower: 1000ms;

$easing-linear: linear;
$easing-in: ease-in;
$easing-out: ease-out;
$easing-in-out: ease-in-out;
```

### Opacity
```scss
$opacity-0: 0;
$opacity-10: 0.1;
$opacity-20: 0.2;
// ... up to
$opacity-100: 1;
```

### Container Max Widths
```scss
$container-sm: 640px;
$container-md: 768px;
$container-lg: 1024px;
$container-xl: 1280px;
$container-2xl: 1400px;
```

---

## 🔧 Mixins (`_mixins.scss`)

### Typography Mixins
```scss
@include text-xs;    // font-size + line-height
@include text-sm;
@include text-base;
@include text-lg;
@include text-xl;
@include text-2xl;
@include text-3xl;
```

### Layout Mixins
```scss
@include flex-center;       // display: flex + align + justify center
@include flex-column;       // display: flex + flex-direction: column
@include flex-between;      // display: flex + justify-content: space-between
```

### Border Radius Mixins
```scss
@include border-radius-brand;      // 1rem
@include border-radius-brand-lg;   // 1.5rem
```

### Shadow Mixins
```scss
@include shadow-soft;       // Light shadow
@include shadow-soft-lg;    // Medium shadow
@include shadow-brand;      // Brand shadow
@include shadow-brand-lg;   // Large brand shadow
```

### Transition Mixins
```scss
@include transition-all;        // 300ms ease-in-out
@include transition-transform;  // transform only
@include transition-fast;       // 150ms
@include transition-slow;       // 500ms
```

### Hover Effect Mixins
```scss
@include hover-lift;                // Lift on hover with optional distance
@include hover-lift(-8px);         // Custom lift distance
@include hover-scale;               // Scale on hover (default 1.05)
@include hover-scale(1.1);         // Custom scale
@include hover-glow;                // Add glow shadow on hover
```

### Button Mixins
```scss
@include button-base;       // Base button styles
@include button-primary;    // Primary brand button
@include button-accent;     // Accent brand button
```

### Gradient Mixins
```scss
@include gradient-brand-primary;    // Primary brand gradient
@include gradient-brand-accent;     // Accent brand gradient
@include gradient-emerald-cyan;     // Categories gradient
@include gradient-green;            // WhatsApp button gradient
```

### Responsive Mixins
```scss
@include mobile { }    // max-width: 640px
@include tablet { }    // min-width: 640px
@include desktop { }   // min-width: 1024px
@include xl { }        // min-width: 1280px
```

### Card Mixins
```scss
@include card;          // Basic card with shadow
@include card-hover;    // Card with hover effect
```

---

## 📝 Usage Examples

### ❌ **WRONG** - Repeating values
```scss
.my-component {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  transition: all 300ms ease-in-out;
}
```

### ✅ **CORRECT** - Using design tokens
```scss
.my-component {
  @include text-xl;
  font-weight: $font-weight-bold;
  padding: $space-4 $space-5;
  @include border-radius-brand;
  @include transition-all;
}
```

### ❌ **WRONG** - Hardcoded hover effects
```scss
.my-button {
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }
}
```

### ✅ **CORRECT** - Using mixins
```scss
.my-button {
  @include hover-lift;
  @include hover-glow;
}
```

---

## 🎯 BEM Naming Convention

All components use BEM (Block__Element--Modifier) naming:

```scss
.product-card { }                    // Block
.product-card__image { }             // Element
.product-card__image--featured { }   // Modifier
```

---

## 🚀 Benefits of This Architecture

1. **No Code Repetition** - Use tokens and mixins
2. **Easy Maintenance** - Change once, applies everywhere
3. **Consistent Design** - All components use same values
4. **Scalable** - Add new tokens/mixins as needed
5. **Type-Safe** - SCSS variables prevent typos
6. **Performance** - Compiled to optimized CSS

---

## 📦 How to Add New Styles

### 1. Need a new font size?
Add to `_design-tokens.scss`:
```scss
$font-size-5xl: 4em;
```

Create mixin in `_mixins.scss`:
```scss
@mixin text-5xl {
  font-size: $font-size-5xl;
  line-height: $line-height-tight;
}
```

### 2. Need a new spacing value?
Add to `_design-tokens.scss`:
```scss
$space-32: 8rem;
```

Use directly:
```scss
padding: $space-32;
```

### 3. Need a new component?
Create `components/_my-component.scss`:
```scss
@use '../colors' as *;
@use '../mixins' as *;
@use '../design-tokens' as *;

.my-component {
  @include text-base;
  padding: $space-4;
  // ... styles using tokens
}
```

Add to `main.scss`:
```scss
@use './components/my-component';
```

---

## ⚠️ Rules to Follow

1. **NEVER** hardcode values like `16px`, `1rem`, `#333`
2. **ALWAYS** use design tokens from `_design-tokens.scss`
3. **ALWAYS** use mixins for common patterns
4. **FOLLOW** BEM naming convention
5. **USE** semantic variable names
6. **IMPORT** in correct order:
   ```scss
   @use '../design-tokens' as *;  // First
   @use '../colors' as *;          // Second
   @use '../mixins' as *;          // Third
   ```

---

## 🔍 Quick Reference

| Need | Use |
|------|-----|
| Font size | `@include text-*` or `$font-size-*` |
| Spacing | `$space-*` (1-24) |
| Color | `$brand-*` or `$gray-*` |
| Shadow | `@include shadow-*` |
| Transition | `@include transition-*` |
| Hover effect | `@include hover-*` |
| Border radius | `@include border-radius-brand*` |
| Layout | `@include flex-*` |
| Button | `@include button-*` |
| Responsive | `@include mobile/tablet/desktop/xl { }` |

---

## 📚 Resources

- [SCSS Documentation](https://sass-lang.com/documentation)
- [BEM Methodology](http://getbem.com/)
- [Design Tokens](https://www.designtokens.org/)

---

**Last Updated:** October 2025
**Version:** 2.0
**Maintainer:** Development Team
