import React, { useRef, useLayoutEffect } from 'react';
import { ShieldIcon, SparklesIcon, FlowIcon } from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';

interface Props {
  content: string;
  type?: 'info' | 'warning' | 'security' | 'tip';
  onUpdate: (content: string, type?: 'info' | 'warning' | 'security' | 'tip') => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const CalloutBlock: React.FC<Props> = ({ content, type = 'info', onUpdate, isReadOnly, isRtl }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const getStyles = () => {
    switch (type) {
      case 'security':
        return {
          bg: 'var(--color-status-danger-soft)',
          border: 'var(--color-status-danger)',
          icon: <ShieldIcon size={18} style={{ color: 'var(--color-status-danger)' }} />,
          label: isRtl ? 'قيد أمني وحماية' : 'Security Invariant'
        };
      case 'warning':
        return {
          bg: 'var(--color-status-warning-soft)',
          border: 'var(--color-status-warning)',
          icon: <ShieldIcon size={18} style={{ color: 'var(--color-status-warning)' }} />,
          label: isRtl ? 'تنبيه معماري' : 'Architecture Warning'
        };
      case 'tip':
        return {
          bg: 'var(--color-accent-chip-bg)',
          border: 'var(--color-border-accent)',
          icon: <SparklesIcon size={18} style={{ color: 'var(--color-accent-lime)' }} />,
          label: isRtl ? 'توصية وتلميح' : 'Architecture Tip'
        };
      case 'info':
      default:
        return {
          bg: 'var(--color-status-info-soft)',
          border: 'var(--color-status-info)',
          icon: <FlowIcon size={18} style={{ color: 'var(--color-status-info)' }} />,
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

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: styleConfig.border, textTransform: 'uppercase' }}>
            {styleConfig.label}
          </span>

          {!isReadOnly && (
            <AxiomDropdown
              size="sm"
              variant="pill"
              value={type}
              onChange={(val) => onUpdate(content, val as any)}
              options={[
                { id: 'info', label: 'Info' },
                { id: 'security', label: 'Security' },
                { id: 'warning', label: 'Warning' },
                { id: 'tip', label: 'Tip' },
              ]}
              isRtl={isRtl}
            />
          )}
        </div>

        {isReadOnly ? (
          <div style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onUpdate(e.target.value, type)}
            rows={1}
            style={{
              width: '100%',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'var(--color-text-primary)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'inherit',
              display: 'block',
              boxSizing: 'border-box',
            }}
          />
        )}
      </div>
    </div>
  );
};
