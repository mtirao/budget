import { getAccessToken } from '../auth';
import { DASHBOARD_BASE_URL } from './config';


const DASHBOARD_URL = `${DASHBOARD_BASE_URL}/api/dashboard`;


export type Game = {
    id: number;
    court: string;
    date: number;
    local: string;
    setlocal: number;
    setvisit: number;
    visit: string;
};

export type DashboardData = {
    games: Game[];
    wins: number;
    losses: number;
    totalgames: number;
};

export async function getDashboardData(): Promise<DashboardData> {
    const token = getAccessToken();

    const response = await fetch(DASHBOARD_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-client-id': 'client_credentials',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to load dashboard data (status ${response.status})`);
    }

    return (await response.json()) as DashboardData;
}