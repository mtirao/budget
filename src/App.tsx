import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import RequireAuth from './routes/RequireAuth';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import PlayersPage from './pages/PlayersPage';
import GamesPage from './pages/GamesPage';
import GamesPlayerPage from './pages/GamesPlayerPage';
import SettingsPage from './pages/SettingsPage';

/**
 * Mirrors the native navigation tree: a root stack holding Login, the tabbed
 * Home area, and PlayerDetail pushed on top of (not nested inside) the tabs.
 * The tab bar becomes HomeLayout's nav + <Outlet />; the stack's `replace` on
 * login/logout becomes <Navigate replace> so Back can't return to a screen the
 * user has left.
 */
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'players', element: <PlayersPage /> },
          { path: 'games', element: <GamesPage /> },
          {path: 'games/:gameId', element: <GamesPlayerPage />},
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
      { path: 'players/:playerId', element: <PlayerDetailPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
