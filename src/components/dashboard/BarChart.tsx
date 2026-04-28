import styles from './BarChart.module.css';
import type { ChartDataPoint } from '@/types';

type BarChartProps = {
  data: ChartDataPoint[];
  title: string;
};

export default function BarChart({ data, title }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chart}>
        {data.map((d) => (
          <div key={d.label} className={styles.barGroup}>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
            <span className={styles.barLabel}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
