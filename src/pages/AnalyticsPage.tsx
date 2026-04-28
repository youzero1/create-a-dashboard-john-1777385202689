import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import styles from './AnalyticsPage.module.css';
import type { ChartDataPoint } from '@/types';

const monthlyUsers: ChartDataPoint[] = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 5800 },
  { label: 'Mar', value: 5200 },
  { label: 'Apr', value: 6900 },
  { label: 'May', value: 7400 },
  { label: 'Jun', value: 8100 },
  { label: 'Jul', value: 8412 },
];

const pageViews: ChartDataPoint[] = [
  { label: 'Home', value: 42000 },
  { label: 'Docs', value: 28000 },
  { label: 'Blog', value: 17500 },
  { label: 'Pricing', value: 14200 },
  { label: 'About', value: 9800 },
  { label: 'Contact', value: 5300 },
];

const conversionData: ChartDataPoint[] = [
  { label: 'Jan', value: 3.2 },
  { label: 'Feb', value: 4.1 },
  { label: 'Mar', value: 3.8 },
  { label: 'Apr', value: 5.0 },
  { label: 'May', value: 4.7 },
  { label: 'Jun', value: 5.5 },
  { label: 'Jul', value: 6.1 },
];

const bounceData: ChartDataPoint[] = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 35 },
  { label: 'Fri', value: 30 },
  { label: 'Sat', value: 52 },
  { label: 'Sun', value: 58 },
];

type MetricTileProps = {
  label: string;
  value: string;
  sub: string;
  color: string;
};

function MetricTile({ label, value, sub, color }: MetricTileProps) {
  return (
    <div className={styles.metricTile} style={{ borderTopColor: color }}>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricSub}>{sub}</div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.metricsRow}>
        <MetricTile label="Total Sessions" value="124,832" sub="+9.3% this month" color="#6366f1" />
        <MetricTile label="Avg. Session Duration" value="3m 42s" sub="+12s vs last month" color="#06b6d4" />
        <MetricTile label="Conversion Rate" value="6.1%" sub="+0.6% this month" color="#10b981" />
        <MetricTile label="Bounce Rate" value="38.4%" sub="-4.2% this month" color="#f59e0b" />
      </div>
      <div className={styles.row}>
        <div className={styles.half}>
          <LineChart data={monthlyUsers} title="Monthly Active Users" />
        </div>
        <div className={styles.half}>
          <BarChart data={pageViews} title="Top Page Views" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.half}>
          <LineChart data={conversionData} title="Conversion Rate (%)" />
        </div>
        <div className={styles.half}>
          <BarChart data={bounceData} title="Bounce Rate by Day (%)" />
        </div>
      </div>
    </div>
  );
}
