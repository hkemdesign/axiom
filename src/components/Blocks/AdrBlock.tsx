import React, { useRef, useLayoutEffect } from 'react';
import type { AdrData } from '../../types';
import { ShieldIcon } from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';

interface Props {
  data: AdrData;
  onUpdate: (data: AdrData) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const AdrBlock: React.FC<Props> = ({ data, onUpdate, isReadOnly, isRtl }) => {
  const contextRef = useRef<HTMLTextAreaElement>(null);
  const decisionRef = useRef<HTMLTextAreaElement>(null);
  const consequencesRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    [contextRef, decisionRef, consequencesRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    });
  }, [data.context, data.decision, data.consequences]);

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
      borderLeft: isRtl ? '1px solid var(--color-border-medium)' : '3px solid var(--color-primary-olive)',
      borderRight: isRtl ? '3px solid var(--color-primary-olive)' : '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <span style={{ color: 'var(--color-primary-olive)', flexShrink: 0 }}>
            <ShieldIcon size={18} />
          </span>
          {isReadOnly ? (
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{data.title}</h4>
          ) : (
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text-primary)'
              }}
              placeholder={isRtl ? 'عنوان القرار المعماري (مثال: ADR-001)' : 'ADR Title (e.g. ADR-001)'}
            />
          )}
        </div>

        {isReadOnly ? (
          getStatusBadge(data.status)
        ) : (
          <AxiomDropdown
            size="sm"
            variant="pill"
            value={data.status}
            onChange={(val) => handleUpdate('status', val)}
            options={[
              { id: 'proposed', label: isRtl ? 'مقترح' : 'Proposed', color: 'var(--color-accent-lime)' },
              { id: 'accepted', label: isRtl ? 'معتمد' : 'Accepted', color: 'var(--color-status-success)' },
              { id: 'rejected', label: isRtl ? 'مرفوض' : 'Rejected', color: 'var(--color-status-danger)' },
              { id: 'superseded', label: isRtl ? 'تم استبداله' : 'Superseded', color: 'var(--color-text-muted)' },
            ]}
            isRtl={isRtl}
          />
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-primary-olive)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'السياق والدافع (Context)' : 'Context & Motivation'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{data.context}</div>
          ) : (
            <textarea
              ref={contextRef}
              value={data.context}
              onChange={(e) => handleUpdate('context', e.target.value)}
              rows={1}
              style={{
                width: '100%',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-bg-surface-hover)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                outline: 'none',
                resize: 'none',
                overflow: 'hidden',
                fontFamily: 'inherit',
                display: 'block',
                boxSizing: 'border-box'
              }}
            />
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-status-success)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'القرار المعماري (Decision)' : 'Architecture Decision'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{data.decision}</div>
          ) : (
            <textarea
              ref={decisionRef}
              value={data.decision}
              onChange={(e) => handleUpdate('decision', e.target.value)}
              rows={1}
              style={{
                width: '100%',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-bg-surface-hover)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                outline: 'none',
                resize: 'none',
                overflow: 'hidden',
                fontFamily: 'inherit',
                display: 'block',
                boxSizing: 'border-box'
              }}
            />
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {isRtl ? 'النتائج والآثار المترتبة (Consequences)' : 'Consequences & Trade-offs'}
          </div>
          {isReadOnly ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{data.consequences}</div>
          ) : (
            <textarea
              ref={consequencesRef}
              value={data.consequences}
              onChange={(e) => handleUpdate('consequences', e.target.value)}
              rows={1}
              style={{
                width: '100%',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-bg-surface-hover)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                outline: 'none',
                resize: 'none',
                overflow: 'hidden',
                fontFamily: 'inherit',
                display: 'block',
                boxSizing: 'border-box'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
