import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Check, X, ChevronDown, User, Settings, LogOut, Menu, Sun, Moon, Monitor } from 'lucide-react';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';

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

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';
  const { theme, setTheme } = useTheme();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [searchOpen, setSearchOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
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

  const themeIcon = theme === 'dark' ? <Moon size={16} /> : theme === 'light' ? <Sun size={16} /> : <Monitor size={16} />;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}>
        {/* Desktop search */}
        <div className={`${styles.searchBox} ${styles.searchDesktop}`}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
          />
        </div>

        {/* Mobile search toggle */}
        <button
          className={`${styles.iconBtn} ${styles.searchMobileBtn}`}
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Theme picker */}
        <div className={styles.popoverWrap} ref={themeRef}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              setThemeOpen((v) => !v);
              setNotifOpen(false);
              setProfileOpen(false);
            }}
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>
          {themeOpen && (
            <div className={`${styles.dropdown} ${styles.themeDropdown}`}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>Theme</span>
              </div>
              <ul className={styles.themeList}>
                {(['light', 'system', 'dark'] as const).map((t) => (
                  <li
                    key={t}
                    className={`${styles.themeOption} ${theme === t ? styles.themeOptionActive : ''}`}
                    onClick={() => { setTheme(t); setThemeOpen(false); }}
                  >
                    {t === 'light' && <Sun size={14} />}
                    {t === 'dark' && <Moon size={14} />}
                    {t === 'system' && <Monitor size={14} />}
                    <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                    {theme === t && <Check size={13} className={styles.themeCheck} />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className={styles.popoverWrap} ref={notifRef}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
              setThemeOpen(false);
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
              setThemeOpen(false);
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

      {/* Mobile search bar */}
      {searchOpen && (
        <div className={styles.searchMobileBar}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            autoFocus
          />
          <button className={styles.dismissBtn} onClick={() => setSearchOpen(false)}>
            <X size={14} />
          </button>
        </div>
      )}
    </header>
  );
}
