import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import TopNavbar from '../components/TopNavbar';
import NextMatch from '../components/NextMatch';
import type { NextGame } from '../api/dashboard';
import {useGameById} from '../api/useGames';
import playerStyles from './PlayersPage.module.css';
import PlayersTables from '../components/PlayersTables';

type LocationState = { nextGame?: NextGame | null } | null;

function GameDetailsPage() {
    const location = useLocation();
    // NextMatch's "View Details" link hands the game over via router state, so
    // this renders immediately on an in-app navigation. A bare URL load (deep
    // link, refresh) has no state to read, so it falls back to null.
    const nextGame = (location.state as LocationState)?.nextGame ?? null;

    const { game, isLoading, error } = useGameById(nextGame?.id); 

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden min-h-screen">
            <NavigationBar activeLink="/dashboard" />
            <TopNavbar activeLink="/gamedetails" />
            {/* md:ml-64 clears the fixed sidebar — without it this content
                renders hidden underneath it on desktop. */}
            <main className="md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-lowest min-h-screen pb-24 md:pb-margin-desktop">
                {isLoading ? <p className={playerStyles.message}>Loading data…</p> : null}
                {error ? (
                    <p className={`${playerStyles.message} ${playerStyles.errorMessage}`} role="alert">
                        {error}
                    </p>
                ) : null}
                {!isLoading && !error && game?.players.length === 0 ? (
                    <p className={playerStyles.message}>No games available.</p>
                ) : null}
                {game?.players && game.players.length > 0 && (
                    <div className="flex flex-col gap-lg">
                        <NextMatch nextGame={nextGame} details={true} />
                        <PlayersTables players={game.players}/>
                    </div>
                )}
            </main>
        </div>
    );
}

export default GameDetailsPage;