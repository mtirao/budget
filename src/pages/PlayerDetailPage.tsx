import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPlayerById, type Player } from '../api/players';
import styles from './PlayerDetailPage.module.css';

type LocationState = { player?: Player } | null;

const DETAIL_FIELDS: { label: string; key: keyof Player }[] = [
  { label: 'Position', key: 'position' },
  { label: 'Team', key: 'team' },
  { label: 'Mobile', key: 'mobile' },
  { label: 'Email', key: 'email' },
  { label: 'Skills', key: 'skills' },
  { label: 'Defence', key: 'defence' },
  { label: 'Block', key: 'block' },
  { label: 'Serve', key: 'serve' },
  { label: 'Spikes', key: 'spike' },
];

function PlayerDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerId } = useParams();

  // PlayerRow hands the full object over in history state, so an in-app
  // navigation renders immediately with no second request.
  const playerFromState = (location.state as LocationState)?.player ?? null;

  const [player, setPlayer] = useState<Player | null>(playerFromState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!playerFromState);

  useEffect(() => {
    if (playerFromState) {
      return;
    }

    const id = Number(playerId);
    if (!Number.isFinite(id)) {
      setError('That player id is not valid.');
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    getPlayerById(id)
      .then(result => {
        if (!active) {
          return;
        }
        if (result) {
          setPlayer(result);
        } else {
          setError('That player could not be found.');
        }
      })
      .catch(() => {
        if (active) {
          setError('Could not load this player.');
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [playerId, playerFromState]);

  // The native screen used navigation.goBack(); -1 is its web equivalent, but
  // a deep link has no in-app history to pop, so fall back to the roster.
  const handleBack = () => {
    if (location.key === 'default') {
      navigate('/players');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} type="button" onClick={handleBack}>
        ‹ Back
      </button>

      {isLoading ? <p className={styles.message}>Loading…</p> : null}
      {error ? (
        <p className={`${styles.message} ${styles.errorMessage}`} role="alert">
          {error}
        </p>
      ) : null}

      {player ? (
        <>
          <span className={styles.badge} aria-hidden="true">
            {player.lastname.charAt(0)}
          </span>

          <h1 className={styles.name}>
            {player.firstname} {player.lastname}
          </h1>
          <p className={styles.subtitle}>
            {player.position} · {player.team}
          </p>

          <dl className={styles.detailsCard}>
            {DETAIL_FIELDS.map(field => (
              <div className={styles.detailRow} key={field.key}>
                <dt className={styles.detailLabel}>{field.label}</dt>
                <dd className={styles.detailValue}>{player[field.key]}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
    </div>
  );
}

export default PlayerDetailPage;
