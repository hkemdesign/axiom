import React from 'react';
import type { AdrData } from '../../types';
import { ShieldIcon } from '../icons/HugeIcons';

interface Props {
  data: AdrData;
  onUpdate: (data: AdrData) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const AdrBlock: React.FC<Props> = ({ data, onUpdate, isReadOnly, isRtl }) => {
  const getStatusBadge = (status: AdrData['status']) => {
    switch (status) {
      case 'accepted': return <span className="ax-badge ax-badge-success">{isRtl ? 'معتمد' : 'Accepted'}</span>;
      case 'proposed': return <span className="ax-badge ax-badge-accent">{isRtl ? 'مقترح' : 'Proposed'}</span>;
      case 'rejected': return <span className="ax-badge ax-badge-danger">{isRtl ? 'مرفوض' : 'Rejected'}</span>;
      case 'superseded': return <span className="ax-badge ax-badge-neutral">{isRtl ? 'تم استبداله' : 'Superseded'}</span>;
    }
  };

  const handleUpdate = (field: keyof AdrData, val: string) => {
    onUpdate({ ...data, [field]: val });
  };

  return (
    <div style={{
      margin: '18px 0',
      padding: '22px',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-medium)',
      borderLeft: isRtl ? '1px solid var(--color-border-medium)' : '3px solid var(--color-accent)',
      borderRight: isRtl ? '3px solid var(--color-accent)' : '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-accent)' }}>
            <ShieldIcon size={18} />
          </span>
          {isReadOnly ? (
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{data.title}</h4>
          ) : (
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              style={{ fontSize: '1rem', fontWeight: 600, width: '100%' }}
              placeholder={isRtl ? 'عنوان القرار المعماري (مثال: ADR-001)' : 'ADR Title (e.g. ADR-001)'}
            />
          )}
        </div>

        {isReadOnly ? (
          getStatusBadge(data.status)
        ) : (
          <select
            value={data.status}
            onChange={(e) => handleUpdate('status', e.target.value)}
            style={{
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bg-surface-hover)',
              border: '1px solid var(--color-border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--color-text-primary)'
            }}
          >
            <option value="proposed">{isRtl ? 'مقترح' : 'Proposed'}</option>
            <option value="accepted">{isRtl ? 'معتمد' : 'Accepted'}</option>
            <option value="rejected">{isRtl ? 'مرفوض' : 'Rejected'}</option>
            <option value="superseded">{isRtl ? 'تم استبداله' : 'Superseded'}</option>
          </select>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'السياق والدافع (Context)' : 'Context & Motivation'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{data.context}</div>
          ) : (
            <textarea
              value={data.context}
              onChange={(e) => handleUpdate('context', e.target.value)}
              rows={2}
              className="ax-input"
              style={{ width: '100%', resize: 'vertical' }}
            />
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-success)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'القرار المعماري (Decision)' : 'Architecture Decision'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{data.decision}</div>
          ) : (
            <textarea
              value={data.decision}
              onChange={(e) => handleUpdate('decision', e.target.value)}
              rows={2}
              className="ax-input"
              style={{ width: '100%', resize: 'vertical' }}
            />
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'النتائج والآثار المترتبة (Consequences)' : 'Consequences & Trade-offs'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{data.consequences}</div>
          ) : (
            <textarea
              value={data.consequences}
              onChange={(e) => handleUpdate('consequences', e.target.value)}
              rows={2}
              className="ax-input"
              style={{ width: '100%', resize: 'vertical' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
