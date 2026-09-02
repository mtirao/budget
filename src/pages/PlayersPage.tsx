import { usePlayers } from '../api/usePlayers';
import PlayerRow from '../components/PlayerRow';
import styles from './PlayersPage.module.css';

function PlayersPage() {
  const { players, isLoading, error } = usePlayers();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Players</h1>

      <div className={styles.listContent}>
        {isLoading ? <p className={styles.message}>Loading players…</p> : null}
        {error ? (
          <p
            className={`${styles.message} ${styles.errorMessage}`}
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {!isLoading && !error && players.length === 0 ? (
          <p className={styles.message}>No players on the roster yet.</p>
        ) : null}

        <ul className={styles.list}>
          {players.map(player => (
            <li key={player.id}>
              <PlayerRow player={player} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayersPage;
