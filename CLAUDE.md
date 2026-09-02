# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install                # install dependencies
npm run dev                # start the Vite dev server (http://localhost:5173)
npm run build               # type-check (tsc -b) then produce a production bundle in dist/
npm run preview             # serve the production build locally
npm run lint                 # run ESLint (flat config, working again — see Tooling notes)
npm run typecheck            # type-check only, no emit
npm test                     # run the Vitest suite once
npm run test:watch           # run Vitest in watch mode
npx vitest run src/App.test.tsx   # run a single test file
npx vitest run -t "renders correctly"   # run tests matching a name pattern
```

This is a Vite + React + TypeScript single-page app (no native shell, no Metro, no CocoaPods) — a from-scratch migration off React Native. There is no `npm run ios` / `npm run android` anymore; the `android/` and `ios/` project directories, `index.js`, `app.json`, `metro.config.js`, `babel.config.js`, and `jest.config.js` were all removed as part of the migration.

Three separate local backends back the app in development: auth on `:3001`, players on `:3010`, and dashboard/games on `:3000`. `vite.config.ts`'s dev-server proxy forwards `/api/wanaka/accounts/*`, `/api/wanaka/player/*`, `/api/dashboard`, `/api/games/list`, and `/api/games/*` to those ports respectively, so app code always calls relative paths and never hardcodes a host. All three servers need to be running for the app to show real data.

## Architecture

- `index.html` is the real HTML entry point (there is no `AppRegistry`/native entry point anymore). It loads `src/main.tsx`, which calls `createRoot` on `#root` and renders `<App />` inside `<StrictMode>`.
- `src/App.tsx` builds the whole route tree with `react-router-dom`'s `createBrowserRouter` (replacing `@react-navigation`). `src/index.css` holds global resets and the light/dark color tokens (replacing `SafeAreaProvider`'s role — safe-area insets are now handled per-page with the `env(safe-area-inset-*)` CSS function instead).

### Routing

- `src/App.tsx` defines the router. `/login` is public; everything else sits behind `src/routes/RequireAuth.tsx`, which renders `<Outlet />` when `isAuthenticated()` (from `src/auth.ts`) is true and otherwise redirects to `/login` with `state={{ from: location }}` so `LoginPage` can send the user back where they were headed. This guard is the web equivalent of the native stack simply starting on `Login` — every route here is directly addressable by URL, so the check has to be explicit.
- `src/layouts/HomeLayout.tsx` is the tab-bar equivalent: a `NavLink`-based nav plus an `<Outlet />`, nesting `dashboard`, `players`, `games`, `games/:gameId`, and `settings`. The tab bar itself (`TABS` in `HomeLayout.tsx`) only lists Dashboard/Players/Settings — Games has no tab and is reached via Dashboard's "See all" link or a direct URL, but still renders inside `HomeLayout` (tab bar visible) because its route is nested under it.
- `players/:playerId` (`PlayerDetailPage`) is a **sibling** of `HomeLayout`, not nested inside it — mirroring the native app's `PlayerDetail`, which was pushed on top of the tab navigator rather than nested in it. `games/:gameId`, by contrast, *is* nested inside `HomeLayout` — that asymmetry is intentional in the current routing tree, not an oversight; keep it in mind before "fixing" one to match the other.
- An unmatched path redirects to `/dashboard`.
- `navigation.replace(...)` calls in the native app became `navigate(path, { replace: true })` (login success, logout) so the browser Back button can't return to a screen the user has left.

### Auth

- `src/auth.ts` is the whole auth layer: `login(email, password)` sends `GET {AUTH_BASE_URL}/api/wanaka/accounts/login` with `Authorization: Basic <base64(email:password)>`. The UTF-8-safe base64 encoding is now inlined (`TextEncoder` + `btoa`) instead of using the `base-64` package, since Hermes is gone and the browser's own `btoa` only needed a UTF-8 workaround.
- **Token storage changed from encrypted-at-rest to sessionStorage, and this is a real security downgrade** (documented inline in `src/auth.ts`): the browser has no equivalent of the iOS Keychain / Android Keystore, so anything reachable from JS — including sessionStorage — is readable by any script on the origin, i.e. exposed to XSS. `sessionStorage` was chosen over `localStorage` only because it's scoped to the tab and cleared on close, not because it's safe. The real fix, if/when the backend can do it, is an httpOnly/Secure/SameSite cookie so the token never reaches JS at all.
- `getAccessToken()` is now **synchronous** (a plain sessionStorage read, no `Promise`) — callers in `src/api/*.ts` call it directly, not `await`ed. `isAuthenticated()` is new; it's what `RequireAuth` checks. `logout()` clears the session-storage entry.
- `src/pages/LoginPage.tsx` calls `login()`; `src/pages/SettingsPage.tsx`'s "Log Out" button calls `logout()` and navigates to `/login`.

### Data layer

Three sibling API modules under `src/api/`, one per backend, each paired with a `use*` hook that exposes `{ data, isLoading, error }` (or the equivalent named fields) and guards against setting state after unmount / an out-of-order response:

- `src/api/players.ts` — the `Player` type (unchanged: `firstname`/`lastname`, `position`, `team`, `mobile`, `email`, numeric `block`/`defence`/`serve`/`skills`/`spike`) plus `getPlayers()` (`GET {PLAYERS_BASE_URL}/api/wanaka/player`, bare array response) and `getPlayerById(id)`, which fetches the whole roster and finds by id client-side — there is no single-player endpoint, so a bare `/players/:id` URL (deep link, refresh) pays for a full roster fetch. `src/api/usePlayers.ts` wraps `getPlayers()`.
- `src/api/dashboard.ts` — `Game` type (`id`, `court`, `date` as a unix seconds timestamp, `local`, `visit`, `setlocal`, `setvisit`) and `DashboardData` (`games`, `wins`, `losses`, `totalgames`); `getDashboardData()` hits `GET {DASHBOARD_BASE_URL}/api/dashboard`. **This replaces the old hardcoded 1000/2000/500 dashboard placeholders** — `DashboardPage`'s wins/losses/total-games are now real numbers from this endpoint (`data?.wins ?? 0` etc.; the `?? 0` only shows before the first response lands). `src/api/useDashboard.ts` wraps it.
- `src/api/games.ts` — `getGames()` (`GET {DASHBOARD_BASE_URL}/api/games/list`, bare array) and `getGameById(id)` (`GET {DASHBOARD_BASE_URL}/api/games/:id`), which returns a `PlayerGame` (`{ game: Game, players: Player[] }` — the game plus the roster that played in it, *not* a single `Game`). `src/api/useGames.ts` exposes both as `useGames()` and `useGameById(id)`.
- `src/api/config.ts` holds `AUTH_BASE_URL` / `PLAYERS_BASE_URL` / `DASHBOARD_BASE_URL`, each defaulting to `''` so requests are relative paths handled by the dev proxy. Set `VITE_AUTH_BASE_URL` / `VITE_PLAYERS_BASE_URL` / `VITE_DASHBOARD_BASE_URL` to point a production build at absolute origins — those origins then need to send CORS headers, since nothing serves the API alongside the static bundle in production.

### Components

- `src/components/PlayerRow.tsx` is the roster row, used by `PlayersPage`. It's an `<Link>` to `/players/:id` that also passes the full `Player` via router `state`, so `PlayerDetailPage` can render immediately on an in-app navigation and only falls back to `getPlayerById` on a bare URL load. It is **not** used by `DashboardPage` anymore — the dashboard's "recent" list is now games, not players (see Routing/Data layer above).
- `src/components/GameRow.tsx` is the games-list row (`DashboardPage`'s recent list and `GamesPage`'s full list), linking to `/games/:id` with the `Game` in router state — though `GamesPlayerPage` doesn't currently read that state and always refetches via `useGameById`.
- `src/components/PlayerGameRow.tsx` is a **non-navigating** near-duplicate of `PlayerRow` (it reuses `PlayerRow.module.css` rather than having its own stylesheet) used by `GamesPlayerPage` to list the players in one game; unlike `PlayerRow` it renders a plain `<div>`, not a `<Link>`, so clicking a player inside a game's roster does nothing.

### Styling

RN's per-screen `StyleSheet.create({...})` plus a `*Dark` variant branched on `useColorScheme()` has been replaced by CSS Modules colocated with each component/page (`Foo.tsx` + `Foo.module.css`), with all light/dark values defined once as CSS custom properties in `src/index.css` (`:root` for light, `@media (prefers-color-scheme: dark)` for dark) and consumed everywhere via `var(--token)`. No component branches on color scheme in JS anymore.

### Tooling notes

- TypeScript config is now split, project-references style: `tsconfig.json` just references `tsconfig.app.json` (covers `src/`, bundler module resolution, `vite/client` + `vitest/globals` + `@testing-library/jest-dom` types) and `tsconfig.node.json` (covers `vite.config.ts`, Node types). This replaces the single `@react-native/typescript-config` extend.
- `eslint.config.js` is a flat config (`typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`), self-contained in this repo. **`npm run lint` works again** — the previous state (a deleted root `.eslintrc.js` causing ESLint to walk up into an unrelated sibling config) no longer applies now that there's a flat `eslint.config.js` at the repo root.
- `.prettierrc.js` is unchanged: single quotes, trailing commas everywhere, `avoid` arrow-paren style.
- Testing moved from Jest + `react-test-renderer` + `@react-native/jest-preset` to **Vitest** + `@testing-library/react` + `jsdom`, configured inline in `vite.config.ts`'s `test` block. `src/test/setup.ts` registers `@testing-library/jest-dom` matchers and clears `sessionStorage` / unmounts after each test. `src/App.test.tsx` (replacing `__tests__/App.test.tsx`) renders `<App />` and asserts the login heading appears — matching the new default of landing on `/login` when unauthenticated, rather than just smoke-rendering the navigation tree.
- Path aliases: still none. Vite uses its own default resolution; nothing custom is configured in `vite.config.ts`.
- Removed dependencies: `react-native`, `@react-navigation/*`, `react-native-screens`, `react-native-safe-area-context`, `react-native-keychain`, `base-64`, `@react-native-community/cli*`, and all `@react-native/*` build/lint/test presets. Added: `react-router-dom`, `vite`, `@vitejs/plugin-react`, `vitest`, `@testing-library/react` + `jest-dom` + `user-event`, `jsdom`, `typescript-eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

Requires Node >= 22.11.0 (per `package.json` `engines`) — unchanged from before the migration.
