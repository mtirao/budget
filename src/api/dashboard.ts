import { getAccessToken } from '../auth';
import { DASHBOARD_BASE_URL } from './config';


const DASHBOARD_URL = `${DASHBOARD_BASE_URL}/api/dashboard`;


export type Game = {
    opponent: string;
    date: string;
    score: number;
    result: string;
    resultBg: string;
};

export type Stats = {
    label: string;
    value: string;
    caption: string;
    icon: string;
    iconBg: string;
};

export type NextGame = {
    id: number;
    court: string;
    date: number;
    opponent: string;
}

export type PlayerStats = {
    rank: number;
    name: string;
    position: string;
    points: number;
    photo: string;
    initials: string;
}

export type DashboardData = {
    nextGame: NextGame | null;
    games: Game[];
    quickStats: Stats[];
    playerStats: PlayerStats[];
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