# Skill: supabase

Supabase integration patterns for QIXU.

> **NOTE**: Supabase is NOT installed yet. Install during Data Layer Sprint.

## Setup

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

## Client Patterns

### Server Component Client
```tsx
import { createClient } from "@/lib/supabase/server";
export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("table").select("*");
}
```

### Client Component Client
```tsx
"use client";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
```

### Route Handler / Server Action
```tsx
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();
```

## Required: RLS

All tables MUST have Row Level Security enabled. Policies based on:
- User state (anonymous/visitor/registered/etc.)
- User role (learner/parent/teacher/admin/founder)
- Data ownership

## Auth States

Map to Constitution's state machine:
- Anonymous → no session
- Visitor → temporary session (no auth)
- Registered → authenticated, profile incomplete
- Verified → email/phone verified
- Growth Profile → profile complete
- Active → recent activity
- Inactive → dormant
- Archived → deleted

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
