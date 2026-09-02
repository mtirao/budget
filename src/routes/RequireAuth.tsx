import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth';

/**
 * The native app could simply start the stack on Login, because no other
 * screen was reachable without going through it. Every route here is
 * addressable by URL, so the guard has to be explicit.
 */
function RequireAuth() {
  const location = useLocation();

  if (!isAuthenticated()) {
    // `state` lets the login page send the user back where they were aiming.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
