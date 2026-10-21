# Official Dokploy UI source snapshot

Repository: https://github.com/Dokploy/dokploy
Reference: `main` at `05970e7b234d4742ceab2967490597fbde47dbdd`.

This directory contains 481 public source files from `apps/dokploy/{components,pages,styles,hooks,utils,lib}`, excluding every `proprietary` directory. All are unchanged except removal of upstream example certificate/private-key blobs in `handle-certificate.tsx`. `manifest.json` records each upstream path and SHA-256, plus the imported hash and reason for that sanitized file. Copyright and licensing are retained in `LICENSE.MD`; `LICENSE_PROPRIETARY.md` is included only to document exclusions, not grant rights to proprietary code.

Included: API/CLI key creation/listing, subscriptions, invoices, payment-method/portal controls, projects, application/Compose/database settings, deployment/log/monitoring screens, layouts, settings and UI primitives.

These are source materials, not 481 activated Aetheris screens. Next.js routing, tRPC calls, Stripe environment variable references and unavailable imports remain upstream references in this snapshot; this directory is outside `src` and is neither compiled nor served. No server runtime, environment files, binary assets, customer records or provider credentials were imported. Private-key header placeholders in SSH/certificate forms are field hints, not actual keys.

Executable adaptations use Aetheris authentication, data and routing. API key and billing presentation are adapted from `components/dashboard/settings/{api,billing}`. Upstream prices, product IDs, free-trial promises and server entitlements are NOT Aetheris business rules. Payment processing remains unavailable until Aetheris configures its own provider. Proprietary UI and hosted Dokploy services are not part of this import.

Run `bun test tests/vendor-dokploy.test.ts` to verify provenance, exclusions and absence of credential literals.