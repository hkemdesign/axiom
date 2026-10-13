import React from 'react';
import { ShieldIcon, SparklesIcon, FlowIcon } from '../icons/HugeIcons';

interface Props {
  content: string;
  type?: 'info' | 'warning' | 'security' | 'tip';
  onUpdate: (content: string, type?: 'info' | 'warning' | 'security' | 'tip') => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const CalloutBlock: React.FC<Props> = ({ content, type = 'info', onUpdate, isReadOnly, isRtl }) => {
  const getStyles = () => {
    switch (type) {
      case 'security':
        return {
          bg: 'var(--color-danger-soft)',
          border: 'var(--color-danger)',
          icon: <ShieldIcon size={18} style={{ color: 'var(--color-danger)' }} />,
          label: isRtl ? 'قيد أمني وحماية' : 'Security Invariant'
        };
      case 'warning':
        return {
          bg: 'var(--color-warning-soft)',
          border: 'var(--color-warning)',
          icon: <ShieldIcon size={18} style={{ color: 'var(--color-warning)' }} />,
          label: isRtl ? 'تنبيه معماري' : 'Architecture Warning'
        };
      case 'tip':
        return {
          bg: 'var(--color-accent-soft)',
          border: 'var(--color-accent)',
          icon: <SparklesIcon size={18} style={{ color: 'var(--color-accent)' }} />,
          label: isRtl ? 'توصية وتلميح' : 'Architecture Tip'
        };
      case 'info':
      default:
        return {
          bg: 'var(--color-info-soft)',
          border: 'var(--color-info)',
          icon: <FlowIcon size={18} style={{ color: 'var(--color-info)' }} />,
          label: isRtl ? 'ملاحظة معمارية' : 'Architecture Note'
        };
    }
  };

  const styleConfig = getStyles();

  return (
    <div style={{
      margin: '14px 0',
      padding: '14px 18px',
      background: styleConfig.bg,
      border: `1px solid ${styleConfig.border}`,
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    }}>
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        {styleConfig.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: styleConfig.border, textTransform: 'uppercase' }}>
            {styleConfig.label}
          </span>

          {!isReadOnly && (
            <select
              value={type}
              onChange={(e) => onUpdate(content, e.target.value as any)}
              style={{
                fontSize: '0.74rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer'
              }}
            >
              <option value="info">Info</option>
              <option value="security">Security</option>
              <option value="warning">Warning</option>
              <option value="tip">Tip</option>
            </select>
          )}
        </div>

        {isReadOnly ? (
          <div style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
            {content}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => onUpdate(e.target.value, type)}
            rows={2}
            style={{
              width: '100%',
              fontSize: '0.88rem',
              color: 'var(--color-text-primary)',
              lineHeight: 1.6,
              resize: 'vertical'
            }}
          />
        )}
      </div>
    </div>
  );
};
