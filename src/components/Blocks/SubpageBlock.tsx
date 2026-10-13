import React from 'react';
import type { Page } from '../../types';
import { SubpageIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons/HugeIcons';

interface SubpageBlockProps {
  page?: Page;
  onNavigate: (pageId: string) => void;
  language?: 'ar' | 'en';
}

export const SubpageBlock: React.FC<SubpageBlockProps> = ({
  page,
  onNavigate,
  language = 'ar',
}) => {
  if (!page) {
    return (
      <div
        className="axiom-card"
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--color-text-muted)',
          fontSize: 13,
          margin: '8px 0',
        }}
      >
        <SubpageIcon size={16} />
        <span>{language === 'ar' ? 'صفحة فرعية غير مرتبطة' : 'Unlinked sub-page'}</span>
      </div>
    );
  }

  const snippet = page.blocks?.[0]?.content || (language === 'ar' ? 'لا يوجد محتوى معاينة' : 'No preview available');
  const ChevronComp = language === 'ar' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div
      onClick={() => onNavigate(page.id)}
      className="axiom-card"
      style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        margin: '8px 0',
        transition: 'all var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-accent-chip-bg)',
            color: 'var(--color-accent-chip-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {typeof page.icon === 'string' && page.icon ? (
            page.icon
          ) : (
            <SubpageIcon size={16} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {page.title}
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              maxWidth: 460,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {snippet}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)' }}>
        <span style={{ fontSize: 11 }}>
          {page.blocks?.length || 0} {language === 'ar' ? 'كتل' : 'blocks'}
        </span>
        <ChevronComp size={14} />
      </div>
    </div>
  );
};
