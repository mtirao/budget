import { getAccessToken } from '../auth';
import { DASHBOARD_BASE_URL} from './config';
import { type Game } from './useGames';
import {type Player} from './players';

const GAMES_URL = `${DASHBOARD_BASE_URL}/api/games/list`
const GAME_URL = `${DASHBOARD_BASE_URL}/api/games`

export type PlayerGame = {
    game: Game;
    players: Player[];
};

export async function getGames(): Promise<Game[]> {
  const token = getAccessToken();

  const response = await fetch(GAMES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-id': 'client_credentials',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load games (status ${response.status})`);
  }

  // The endpoint returns a bare JSON array, not { games: [...] }.
  return (await response.json()) as Game[];
}

/**
 * Deep links and page refreshes land on /games/:id with nothing but the id,
 * so the detail page needs a way to resolve one game from scratch. There is
 * no known single-game endpoint, hence the roster fetch and find; swap this
 * for GET /api/wanaka/player/:id if the API grows one.
 */
export async function getGameById(id: number): Promise<PlayerGame | null> {
  const token = getAccessToken();

  const response = await fetch(GAME_URL + `/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-id': 'client_credentials',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load games (status ${response.status})`);
  }

  // The endpoint returns a bare JSON array, not { games: [...] }.
  const games = await response.json();
  return games as PlayerGame;
}
