# Project Understanding Notes

## What this repository is
- A monorepo for **Uni-Nest**, a university hostel booking platform targeting Uganda.
- It serves three user segments with separate web apps:
  - `apps/student` for students
  - `apps/owner` for hostel owners
  - `apps/admin` for super-admin operations

## Monorepo architecture
- Root workspace uses npm workspaces over `apps/*` and `packages/*`.
- Shared logic is split into:
  - `packages/shared`: auth context, route protection, common types, Supabase client setup
  - `packages/ui`: reusable UI primitives/components

## Runtime stack
- Frontend: React + TypeScript + Vite
- Styling/UI: Tailwind CSS + Radix UI
- Backend platform: Supabase (Auth + Postgres + Realtime)
- Routing: `react-router-dom`

## App-level behavior
### Student app
- Public routes for home/search/hostel details and an auth page.
- Protected student dashboard route guarded by role-based access.

### Owner app
- Redirects `/` to owner dashboard.
- Protected owner dashboard route requiring `hostel_owner` role.

### Admin app
- Redirects `/` to admin dashboard.
- Protected admin area requiring `super_admin` role.
- Nested routes for dashboard modules like users, hostels, bookings, payments, reviews, reports, verification, universities, and settings.

## Key operational notes
- Supabase SQL migrations live in `supabase/` and include phased schema/security updates.
- Deployment docs and preset configs exist for Vercel and other static hosts.
- Root scripts support independent dev servers and workspace-wide builds.

## Known errors and bugs (current repository state)
1. **Runtime `ReferenceError` risk in admin UsersManager**
   - `UsersManager.tsx` calls `cn(...)` but never imports it from `@/lib/utils`.
   - This can crash rendering when those code paths execute.

2. **Runtime `ReferenceError` risk in admin HostelsManager**
   - `HostelsManager.tsx` also uses `cn(...)` without importing it.
   - Same runtime failure mode as above.

3. **Stale error artifacts conflict with current code**
   - `tsc-errors.txt` reports TypeScript errors against `src/pages/HostelDetail.tsx` at line numbers >150, but the current file has only 23 lines.
   - This indicates old logs in the repository that may mislead debugging.

4. **Build-size/performance warnings**
   - `npm run build --workspaces --if-present` succeeds, but admin and owner builds emit Vite warnings for chunks larger than 500 kB after minification.
   - This is not a correctness bug, but it is a production performance risk.
