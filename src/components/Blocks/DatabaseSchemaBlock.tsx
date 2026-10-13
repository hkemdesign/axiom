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
      isNullable: true
    };
    onUpdate({
      ...data,
      columns: [...data.columns, newCol]
    });
  };

  const handleRemoveColumn = (id: string) => {
    onUpdate({
      ...data,
      columns: data.columns.filter(c => c.id !== id)
    });
  };

  const handleUpdateColumn = (id: string, field: keyof DbColumn, val: any) => {
    onUpdate({
      ...data,
      columns: data.columns.map(c => c.id === id ? { ...c, [field]: val } : c)
    });
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
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-accent)' }}>
            <DatabaseIcon size={18} />
          </span>
          {isReadOnly ? (
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.94rem' }}>
                {data.tableName}
              </span>
              <span style={{ margin: '0 8px', color: 'var(--color-text-muted)' }}>:</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                {data.description}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
              <input
                type="text"
                value={data.tableName}
                onChange={(e) => onUpdate({ ...data, tableName: e.target.value })}
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.94rem' }}
                placeholder="table_name"
              />
              <input
                type="text"
                value={data.description}
                onChange={(e) => onUpdate({ ...data, description: e.target.value })}
                style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', width: '220px' }}
                placeholder={isRtl ? 'وصف الجدول' : 'Table description'}
              />
            </div>
          )}
        </div>

        {!isReadOnly && (
          <button onClick={handleAddColumn} className="ax-btn ax-btn-secondary ax-btn-sm">
            <PlusIcon size={14} />
            <span>{isRtl ? 'إضافة حقل' : 'Add Column'}</span>
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border-medium)', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
              <th style={{ padding: '6px 8px' }}>{isRtl ? 'اسم الحقل' : 'Column Name'}</th>
              <th style={{ padding: '6px 8px' }}>{isRtl ? 'نوع البيانات' : 'Data Type'}</th>
              <th style={{ padding: '6px 8px' }}>{isRtl ? 'المفتاح الأساسي (PK)' : 'Primary Key'}</th>
              <th style={{ padding: '6px 8px' }}>{isRtl ? 'يقبل قيمة فارغة (Nullable)' : 'Nullable'}</th>
              {!isReadOnly && <th style={{ padding: '6px 8px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {data.columns.map((col) => (
              <tr key={col.id} style={{ borderBottom: '1px solid var(--color-border-subtle)', fontSize: '0.84rem' }}>
                <td style={{ padding: '8px' }}>
                  {isReadOnly ? (
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{col.name}</span>
                  ) : (
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => handleUpdateColumn(col.id, 'name', e.target.value)}
                      style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, width: '100%' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px' }}>
                  {isReadOnly ? (
                    <span className="ax-kbd">{col.type}</span>
                  ) : (
                    <input
                      type="text"
                      value={col.type}
                      onChange={(e) => handleUpdateColumn(col.id, 'type', e.target.value)}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', width: '100%' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px' }}>
                  {isReadOnly ? (
                    col.isPrimary ? <span className="ax-badge ax-badge-accent">PK</span> : '-'
                  ) : (
                    <input
                      type="checkbox"
                      checked={!!col.isPrimary}
                      onChange={(e) => handleUpdateColumn(col.id, 'isPrimary', e.target.checked)}
                      style={{ accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px' }}>
                  {isReadOnly ? (
                    col.isNullable ? (isRtl ? 'نعم' : 'Yes') : (isRtl ? 'لا' : 'No')
                  ) : (
                    <input
                      type="checkbox"
                      checked={!!col.isNullable}
                      onChange={(e) => handleUpdateColumn(col.id, 'isNullable', e.target.checked)}
                      style={{ accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                    />
                  )}
                </td>
                {!isReadOnly && (
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handleRemoveColumn(col.id)} className="ax-btn-icon">
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
