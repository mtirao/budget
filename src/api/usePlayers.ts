import { useEffect, useState } from 'react';
import { getPlayers, type Player } from './players';

type PlayersState = {
  players: Player[];
  isLoading: boolean;
  error: string | null;
};


/**
 * Shared by the dashboard and the roster page, which both fetch the whole
 * roster on mount. Unlike the native screens this surfaces loading and error
 * state instead of only logging a failure to the console.
 */
export function usePlayers(): PlayersState {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guards against a state update after unmount, and against a slow first
    // response overwriting a faster second one.
    let active = true;

    setIsLoading(true);
    setError(null);

    getPlayers()
      .then(result => {
        if (active) {
          setPlayers(result);
        }
      })
      .catch(() => {
        if (active) {
          setError('Could not load players.');
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

  return { players, isLoading, error };
}
