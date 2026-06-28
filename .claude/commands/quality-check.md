# Command: quality-check

Run all quality checks.

```bash
pnpm typecheck && pnpm lint && pnpm format:check
```

Checks:
- TypeScript types pass
- ESLint has no errors
- Prettier formatting is consistent
