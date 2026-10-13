import React from 'react';
import type { DbEntityData, DbColumn } from '../../types';
import { DatabaseIcon, PlusIcon, TrashIcon } from '../icons/HugeIcons';

interface Props {
  data: DbEntityData;
  onUpdate: (data: DbEntityData) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const DatabaseSchemaBlock: React.FC<Props> = ({ data, onUpdate, isReadOnly, isRtl }) => {
  const handleAddColumn = () => {
    const newCol: DbColumn = {
      id: `col_${Date.now()}`,
      name: 'new_field',
      type: 'TEXT',
      isPrimary: false,
      isNullable: true,
    };
    onUpdate({
      ...data,
      columns: [...data.columns, newCol],
    });
  };

  const handleRemoveColumn = (id: string) => {
    onUpdate({
      ...data,
      columns: data.columns.filter((c) => c.id !== id),
    });
  };

  const handleUpdateColumn = (id: string, field: keyof DbColumn, val: any) => {
    onUpdate({
      ...data,
      columns: data.columns.map((c) => (c.id === id ? { ...c, [field]: val } : c)),
    });
  };

  return (
    <div className="axiom-card" style={{ margin: '18px 0', padding: '18px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ color: 'var(--color-primary-olive)', display: 'flex' }}>
            <DatabaseIcon size={18} />
          </span>
          {isReadOnly ? (
            <div>
              <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, fontSize: '0.94rem' }}>
                {data.tableName}
              </span>
              <span style={{ margin: '0 8px', color: 'var(--color-text-muted)' }}>:</span>
              <span style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                {data.description}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
              <input
                type="text"
                value={data.tableName}
                onChange={(e) => onUpdate({ ...data, tableName: e.target.value })}
                className="ax-input"
                style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, fontSize: '0.92rem', width: '220px' }}
                placeholder="table_name"
              />
              <input
                type="text"
                value={data.description}
                onChange={(e) => onUpdate({ ...data, description: e.target.value })}
                className="ax-input"
                style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', flex: 1 }}
                placeholder={isRtl ? 'وصف جدول البيانات' : 'Table description'}
              />
            </div>
          )}
        </div>

        {!isReadOnly && (
          <button
            type="button"
            onClick={handleAddColumn}
            className="axiom-btn-secondary"
            style={{ fontSize: 12, padding: '4px 10px' }}
          >
            <PlusIcon size={12} />
            <span>{isRtl ? 'إضافة حقل' : 'Add Column'}</span>
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border-medium)', color: 'var(--color-text-muted)', fontSize: '0.76rem', letterSpacing: '0.03em' }}>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>{isRtl ? 'اسم الحقل' : 'Column Name'}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>{isRtl ? 'نوع البيانات' : 'Data Type'}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'center' }}>{isRtl ? 'المفتاح الأساسي (PK)' : 'Primary Key'}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'center' }}>{isRtl ? 'يقبل فارغ (Nullable)' : 'Nullable'}</th>
              {!isReadOnly && <th style={{ padding: '8px 10px', width: 36 }}></th>}
            </tr>
          </thead>
          <tbody>
            {data.columns.map((col) => (
              <tr key={col.id} style={{ borderBottom: '1px solid var(--color-border-subtle)', fontSize: '0.86rem' }}>
                <td style={{ padding: '8px 10px' }}>
                  {isReadOnly ? (
                    <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>{col.name}</span>
                  ) : (
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => handleUpdateColumn(col.id, 'name', e.target.value)}
                      className="ax-input"
                      style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600, width: '100%', padding: '4px 8px' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px 10px' }}>
                  {isReadOnly ? (
                    <span className="ax-kbd">{col.type}</span>
                  ) : (
                    <input
                      type="text"
                      value={col.type}
                      onChange={(e) => handleUpdateColumn(col.id, 'type', e.target.value)}
                      className="ax-input"
                      style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.82rem', width: '100%', padding: '4px 8px' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                  {isReadOnly ? (
                    col.isPrimary ? <span className="ax-badge ax-badge-accent">PK</span> : '-'
                  ) : (
                    <input
                      type="checkbox"
                      checked={!!col.isPrimary}
                      onChange={(e) => handleUpdateColumn(col.id, 'isPrimary', e.target.checked)}
                      style={{ accentColor: 'var(--color-primary-olive)', cursor: 'pointer', width: 16, height: 16 }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                  {isReadOnly ? (
                    col.isNullable ? (isRtl ? 'نعم' : 'Yes') : (isRtl ? 'لا' : 'No')
                  ) : (
                    <input
                      type="checkbox"
                      checked={!!col.isNullable}
                      onChange={(e) => handleUpdateColumn(col.id, 'isNullable', e.target.checked)}
                      style={{ accentColor: 'var(--color-primary-olive)', cursor: 'pointer', width: 16, height: 16 }}
                    />
                  )}
                </td>
                {!isReadOnly && (
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(col.id)}
                      className="axiom-icon-btn"
                      style={{ width: 24, height: 24, color: 'var(--color-status-danger)' }}
                      title={isRtl ? 'حذف الحقل' : 'Delete column'}
                    >
                      <TrashIcon size={12} />
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
