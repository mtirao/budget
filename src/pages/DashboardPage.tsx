import { Link } from 'react-router-dom';
import { useDashboard } from '../api/useDashboard';
import styles from './DashboardPage.module.css';
import GameRow from '../components/GameRow';

const RECENT_COUNT = 5;

function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  // Placeholder figures — there is no backing endpoint for these yet.
  const totalGamesPlayed = 0;
  const wins = 0;
  const losses = 0;

  const recentGames = data?.games.slice(0, RECENT_COUNT) || [];

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.balanceCard}>
        <span className={styles.balanceLabel}>Total Games Played</span>
        <span className={styles.balanceValue}>{data?.totalgames ?? totalGamesPlayed}</span>
      </div>

      <div className={styles.statRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Wins</span>
          <span className={`${styles.statValue} ${styles.positive}`}>
            {data?.wins ?? wins}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Losses</span>
          <span className={`${styles.statValue} ${styles.negative}`}>
            {data?.losses ?? losses}
          </span>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Games</h2>
        <Link className={styles.seeAll} to="/games">
          See all
        </Link>
      </div>

      {isLoading ? <p className={styles.message}>Loading players…</p> : null}
      {error ? (
        <p className={`${styles.message} ${styles.errorMessage}`} role="alert">
          {error}
        </p>
      ) : null}

      <ul className={styles.list}>
        {recentGames.map(game => (
          <li key={game.id}>
            <GameRow game={game} />
          </li>
        ))} 
      </ul>
    </div>
  );
}

export default DashboardPage;
