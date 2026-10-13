import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '../icons/HugeIcons';

export interface DropdownOption {
  id: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface AxiomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md';
  variant?: 'surface' | 'ghost' | 'pill';
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  isRtl?: boolean;
}

export const AxiomDropdown: React.FC<AxiomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  variant = 'surface',
  disabled = false,
  style,
  className = '',
  isRtl = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const padding = size === 'sm' ? '4px 10px' : '6px 12px';
  const fontSize = size === 'sm' ? '12px' : '13px';
  const borderRadius = variant === 'pill' ? 'var(--radius-full)' : 'var(--radius-md)';

  const getBackground = () => {
    if (variant === 'ghost') return 'transparent';
    if (variant === 'pill') return 'var(--color-bg-surface-hover)';
    return 'var(--color-bg-surface)';
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
      className={className}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          padding,
          fontSize,
          fontWeight: 500,
          borderRadius,
          backgroundColor: getBackground(),
          color: selectedOption?.color || 'var(--color-text-primary)',
          border: '1px solid var(--color-border-subtle)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all var(--transition-fast)',
          width: '100%',
          userSelect: 'none',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          {selectedOption?.icon}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDownIcon
          size={12}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-fast)',
            color: 'var(--color-text-muted)',
            flexShrink: 0,
          }}
        />
      </button>

      {isOpen && (
        <div
          className="axiom-card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            [isRtl ? 'right' : 'left']: 0,
            minWidth: '100%',
            width: 'max-content',
            maxWidth: 260,
            padding: 4,
            zIndex: 100,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            animation: 'fadeIn var(--transition-fast)',
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className="axiom-btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: size === 'sm' ? '5px 8px' : '6px 10px',
                  fontSize,
                  backgroundColor: isSelected ? 'var(--color-bg-surface-hover)' : 'transparent',
                  color: opt.color || (isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'),
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  {opt.icon}
                  <span>{opt.label}</span>
                  {opt.badge && (
                    <span className="ax-badge ax-badge-neutral" style={{ fontSize: 10, padding: '1px 5px' }}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <CheckIcon size={12} style={{ color: opt.color || 'var(--color-primary-olive)' }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
