import { useState } from 'react';
import { User, Bell, Lock, Palette, Save } from 'lucide-react';
import styles from './SettingsPage.module.css';
import { useTheme } from '@/context/ThemeContext';

type Tab = 'profile' | 'notifications' | 'security' | 'appearance';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User size={15} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
  { id: 'security', label: 'Security', icon: <Lock size={15} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={15} /> },
];

const notifSettings = [
  { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
  { id: 'push', label: 'Push Notifications', desc: 'Browser push alerts' },
  { id: 'weekly', label: 'Weekly Digest', desc: 'A summary every Monday' },
  { id: 'security', label: 'Security Alerts', desc: 'Login and access warnings' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    email: true, push: false, weekly: true, security: true,
  });
  const { theme, setTheme } = useTheme();

  function toggle(id: string) {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className={styles.page}>
      <nav className={styles.sidebar}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`${styles.tabBtn} ${activeTab === t.id ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.panel}>
        {activeTab === 'profile' && (
          <div className={styles.tabContent}>
            <p className={styles.sectionTitle}>Profile Information</p>
            <div className={styles.avatarRow}>
              <div className={styles.bigAvatar}>JD</div>
              <div>
                <div className={styles.avatarName}>John Doe</div>
                <div className={styles.avatarRole}>Administrator</div>
              </div>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input className={styles.input} defaultValue="John" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input className={styles.input} defaultValue="Doe" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} defaultValue="john@example.com" type="email" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textarea} rows={3} defaultValue="Product manager & dashboard enthusiast." />
              </div>
            </div>
            <button className={styles.saveBtn}><Save size={15} /> Save Changes</button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className={styles.tabContent}>
            <p className={styles.sectionTitle}>Notification Preferences</p>
            <ul className={styles.toggleList}>
              {notifSettings.map((n) => (
                <li key={n.id} className={styles.toggleItem}>
                  <div>
                    <div className={styles.toggleLabel}>{n.label}</div>
                    <div className={styles.toggleDesc}>{n.desc}</div>
                  </div>
                  <button
                    className={`${styles.toggle} ${toggles[n.id] ? styles.toggleOn : ''}`}
                    onClick={() => toggle(n.id)}
                    aria-pressed={toggles[n.id]}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.tabContent}>
            <p className={styles.sectionTitle}>Security Settings</p>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Current Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
            </div>
            <button className={styles.saveBtn}><Save size={15} /> Update Password</button>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className={styles.tabContent}>
            <p className={styles.sectionTitle}>Appearance</p>
            <div className={styles.themeGrid}>
              {(['light', 'system', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  className={`${styles.themeCard} ${theme === t ? styles.themeCardActive : ''}`}
                  onClick={() => setTheme(t)}
                >
                  <div className={`${styles.themePreview} ${styles[t]}`} />
                  <span className={styles.themeLabel}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
