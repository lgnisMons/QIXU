# Skill: tailwind

Tailwind CSS patterns for QIXU design system.

## Semantic Tokens

Always use semantic color tokens, never raw colors:

```tsx
// ✅ Correct
className="bg-primary text-primary-foreground"
className="bg-surface text-foreground"
className="bg-success text-success-foreground"
className="border-border"
className="text-muted-foreground"

// ❌ Wrong
className="bg-white text-black"
className="bg-blue-500"
className="text-gray-400"
```

## Available Semantic Colors

- `background`, `foreground`
- `surface`, `surface-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `success`, `success-foreground`
- `warning`, `warning-foreground`
- `danger`, `danger-foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`
- `border`, `input`, `ring`
- `destructive` (alias for danger)

## Dark Mode

Uses class-based dark mode (`darkMode: ["class"]`). Dark mode tokens defined under `.dark` in globals.css.

## Radius

Use `rounded-sm`, `rounded-md`, `rounded-lg` which map to `--radius` token.

## Responsive

Mobile-first: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
Container: `container` class centers content with max-width 1400px.

## Class Merging

Always use `cn()` from `@qixu/utils` for conditional classes:
```tsx
import { cn } from "@qixu/utils";
className={cn("base-classes", active && "bg-primary", className)}
```
