import { useState } from 'react';
import { Search, UserPlus, MoreHorizontal } from 'lucide-react';
import styles from './UsersPage.module.css';
import clsx from 'clsx';
import type { User } from '@/types';

const USERS: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', avatar: 'AJ', joined: 'Jan 12, 2024' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', avatar: 'BS', joined: 'Feb 3, 2024' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive', avatar: 'CW', joined: 'Mar 17, 2024' },
  { id: '4', name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'active', avatar: 'DL', joined: 'Apr 5, 2024' },
  { id: '5', name: 'Eva Kim', email: 'eva@example.com', role: 'Viewer', status: 'active', avatar: 'EK', joined: 'May 20, 2024' },
  { id: '6', name: 'Frank Brown', email: 'frank@example.com', role: 'Editor', status: 'inactive', avatar: 'FB', joined: 'Jun 1, 2024' },
  { id: '7', name: 'Grace Liu', email: 'grace@example.com', role: 'Admin', status: 'active', avatar: 'GL', joined: 'Jul 8, 2024' },
  { id: '8', name: 'Henry Park', email: 'henry@example.com', role: 'Viewer', status: 'active', avatar: 'HP', joined: 'Aug 14, 2024' },
];

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = USERS.filter((u) => {
    const matchQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    const matchFilter =
      filter === 'all' || u.status === filter;
    return matchQuery && matchFilter;
  });

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search users..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              className={clsx(styles.filterBtn, filter === f && styles.filterActive)}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className={styles.addBtn}>
          <UserPlus size={15} />
          <span>Add User</span>
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>{user.avatar}</div>
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                </td>
                <td className={styles.emailCell}>{user.email}</td>
                <td>
                  <span className={styles.roleBadge}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={clsx(
                      styles.statusBadge,
                      user.status === 'active' ? styles.statusActive : styles.statusInactive
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={styles.dateCell}>{user.joined}</td>
                <td>
                  <button className={styles.moreBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className={styles.empty}>No users found.</div>
        )}
      </div>
    </div>
  );
}
