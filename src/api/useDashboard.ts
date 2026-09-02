import { useEffect, useState } from 'react';
import { getDashboardData, type DashboardData } from './dashboard';

type DashboardState = {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
};


/**
 * Shared by the dashboard and the roster page, which both fetch the whole
 * roster on mount. Unlike the native screens this surfaces loading and error
 * state instead of only logging a failure to the console.
 */
export function useDashboard(): DashboardState {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guards against a state update after unmount, and against a slow first
    // response overwriting a faster second one.
    let active = true;

    setIsLoading(true);
    setError(null);

    getDashboardData()
      .then(result => {
        if (active) {
          setData(result);
        }
      })
      .catch(() => {
        if (active) {
          setError('Could not load dashboard data.');
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, isLoading, error };
}