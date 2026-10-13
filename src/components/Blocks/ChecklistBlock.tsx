import React from 'react';
import type { ChecklistItem } from '../../types';
import { PlusIcon, TrashIcon } from '../icons/HugeIcons';

interface Props {
  items: ChecklistItem[];
  onUpdate: (items: ChecklistItem[]) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const ChecklistBlock: React.FC<Props> = ({ items, onUpdate, isReadOnly, isRtl }) => {
  const handleToggle = (id: string) => {
    onUpdate(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleAddItem = () => {
    const newItem: ChecklistItem = {
      id: `check_${Date.now()}`,
      text: isRtl ? 'مرحلة تنفيذية جديدة' : 'New execution milestone',
      completed: false
    };
    onUpdate([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const handleUpdateText = (id: string, text: string) => {
    onUpdate(items.map(item => item.id === id ? { ...item, text } : item));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div style={{
      margin: '16px 0',
      padding: '18px',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {isRtl ? 'مراحل ومخرجات الإنجاز' : 'Milestones & Progress'}
          </span>
          <span className="ax-badge ax-badge-accent">
            {completedCount} / {items.length} ({progressPercent}%)
          </span>
        </div>

        {!isReadOnly && (
          <button onClick={handleAddItem} className="ax-btn ax-btn-secondary ax-btn-sm">
            <PlusIcon size={13} />
            <span>{isRtl ? 'إضافة بند' : 'Add Item'}</span>
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '4px',
        width: '100%',
        background: 'var(--color-border-subtle)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: '14px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'var(--color-accent)',
          transition: 'width var(--transition-smooth)'
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              background: item.completed ? 'var(--color-bg-surface-hover)' : 'transparent',
              opacity: item.completed ? 0.75 : 1,
              transition: 'all var(--transition-fast)'
            }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--color-accent)',
                cursor: 'pointer'
              }}
            />

            {isReadOnly ? (
              <span style={{
                fontSize: '0.88rem',
                flex: 1,
                textDecoration: item.completed ? 'line-through' : 'none',
                color: item.completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)'
              }}>
                {item.text}
              </span>
            ) : (
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleUpdateText(item.id, e.target.value)}
                style={{
                  fontSize: '0.88rem',
                  flex: 1,
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)'
                }}
              />
            )}

            {!isReadOnly && (
              <button onClick={() => handleRemove(item.id)} className="ax-btn-icon" style={{ padding: '2px' }}>
                <TrashIcon size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
