import React, { useEffect } from 'react';
import { CheckIcon } from '../icons/HugeIcons';

interface Props {
  message: string | null;
  onClose: () => void;
  isRtl?: boolean;
}

export const Toast: React.FC<Props> = ({ message, onClose, isRtl }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2800);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: isRtl ? 'auto' : '24px',
      left: isRtl ? '24px' : 'auto',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.86rem',
      fontWeight: 500,
      color: 'var(--color-text-primary)',
      zIndex: 1000,
      animation: 'axSlideUp 200ms cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <span style={{ color: 'var(--color-success)', display: 'flex' }}>
        <CheckIcon size={16} />
      </span>
      <span>{message}</span>
    </div>
  );
};
