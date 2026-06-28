# Skill: motion

Animation patterns for QIXU using framer-motion.

## Principles

- Soft, natural motion; never jarring
- Duration: 150ms–300ms for UI transitions
- Easing: ease-out by default
- Respect `prefers-reduced-motion`
- AI Guardian (苹小浣) animations should feel warm and gentle

## Common Patterns

### Page Transitions
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Hover/Tap
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Click me
</motion.button>
```

### Stagger Children
```tsx
<motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Reduced Motion
Use `useReducedMotion` hook:
```tsx
const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2 };
```
