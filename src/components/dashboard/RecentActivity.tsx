import styles from './RecentActivity.module.css';
import type { Activity } from '@/types';

type RecentActivityProps = {
  activities: Activity[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Recent Activity</h3>
      <ul className={styles.list}>
        {activities.map((a) => (
          <li key={a.id} className={styles.item}>
            <div className={styles.avatar}>{a.avatar}</div>
            <div className={styles.info}>
              <span className={styles.userName}>{a.user}</span>
              <span className={styles.action}>{a.action}</span>
            </div>
            <span className={styles.time}>{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
