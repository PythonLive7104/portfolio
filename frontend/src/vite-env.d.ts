/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base path or URL for DRF, e.g. `/api` (production) or `http://127.0.0.1:8000/api` (local) */
  readonly VITE_API_URL?: string
  /** Set `true` to force mock data even when `VITE_API_URL` is set */
  readonly VITE_USE_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
