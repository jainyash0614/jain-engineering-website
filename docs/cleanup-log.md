# Cleanup Log

## Baseline

- Date: 2026-02-18
- Branch: `chore/cleanup-unused-code`
- Framework: React + Vite + React Router
- Entry points:
  - `src/main.tsx`
  - `src/app/App.tsx`
  - `src/styles/index.css`
- Routing surface (from `src/app/App.tsx`):
  - `/` -> `Home`
  - `/about` -> `About`
  - `/products` -> `ProductsIndex`
  - `/products/electrical-metal-boxes` -> `ElectricalMetalBoxes`
  - `/products/floor-distribution-system` -> `FloorDistributionSystem`
  - `/products/:slug` -> `ProductDetail`
  - `/principles` -> `Principles`
  - `/manufacturing` -> `Manufacturing`
  - `/quality` -> `Quality`
  - `/resources` -> `Resources`
  - `/downloads` -> `Downloads`
  - `/contact` -> `Contact`
  - `/partner` -> `BecomePartner`
- Dynamic loading checks:
  - `import(` search: none
  - `lazy` / `React.lazy` / `next/dynamic`: none

## Baseline checks

- `npm run build`: pass
- `npm run lint`: not configured (`Missing script: lint`)
- `npm test`: not configured (`Missing script: test`)
- Dev route smoke checks (HTTP 200):
  - `/`
  - `/about`
  - `/products`
  - `/products/jeb-400x300x200`
  - `/manufacturing`
  - `/contact`

## Candidate shortlist

### Safe (`✅`)
- Unused import in `src/app/App.tsx`: `Products` from `./pages/Products`
- Unused constant in `src/app/pages/Home.tsx`: `productCategories`
- Unused icon imports in `src/app/pages/Home.tsx` used only by removed constant

### Uncertain (`⚠️`)
- `src/app/pages/Products.tsx` appears unreachable from routes, but will quarantine in a later batch instead of deleting directly.

## Batch 1

### Removed
- Unused import: `Products` in `src/app/App.tsx`
- Dead constant block: `productCategories` in `src/app/pages/Home.tsx`
- Dead icon imports in `src/app/pages/Home.tsx`: `Box`, `Building`, `Home as HomeIcon`, `Warehouse`, `Settings`, `Wrench`

### Reason
- No runtime reference from reachable routes/components.
- Verified by direct references search and route map.

### Verification
- `npm run build`: pass
- Route smoke checks: pass on key routes listed above.

