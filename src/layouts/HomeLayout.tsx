import { NavLink, Outlet } from 'react-router-dom';
import styles from './HomeLayout.module.css';

// Plain emoji glyphs, as in the native tab bar — no icon font is installed.
const TABS = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/players', label: 'Players', icon: '💳' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

function HomeLayout() {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Outlet />
      </main>

      <nav className={styles.tabBar} aria-label="Main">
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
            }
          >
            <span className={styles.tabIcon} aria-hidden="true">
              {tab.icon}
            </span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default HomeLayout;
