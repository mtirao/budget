import { useGameById } from '../api/useGames';
import { useParams } from 'react-router-dom';
import playerStyles from './PlayersPage.module.css';
import gamesStyles from './GamePlayerPage.module.css';
import PlayerRow from '../components/PlayerGameRow';

function GamesPlayerPage() {
    const { gameId } = useParams();
    const { game, isLoading, error } = useGameById(gameId ? Number(gameId) : NaN);

    return (
        <div className={playerStyles.container}>
            <h1 className={playerStyles.title}>Games</h1>

            <div className={playerStyles.listContent}>
                {isLoading ? <p className={playerStyles.message}>Loading games…</p> : null}
                {error ? (
                <p
                    className={`${playerStyles.message} ${playerStyles.errorMessage}`}
                    role="alert"
                >
                    {error}
                </p>
                ) : null}
                {!isLoading && !error && game?.players.length === 0 ? (
                <p className={playerStyles.message}>No games available.</p>
                ) : null}
                
                {game && (
                    <span className={gamesStyles.details}>
                        <span className={gamesStyles.name}>
                            {game.game.local} vs {game.game.visit}
                        </span>
                        <span className={gamesStyles.subtext}>
                            {game && game.game.date != 0 ? new Date(game.game.date * 1000).toLocaleString() : 'Date not available'}
                        </span>
                    </span>
                )} 

                <ul className={playerStyles.list}>
                    {game?.players.map(player => (
                        <li key={player.id}>
                        <PlayerRow player={player} />
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default GamesPlayerPage;
