/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_BASE_URL?: string;
  readonly VITE_PLAYERS_BASE_URL?: string;
  readonly VITE_DASHBOARD_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
