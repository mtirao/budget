import { Link } from 'react-router-dom';
import type { Player } from '../api/players';
import styles from './PlayerRow.module.css';

type Props = {
  player: Player;
};

/**
 * Shared by the dashboard and the roster page — keep row UI changes here
 * rather than duplicating them per page.
 *
 * The native row passed the whole Player object as a navigation param. A URL
 * can only carry the id, so the object rides along in history state as a fast
 * path and PlayerDetailPage refetches when it is absent (deep link, refresh).
 */
function PlayerRow({ player }: Props) {
  return (
    <div className={styles.row}>
      <span className={styles.badge} aria-hidden="true">
        {player.position.charAt(0)}
      </span>

      <span className={styles.details}>
        <span className={styles.name}>
          {player.firstname} {player.lastname}
        </span>
        <span className={styles.subtext}>
          {player.position} · {player.team}
        </span>
      </span>
    </div>
  );
}

export default PlayerRow;
