import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Check, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import styles from './Header.module.css';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/users': 'Users',
  '/settings': 'Settings',
};

const notifications = [
  { id: 1, text: 'New user registered', time: '2 min ago', read: false },
  { id: 2, text: 'Monthly report is ready', time: '1 hr ago', read: false },
  { id: 3, text: 'Server usage at 90%', time: '3 hr ago', read: false },
];

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifList.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifList((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismissNotif(id: number) {
    setNotifList((prev) => prev.filter((n) => n.id !== id));
  }

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

        {/* Notifications */}
        <div className={styles.popoverWrap} ref={notifRef}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>Notifications</span>
                {unreadCount > 0 && (
                  <button className={styles.markReadBtn} onClick={markAllRead}>
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>
              <ul className={styles.notifList}>
                {notifList.length === 0 && (
                  <li className={styles.notifEmpty}>No notifications</li>
                )}
                {notifList.map((n) => (
                  <li key={n.id} className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}>
                    <div className={styles.notifContent}>
                      {!n.read && <span className={styles.dot} />}
                      <div>
                        <p className={styles.notifText}>{n.text}</p>
                        <p className={styles.notifTime}>{n.time}</p>
                      </div>
                    </div>
                    <button
                      className={styles.dismissBtn}
                      onClick={() => dismissNotif(n.id)}
                    >
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className={styles.popoverWrap} ref={profileRef}>
          <button
            className={styles.avatarBtn}
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
          >
            <div className={styles.avatar}>JD</div>
            <ChevronDown size={14} className={`${styles.chevron} ${profileOpen ? styles.chevronUp : ''}`} />
          </button>

          {profileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.profileInfo}>
                <div className={styles.avatarLg}>JD</div>
                <div>
                  <p className={styles.profileName}>John Doe</p>
                  <p className={styles.profileEmail}>john@example.com</p>
                </div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.profileMenu}>
                <li className={styles.profileMenuItem}>
                  <User size={15} />
                  <span>My Profile</span>
                </li>
                <li className={styles.profileMenuItem}>
                  <Settings size={15} />
                  <span>Settings</span>
                </li>
              </ul>
              <div className={styles.divider} />
              <ul className={styles.profileMenu}>
                <li className={`${styles.profileMenuItem} ${styles.logout}`}>
                  <LogOut size={15} />
                  <span>Log Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
