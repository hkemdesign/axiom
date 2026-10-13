import React, { useState } from 'react';
import { CopyIcon, CheckIcon, TerminalIcon } from '../icons/HugeIcons';

interface Props {
  content: string;
  language?: string;
  onUpdate: (content: string, language?: string) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const CodeBlock: React.FC<Props> = ({ content, language = 'typescript', onUpdate, isReadOnly, isRtl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      margin: '16px 0',
      background: 'var(--color-bg-base)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        background: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border-subtle)',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TerminalIcon size={14} style={{ color: 'var(--color-text-muted)' }} />
          {!isReadOnly ? (
            <input
              type="text"
              value={language}
              onChange={(e) => onUpdate(content, e.target.value)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--color-text-secondary)',
                width: '80px'
              }}
            />
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
              {language}
            </span>
          )}
        </div>

        <button onClick={handleCopy} className="ax-btn-icon" style={{ padding: '3px 6px', fontSize: '0.74rem' }}>
          {copied ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)' }}>
              <CheckIcon size={12} />
              <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CopyIcon size={12} />
              <span>{isRtl ? 'نسخ' : 'Copy'}</span>
            </span>
          )}
        </button>
      </div>

      <div style={{ padding: '14px', overflowX: 'auto', direction: 'ltr', textAlign: 'left' }}>
        {isReadOnly ? (
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            color: 'var(--color-text-primary)',
            lineHeight: 1.6,
            margin: 0
          }}>
            {content}
          </pre>
        ) : (
          <textarea
            value={content}
            onChange={(e) => onUpdate(e.target.value, language)}
            rows={Math.max(3, content.split('\n').length)}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              color: 'var(--color-text-primary)',
              lineHeight: 1.6,
              background: 'transparent',
              resize: 'vertical'
            }}
          />
        )}
      </div>
    </div>
  );
};
