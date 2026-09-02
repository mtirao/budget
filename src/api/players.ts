import { getAccessToken } from '../auth';
import { PLAYERS_BASE_URL } from './config';

const PLAYERS_URL = `${PLAYERS_BASE_URL}/api/wanaka/player`;

export type Player = {
  block: number;
  defence: number;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  mobile: string;
  position: string;
  serve: number;
  skills: number;
  spike: number;
  team: string;
};

export async function getPlayers(): Promise<Player[]> {
  const token = getAccessToken();

  const response = await fetch(PLAYERS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-id': 'client_credentials',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load players (status ${response.status})`);
  }

  // The endpoint returns a bare JSON array, not { players: [...] }.
  return (await response.json()) as Player[];
}

/**
 * Deep links and page refreshes land on /players/:id with nothing but the id,
 * so the detail page needs a way to resolve one player from scratch. There is
 * no known single-player endpoint, hence the roster fetch and find; swap this
 * for GET /api/wanaka/player/:id if the API grows one.
 */
export async function getPlayerById(id: number): Promise<Player | null> {
  const players = await getPlayers();
  return players.find(player => player.id === id) ?? null;
}
