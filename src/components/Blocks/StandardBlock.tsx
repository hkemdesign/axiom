import React from 'react';
import type { BlockType } from '../../types';

interface Props {
  type: BlockType;
  content: string;
  onUpdate: (content: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  isReadOnly?: boolean;
  placeholder?: string;
}

export const StandardBlock: React.FC<Props> = ({
  type,
  content,
  onUpdate,
  onKeyDown,
  isReadOnly,
  placeholder
}) => {
  if (type === 'divider') {
    return (
      <div style={{
        margin: '22px 0',
        height: '1px',
        background: 'var(--color-border-medium)',
        width: '100%'
      }} />
    );
  }

  if (isReadOnly) {
    switch (type) {
      case 'heading_1':
        return <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '22px 0 10px', color: 'var(--color-text-primary)' }}>{content}</h1>;
      case 'heading_2':
        return <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: '18px 0 8px', color: 'var(--color-text-primary)' }}>{content}</h2>;
      case 'heading_3':
        return <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '14px 0 6px', color: 'var(--color-text-primary)' }}>{content}</h3>;
      case 'text':
      default:
        return <p style={{ fontSize: '0.96rem', lineHeight: 1.75, margin: '6px 0', color: 'var(--color-text-primary)' }}>{content}</p>;
    }
  }

  const getStyle = () => {
    switch (type) {
      case 'heading_1':
        return { fontSize: '1.8rem', fontWeight: 700, margin: '18px 0 6px' };
      case 'heading_2':
        return { fontSize: '1.4rem', fontWeight: 600, margin: '14px 0 4px' };
      case 'heading_3':
        return { fontSize: '1.15rem', fontWeight: 600, margin: '10px 0 4px' };
      case 'text':
      default:
        return { fontSize: '0.96rem', lineHeight: 1.75, margin: '4px 0' };
    }
  };

  return (
    <textarea
      value={content}
      onChange={(e) => onUpdate(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder || 'Type text or "/" for commands...'}
      rows={type === 'text' ? Math.max(1, content.split('\n').length) : 1}
      style={{
        width: '100%',
        color: 'var(--color-text-primary)',
        resize: 'none',
        overflow: 'hidden',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        ...getStyle()
      }}
    />
  );
};
