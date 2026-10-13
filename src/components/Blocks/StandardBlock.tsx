import React, { useRef, useLayoutEffect } from 'react';
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
  placeholder,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content, type]);

  if (type === 'divider') {
    return (
      <div
        style={{
          margin: '22px 0',
          height: '1px',
          background: 'var(--color-border-medium)',
          width: '100%',
        }}
      />
    );
  }

  if (isReadOnly) {
    switch (type) {
      case 'heading_1':
        return <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '22px 0 10px', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{content}</h1>;
      case 'heading_2':
        return <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: '18px 0 8px', color: 'var(--color-text-primary)', lineHeight: 1.35 }}>{content}</h2>;
      case 'heading_3':
        return <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '14px 0 6px', color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{content}</h3>;
      case 'text':
      default:
        return <p style={{ fontSize: '0.96rem', lineHeight: 1.75, margin: '6px 0', color: 'var(--color-text-primary)' }}>{content}</p>;
    }
  }

  const getStyle = (): React.CSSProperties => {
    switch (type) {
      case 'heading_1':
        return { fontSize: '1.8rem', fontWeight: 700, margin: '16px 0 6px', lineHeight: 1.3 };
      case 'heading_2':
        return { fontSize: '1.4rem', fontWeight: 600, margin: '14px 0 4px', lineHeight: 1.35 };
      case 'heading_3':
        return { fontSize: '1.15rem', fontWeight: 600, margin: '10px 0 4px', lineHeight: 1.4 };
      case 'text':
      default:
        return { fontSize: '0.96rem', lineHeight: 1.75, margin: '4px 0' };
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={(e) => onUpdate(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder || 'Type text or "/" for commands...'}
      rows={1}
      style={{
        width: '100%',
        color: 'var(--color-text-primary)',
        resize: 'none',
        overflow: 'hidden',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        display: 'block',
        ...getStyle(),
      }}
    />
  );
};
