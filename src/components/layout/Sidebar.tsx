import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  Zap,
} from 'lucide-react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart2 },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <Zap size={20} />
        </span>
        <span className={styles.logoText}>Nexus</span>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(styles.navLink, isActive && styles.navLinkActive)
                }
              >
                <item.icon size={18} className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <div className={styles.userAvatar}>JD</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Jane Doe</div>
          <div className={styles.userRole}>Administrator</div>
        </div>
      </div>
    </aside>
  );
}
