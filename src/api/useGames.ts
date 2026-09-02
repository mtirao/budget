import { useEffect, useState } from 'react';
import { getGames, getGameById} from './games';
import type { Game } from './dashboard';
import type { PlayerGame } from './games';

type GamesState = {
  games: Game[];
  isLoading: boolean;
  error: string | null;
};

type PlayerGameState = {
    game: PlayerGame | null;
    isLoading: boolean;
    error: string | null;
};

/**
 * Shared by the dashboard and the roster page, which both fetch the whole
 * roster on mount. Unlike the native screens this surfaces loading and error
 * state instead of only logging a failure to the console.
 */
export function useGames(): GamesState {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guards against a state update after unmount, and against a slow first
    // response overwriting a faster second one.
    let active = true;

    setIsLoading(true);
    setError(null);

    getGames()
      .then(result => {
        if (active) {
          setGames(result);
        }
      })
      .catch(() => {
        if (active) {
          setError('Could not load games.');
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

  return { games, isLoading, error };
}

export function useGameById(id: number): PlayerGameState {
  const [game, setGame] = useState<PlayerGame | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);

    getGameById(id)
      .then(result => {
        if (active) {
          setGame(result);
        }
      })
      .catch(() => {
        if (active) {
          setError('Could not load game.');
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
  }, [id]);

  return { game, isLoading, error };
}

