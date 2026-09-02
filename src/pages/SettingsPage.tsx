import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // `replace` so Back can't return into the authenticated area.
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <button className={styles.button} type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SettingsPage;
