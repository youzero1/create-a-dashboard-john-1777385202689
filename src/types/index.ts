export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export type StatCard = {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  color: string;
  icon: string;
};

export type Activity = {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
};

export type Task = {
  id: string;
  title: string;
  status: 'done' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar: string;
  joined: string;
};

export type ChartDataPoint = {
  label: string;
  value: number;
  secondary?: number;
};
