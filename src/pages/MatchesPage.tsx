import NavigationBar from '../components/NavigationBar';
import TopNavbar from '../components/TopNavbar';
import { useGames } from '../api/useGames';
import playerStyles from './PlayersPage.module.css';
import MatchesHeader from '../components/MatchesHeader';
import MatchesTables from '../components/MatchesTables';

function MatchesPage() {
    const activeLink = '/games';
    const { games, isLoading, error } = useGames();

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden min-h-screen">
            <NavigationBar activeLink={activeLink} />
            <TopNavbar activeLink={activeLink} />
            <main className="md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-lowest min-h-screen pb-24 md:pb-margin-desktop">
                
                {isLoading ? <p className={playerStyles.message}>Loading data…</p> : null}
                {error ? (
                    <p className={`${playerStyles.message} ${playerStyles.errorMessage}`} role="alert">
                        {error}
                    </p>
                ) : null}
                {!isLoading && !error && games.length === 0 ? (
                    <p className={playerStyles.message}>No games available.</p>
                ) : null}
                {games && games.length > 0 && (
                    <div>
                        <MatchesHeader/>
                        <MatchesTables games={games} />
                    </div>
                )}
            </main>

        </div>
    );

}

export default MatchesPage;