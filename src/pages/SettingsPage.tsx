import { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';
import styles from './SettingsPage.module.css';
import clsx from 'clsx';

type TabId = 'profile' | 'notifications' | 'security' | 'appearance';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function ProfileTab() {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [bio, setBio] = useState('Administrator at Nexus.');

  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Profile Settings</h3>
      <div className={styles.avatarRow}>
        <div className={styles.bigAvatar}>JD</div>
        <div>
          <p className={styles.avatarName}>{name}</p>
          <p className={styles.avatarRole}>Administrator</p>
        </div>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className={clsx(styles.formGroup, styles.fullWidth)}>
          <label className={styles.label}>Bio</label>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            rows={3}
          />
        </div>
      </div>
      <button className={styles.saveBtn}>
        <Save size={15} />
        <span>Save Changes</span>
      </button>
    </div>
  );
}

function NotificationsTab() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Notification Preferences</h3>
      <div className={styles.toggleList}>
        <div className={styles.toggleItem}>
          <div>
            <div className={styles.toggleLabel}>Email Notifications</div>
            <div className={styles.toggleDesc}>Receive updates via email</div>
          </div>
          <button
            className={clsx(styles.toggle, emailNotif && styles.toggleOn)}
            onClick={() => setEmailNotif((v) => !v)}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
        <div className={styles.toggleItem}>
          <div>
            <div className={styles.toggleLabel}>Push Notifications</div>
            <div className={styles.toggleDesc}>Receive push alerts in browser</div>
          </div>
          <button
            className={clsx(styles.toggle, pushNotif && styles.toggleOn)}
            onClick={() => setPushNotif((v) => !v)}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
        <div className={styles.toggleItem}>
          <div>
            <div className={styles.toggleLabel}>Weekly Summary Report</div>
            <div className={styles.toggleDesc}>Get a weekly digest every Monday</div>
          </div>
          <button
            className={clsx(styles.toggle, weeklyReport && styles.toggleOn)}
            onClick={() => setWeeklyReport((v) => !v)}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Security</h3>
      <div className={styles.formGrid}>
        <div className={clsx(styles.formGroup, styles.fullWidth)}>
          <label className={styles.label}>Current Password</label>
          <input className={styles.input} type="password" placeholder="••••••••" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Password</label>
          <input className={styles.input} type="password" placeholder="••••••••" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm New Password</label>
          <input className={styles.input} type="password" placeholder="••••••••" />
        </div>
      </div>
      <button className={styles.saveBtn}>
        <Shield size={15} />
        <span>Update Password</span>
      </button>
    </div>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Appearance</h3>
      <div className={styles.themeGrid}>
        {(['light', 'dark', 'system'] as const).map((t) => (
          <button
            key={t}
            className={clsx(styles.themeCard, theme === t && styles.themeCardActive)}
            onClick={() => setTheme(t)}
          >
            <div className={clsx(styles.themePreview, styles[t])} />
            <span className={styles.themeLabel}>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const tabContent = {
    profile: <ProfileTab />,
    notifications: <NotificationsTab />,
    security: <SecurityTab />,
    appearance: <AppearanceTab />,
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={clsx(styles.tabBtn, activeTab === tab.id && styles.tabBtnActive)}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.panel}>{tabContent[activeTab]}</div>
    </div>
  );
}
