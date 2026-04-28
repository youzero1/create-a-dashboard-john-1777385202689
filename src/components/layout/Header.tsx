import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import styles from './Header.module.css';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/users': 'Users',
  '/settings': 'Settings',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
          />
        </div>
        <button className={styles.iconBtn}>
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.avatar}>JD</div>
      </div>
    </header>
  );
}
