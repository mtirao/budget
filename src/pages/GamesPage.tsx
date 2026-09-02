import { useGames } from '../api/useGames';
import GameRow from '../components/GameRow';
import styles from './PlayersPage.module.css';

function GamesPage() {
    const { games, isLoading, error } = useGames();

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Games</h1>

        <div className={styles.listContent}>
            {isLoading ? <p className={styles.message}>Loading games…</p> : null}
            {error ? (
            <p
                className={`${styles.message} ${styles.errorMessage}`}
                role="alert"
            >
                {error}
            </p>
            ) : null}
            {!isLoading && !error && games.length === 0 ? (
            <p className={styles.message}>No games available.</p>
            ) : null}

            <ul className={styles.list}>
            {games.map(game => (
                <li key={game.id}>
                <GameRow game={game} />
                </li>
            ))}
            </ul>

        </div>
        </div>
    );
}

export default GamesPage;
