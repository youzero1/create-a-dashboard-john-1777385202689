import styles from './LineChart.module.css';
import type { ChartDataPoint } from '@/types';

type LineChartProps = {
  data: ChartDataPoint[];
  title: string;
};

export default function LineChart({ data, title }: LineChartProps) {
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const width = 500;
  const height = 160;
  const pad = 20;

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((d.value - min) / range) * (height - pad * 2);
    return { x, y, label: d.label, value: d.value };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaD =
    `M ${points[0].x} ${height - pad} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${points[points.length - 1].x} ${height - pad} Z`;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartArea}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svg}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#lineGrad)" />
          <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {points.map((p) => (
            <circle key={p.label} cx={p.x} cy={p.y} r={4} fill="#6366f1" stroke="#fff" strokeWidth={2} />
          ))}
        </svg>
        <div className={styles.labels}>
          {data.map((d) => (
            <span key={d.label} className={styles.xLabel}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
