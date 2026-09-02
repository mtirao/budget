import { Link } from 'react-router-dom';
import type { Game } from '../api/dashboard';
import styles from './GameRow.module.css';

type Props = {
  game: Game;
};

/**
 * Shared by the dashboard and the roster page — keep row UI changes here
 * rather than duplicating them per page.
 *
 * The native row passed the whole Player object as a navigation param. A URL
 * can only carry the id, so the object rides along in history state as a fast
 * path and PlayerDetailPage refetches when it is absent (deep link, refresh).
 */
function GameRow({ game }: Props) {
  return (
    <Link
      to={`/games/${game.id}`}
      state={{ game }}
      className={styles.row}
    >

      <span className={styles.details}>
        <span className={styles.name}>
          {game.local} vs {game.visit}
        </span>
        <span className={styles.subtext}>
          {game.date == 0 ? 'Date not available' : new Date(game.date * 1000).toLocaleString()}
        </span>
      </span>
    </Link>
  );
}

export default GameRow;
