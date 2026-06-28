# Skill: nextjs

Next.js 15 App Router development patterns for QIXU.

## Key Patterns

### Server Components (default)
```tsx
// app/page.tsx - Server Component by default
export default async function Page() {
  const data = await fetchData();
  return <div>{/* render */}</div>;
}
```

### Client Components
```tsx
"use client";
import { useState } from "react";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <div />;
}
```

### Layouts
- Root layout in `app/layout.tsx`
- Nested layouts per route segment
- Layouts do not re-render on navigation

### Route Handlers
```tsx
// app/api/resource/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ data: "..." });
}
```

### Server Actions
```tsx
async function submitAction(formData: FormData) {
"use server";
// server-side logic
}
```

## Project Conventions

- App source: `apps/web/src/app/`
- Components: `apps/web/src/components/`
- Utilities: `apps/web/src/lib/`
- Shared UI: `packages/ui/src/`
- Transpile packages configured in next.config.ts
