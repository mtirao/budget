import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import MatchesPage from './pages/MatchesPage';
import SettingsPage from './pages/SettingsPage';
import PlayersPage from './pages/PlayersPage';
import GameDetailsPage  from './pages/GameDetailsPage';

/**
 * There is no tab bar anymore — DashboardPage owns the app's one page shell
 * (sidebar/top bar/mobile nav, ported from design.html), and every other
 * screen is a plain sibling route reached from its links. The stack's
 * `replace` on login/logout becomes <Navigate replace> so Back can't return
 * to a screen the user has left.
 */
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <RequireAuth />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: '/games', element: <MatchesPage /> },
      { path: '/players', element: <PlayersPage /> },
      { path: '/players/:playerId', element: <PlayerDetailPage /> },
      { path: '/gamedetails', element: <GameDetailsPage/>},
      { path: 'settings', element: <SettingsPage /> },
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
