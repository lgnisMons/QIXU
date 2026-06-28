# Skill: shadcn

shadcn/ui component patterns for QIXU.

## Adding Components

```bash
pnpm dlx shadcn@latest add [component-name]
```

Components are added to `apps/web/src/components/ui/`.

## Configuration

Config in `apps/web/components.json`:
- Style: default
- RSC: true (React Server Components)
- TypeScript: true
- Tailwind CSS variables: true
- Aliases:
  - components: `@/components`
  - utils: `@/lib/utils`
  - ui: `@/components/ui`

## Shared Components

Reusable across features go to `packages/ui/src/components/` and export from `packages/ui/src/index.ts`.

## cva Pattern

All component variants use class-variance-authority:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@qixu/utils";

const componentVariants = cva("base styles", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      ghost: "hover:bg-accent",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

## Forward Refs

All interactive components use `React.forwardRef`:
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ className }))} {...props} />
  )
);
Button.displayName = "Button";
```
