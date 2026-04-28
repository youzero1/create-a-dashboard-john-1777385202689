import clsx from 'clsx';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import styles from './TaskList.module.css';
import type { Task } from '@/types';

type TaskListProps = {
  tasks: Task[];
};

const statusIcon = {
  done: CheckCircle2,
  'in-progress': Clock,
  pending: AlertCircle,
};

const priorityLabel = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Tasks</h3>
      <ul className={styles.list}>
        {tasks.map((task) => {
          const Icon = statusIcon[task.status];
          return (
            <li key={task.id} className={styles.item}>
              <Icon
                size={17}
                className={clsx(
                  styles.statusIcon,
                  task.status === 'done' && styles.done,
                  task.status === 'in-progress' && styles.inProgress,
                  task.status === 'pending' && styles.pending
                )}
              />
              <span className={clsx(styles.taskTitle, task.status === 'done' && styles.taskDone)}>
                {task.title}
              </span>
              <span
                className={clsx(
                  styles.priority,
                  styles[task.priority]
                )}
              >
                {priorityLabel[task.priority]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
