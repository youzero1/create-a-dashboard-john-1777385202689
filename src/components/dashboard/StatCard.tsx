import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './StatCard.module.css';
import type { StatCard as StatCardType } from '@/types';

type StatCardProps = {
  card: StatCardType;
};

export default function StatCard({ card }: StatCardProps) {
  const isPositive = card.changeType === 'positive';
  const isNegative = card.changeType === 'negative';

  return (
    <div className={styles.card} style={{ '--card-color': card.color } as React.CSSProperties}>
      <div className={styles.header}>
        <span className={styles.label}>{card.label}</span>
        <span className={styles.iconWrap}>
          <span className={styles.emoji}>{card.icon}</span>
        </span>
      </div>
      <div className={styles.value}>{card.value}</div>
      <div
        className={clsx(
          styles.change,
          isPositive && styles.positive,
          isNegative && styles.negative
        )}
      >
        {isPositive && <TrendingUp size={13} />}
        {isNegative && <TrendingDown size={13} />}
        {!isPositive && !isNegative && <Minus size={13} />}
        <span>{card.change}</span>
        <span className={styles.changeSub}>vs last month</span>
      </div>
    </div>
  );
}
