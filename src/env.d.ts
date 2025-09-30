/// <reference types="@builder.io/qwik-city/vite" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string
  readonly VITE_GRAPHQL_WS_ENDPOINT: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly PUBLIC_GRAPHQL_ENDPOINT: string
  readonly PUBLIC_BASE_URL: string
  readonly ORIGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}