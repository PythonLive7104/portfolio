/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for Django REST Framework, e.g. https://api.example.com/api */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
