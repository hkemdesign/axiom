import React, { useState } from 'react';
import type { ApiEndpointData } from '../../types';
import { LockIcon, UnlockIcon, CopyIcon, CheckIcon } from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';

interface Props {
  data: ApiEndpointData;
  onUpdate: (data: ApiEndpointData) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const ApiSpecBlock: React.FC<Props> = ({ data, onUpdate, isReadOnly, isRtl }) => {
  const [copied, setCopied] = useState(false);

  const getMethodBadgeClass = (method: ApiEndpointData['method']) => {
    switch (method) {
      case 'GET': return 'ax-badge-info';
      case 'POST': return 'ax-badge-accent';
      case 'PUT': return 'ax-badge-purple';
      case 'DELETE': return 'ax-badge-danger';
      case 'PATCH': return 'ax-badge-warning';
    }
  };

  const handleCopy = () => {
    if (data.sampleResponse) {
      navigator.clipboard.writeText(data.sampleResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpdate = (field: keyof ApiEndpointData, val: any) => {
    onUpdate({ ...data, [field]: val });
  };

  return (
    <div className="axiom-card" style={{
      margin: '18px 0',
      padding: '18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          {isReadOnly ? (
            <span className={`ax-badge ${getMethodBadgeClass(data.method)}`} style={{ fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
              {data.method}
            </span>
          ) : (
            <AxiomDropdown
              size="sm"
              value={data.method}
              onChange={(val) => handleUpdate('method', val)}
              options={[
                { id: 'GET', label: 'GET', color: 'var(--color-status-info)' },
                { id: 'POST', label: 'POST', color: 'var(--color-primary-olive)' },
                { id: 'PUT', label: 'PUT', color: 'var(--color-status-purple)' },
                { id: 'PATCH', label: 'PATCH', color: 'var(--color-status-warning)' },
                { id: 'DELETE', label: 'DELETE', color: 'var(--color-status-danger)' },
              ]}
              isRtl={isRtl}
            />
          )}

          {isReadOnly ? (
            <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600, fontSize: '0.94rem' }}>
              {data.path}
            </span>
          ) : (
            <input
              type="text"
              value={data.path}
              onChange={(e) => handleUpdate('path', e.target.value)}
              className="ax-input"
              style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600, fontSize: '0.92rem', flex: 1 }}
              placeholder="/api/v1/resource"
            />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {data.authRequired ? (
            <span className="ax-badge ax-badge-neutral" title="Requires Auth">
              <LockIcon size={12} />
              <span>{isRtl ? 'مصادقة' : 'Auth'}</span>
            </span>
          ) : (
            <span className="ax-badge ax-badge-neutral" title="Public Endpoint">
              <UnlockIcon size={12} />
              <span>{isRtl ? 'عام' : 'Public'}</span>
            </span>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '14px', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
        {isReadOnly ? (
          data.description
        ) : (
          <input
            type="text"
            value={data.description}
            onChange={(e) => handleUpdate('description', e.target.value)}
            className="ax-input"
            style={{ width: '100%', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}
            placeholder={isRtl ? 'وصف المسار البرمجي والوظيفة' : 'Route description'}
          />
        )}
      </div>

      {data.sampleResponse && (
        <div style={{
          position: 'relative',
          padding: '12px 14px',
          background: 'var(--color-bg-canvas)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)' }}>
              {isRtl ? 'هيكل الاستجابة النموذجي (JSON Response)' : 'Sample JSON Response'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="axiom-icon-btn"
              style={{ width: 26, height: 26 }}
              title="Copy JSON"
            >
              {copied ? <CheckIcon size={13} style={{ color: 'var(--color-status-success)' }} /> : <CopyIcon size={13} />}
            </button>
          </div>
          <pre style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.80rem',
            color: 'var(--color-text-primary)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            margin: 0,
            lineHeight: 1.5,
          }}>
            {data.sampleResponse}
          </pre>
        </div>
      )}
    </div>
  );
};
