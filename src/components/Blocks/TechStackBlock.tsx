import React from 'react';
import type { TechStackItem } from '../../types';
import { CubeIcon, PlusIcon, TrashIcon } from '../icons/HugeIcons';

interface Props {
  items: TechStackItem[];
  onUpdate: (items: TechStackItem[]) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const TechStackBlock: React.FC<Props> = ({ items, onUpdate, isReadOnly, isRtl }) => {
  const handleAddItem = () => {
    const newItem: TechStackItem = {
      id: `tech_${Date.now()}`,
      category: isRtl ? 'طبقة جديدة' : 'Layer',
      name: 'Technology Name',
      version: 'v1.0',
      reason: isRtl ? 'مبررات الاعتماد الهندسي' : 'Architectural rationale'
    };
    onUpdate([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onUpdate(items.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof TechStackItem, value: string) => {
    onUpdate(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  return (
    <div style={{
      margin: '18px 0',
      padding: '20px',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'flex',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-accent-soft)',
            color: 'var(--color-accent)'
          }}>
            <CubeIcon size={18} />
          </span>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 600 }}>
            {isRtl ? 'مصفوفة الحزمة التقنية (Tech Stack Matrix)' : 'Approved Tech Stack Matrix'}
          </h4>
        </div>

        {!isReadOnly && (
          <button onClick={handleAddItem} className="ax-btn ax-btn-secondary ax-btn-sm">
            <PlusIcon size={14} />
            <span>{isRtl ? 'إضافة تقنية' : 'Add Tech'}</span>
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border-medium)', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
              <th style={{ padding: '8px 10px', width: '20%' }}>{isRtl ? 'المجال / الفئة' : 'Category'}</th>
              <th style={{ padding: '8px 10px', width: '30%' }}>{isRtl ? 'التقنية والنسخة' : 'Technology & Version'}</th>
              <th style={{ padding: '8px 10px', width: '40%' }}>{isRtl ? 'سبب الاختيار والبدائل' : 'Rationale & Trade-offs'}</th>
              {!isReadOnly && <th style={{ padding: '8px 10px', width: '10%' }}></th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border-subtle)', fontSize: '0.86rem' }}>
                <td style={{ padding: '10px' }}>
                  {isReadOnly ? (
                    <span className="ax-badge ax-badge-neutral">{item.category}</span>
                  ) : (
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
                      style={{ width: '100%', fontWeight: 500 }}
                    />
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  {isReadOnly ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</span>
                      {item.version && <span className="ax-kbd">{item.version}</span>}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                        style={{ fontWeight: 600, flex: 1 }}
                      />
                      <input
                        type="text"
                        value={item.version || ''}
                        onChange={(e) => handleUpdateItem(item.id, 'version', e.target.value)}
                        style={{ width: '60px', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}
                        placeholder="v1.0"
                      />
                    </div>
                  )}
                </td>
                <td style={{ padding: '10px', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>
                  {isReadOnly ? (
                    item.reason
                  ) : (
                    <input
                      type="text"
                      value={item.reason}
                      onChange={(e) => handleUpdateItem(item.id, 'reason', e.target.value)}
                      style={{ width: '100%' }}
                    />
                  )}
                </td>
                {!isReadOnly && (
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button onClick={() => handleRemoveItem(item.id)} className="ax-btn-icon">
                      <TrashIcon size={13} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
