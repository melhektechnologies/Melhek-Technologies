# MELHEK Pharmacy Management System

This repo now includes a production-oriented pharmacy SaaS foundation at `/pharmacy`.

## Included enterprise modules

- Authentication-ready RBAC scaffolding (`src/lib/pharmacy/rbac.ts`)
- Executive dashboard (`/pharmacy`)
- Inventory + batch + expiry monitoring (`/pharmacy/inventory`)
- Prescription workflow (`/pharmacy/prescriptions`)
- POS module (`/pharmacy/pos`)
- Supplier management (`/pharmacy/suppliers`)
- Multi-branch control (`/pharmacy/branches`)
- Reporting exports (`/pharmacy/reports`)
- AI intelligence workspace (`/pharmacy/ai`)
- System configuration (`/pharmacy/settings`)

## Backend/API foundation

- Domain models + realistic demo data:
  - `src/lib/pharmacy/types.ts`
  - `src/lib/pharmacy/demo-data.ts`
- API routes:
  - `GET /api/pharmacy/dashboard`
  - `GET /api/pharmacy/inventory?status=&q=`

## Database architecture

Prisma schema at `prisma/schema.prisma` includes:

- Users + RBAC roles
- Branches (multi-site)
- Medicines with expiry + batch
- Prescriptions + line items
- Sales + sale items
- Suppliers
- Audit logs

It is migration-ready for PostgreSQL and structured for soft-delete + indexing + branch-aware operations.

## Environment + deployment readiness

- `.env.example` includes DB, auth, Redis, queue, notification, monitoring variables.
- Structure is compatible with Vercel frontend and Railway/Supabase/Postgres backends.

## Next steps to reach full production

1. Wire real auth provider + JWT/session middleware.
2. Add Prisma client and migrate schema.
3. Replace demo datasets with service/repository layer.
4. Add Redis cache + background jobs for notifications/report scheduling.
5. Add OCR pipeline + prescription validation rules.
6. Add e2e tests and CI gates.
