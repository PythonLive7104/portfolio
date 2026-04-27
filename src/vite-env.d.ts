/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API base, e.g. `http://127.0.0.1:8000/api` for local Django */
  readonly VITE_API_URL?: string
  /** `true` / `false` to force mock or API (overrides defaults) */
  readonly VITE_USE_MOCK?: string
  /** In production builds: set `true` with `VITE_API_URL` to use a hosted API instead of mock data */
  readonly VITE_USE_API?: string
  /** Optional origin for contact API in dev, e.g. `http://127.0.0.1:3000` when using `vercel dev` */
  readonly VITE_CONTACT_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
