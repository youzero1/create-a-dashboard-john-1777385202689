import StatCard from '@/components/dashboard/StatCard';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import TaskList from '@/components/dashboard/TaskList';
import styles from './DashboardPage.module.css';
import type { StatCard as StatCardType, Activity, Task, ChartDataPoint } from '@/types';

const statCards: StatCardType[] = [
  {
    id: '1',
    label: 'Total Revenue',
    value: '$48,295',
    change: '+12.5%',
    changeType: 'positive',
    color: '#6366f1',
    icon: '💰',
  },
  {
    id: '2',
    label: 'Active Users',
    value: '8,412',
    change: '+8.2%',
    changeType: 'positive',
    color: '#06b6d4',
    icon: '👥',
  },
  {
    id: '3',
    label: 'New Orders',
    value: '1,384',
    change: '-3.1%',
    changeType: 'negative',
    color: '#10b981',
    icon: '🛒',
  },
  {
    id: '4',
    label: 'Satisfaction',
    value: '94.2%',
    change: '+1.4%',
    changeType: 'positive',
    color: '#f59e0b',
    icon: '⭐',
  },
];

const revenueData: ChartDataPoint[] = [
  { label: 'Jan', value: 32000 },
  { label: 'Feb', value: 28000 },
  { label: 'Mar', value: 41000 },
  { label: 'Apr', value: 37000 },
  { label: 'May', value: 45000 },
  { label: 'Jun', value: 48000 },
  { label: 'Jul', value: 52000 },
];

const visitorsData: ChartDataPoint[] = [
  { label: 'Mon', value: 1200 },
  { label: 'Tue', value: 1900 },
  { label: 'Wed', value: 1500 },
  { label: 'Thu', value: 2400 },
  { label: 'Fri', value: 2200 },
  { label: 'Sat', value: 800 },
  { label: 'Sun', value: 600 },
];

const activities: Activity[] = [
  { id: '1', user: 'Alice Johnson', action: 'Created a new project', time: '2m ago', avatar: 'AJ' },
  { id: '2', user: 'Bob Smith', action: 'Updated settings', time: '15m ago', avatar: 'BS' },
  { id: '3', user: 'Carol White', action: 'Submitted report #42', time: '1h ago', avatar: 'CW' },
  { id: '4', user: 'David Lee', action: 'Invited 3 team members', time: '3h ago', avatar: 'DL' },
  { id: '5', user: 'Eva Kim', action: 'Closed 5 support tickets', time: '5h ago', avatar: 'EK' },
];

const tasks: Task[] = [
  { id: '1', title: 'Review Q2 financial report', status: 'done', priority: 'high' },
  { id: '2', title: 'Update user onboarding flow', status: 'in-progress', priority: 'high' },
  { id: '3', title: 'Fix dashboard loading bug', status: 'in-progress', priority: 'medium' },
  { id: '4', title: 'Write API documentation', status: 'pending', priority: 'medium' },
  { id: '5', title: 'Design new landing page', status: 'pending', priority: 'low' },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartLarge}>
          <LineChart data={revenueData} title="Revenue Overview" />
        </div>
        <div className={styles.chartSmall}>
          <BarChart data={visitorsData} title="Weekly Visitors" />
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.bottomLarge}>
          <RecentActivity activities={activities} />
        </div>
        <div className={styles.bottomSmall}>
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
