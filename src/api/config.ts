/**
 * Base URLs for the two backends. They default to '' so requests go out as
 * relative paths and are handled by the dev-server proxy in vite.config.ts
 * (auth -> :3001, players -> :3010). Set VITE_AUTH_BASE_URL /
 * VITE_PLAYERS_BASE_URL to point a build at absolute origins instead — a
 * production deploy needs either those or an equivalent reverse proxy, since
 * nothing serves the API alongside the static bundle.
 */
export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL ?? '';
export const PLAYERS_BASE_URL = import.meta.env.VITE_PLAYERS_BASE_URL ?? '';
export const DASHBOARD_BASE_URL = import.meta.env.VITE_DASHBOARD_BASE_URL ?? '';