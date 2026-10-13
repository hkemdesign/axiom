import React, { useState } from 'react';
import type { Page } from '../../types';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  DocumentIcon,
  PlusIcon,
  TrashIcon,
} from '../icons/HugeIcons';

interface PageTreeItemProps {
  page: Page;
  allPages: Page[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onCreateSubpage: (parentId: string) => void;
  onDeletePage: (id: string) => void;
  depth?: number;
  language?: 'ar' | 'en';
}

export const PageTreeItem: React.FC<PageTreeItemProps> = ({
  page,
  allPages,
  activePageId,
  onSelectPage,
  onCreateSubpage,
  onDeletePage,
  depth = 0,
  language = 'ar',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const children = allPages.filter((p) => p.parentId === page.id);
  const hasChildren = children.length > 0;
  const isActive = page.id === activePageId;

  const ChevronExpanded = ChevronDownIcon;
  const ChevronCollapsed = language === 'ar' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 8px',
          paddingInlineStart: 8 + depth * 14,
          borderRadius: 'var(--radius-md)',
          backgroundColor: isActive ? 'var(--color-bg-surface-hover)' : 'transparent',
          color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          position: 'relative',
        }}
        onClick={() => onSelectPage(page.id)}
      >
        {/* Left side: Chevron + Icon + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, flex: 1 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="axiom-icon-btn"
            style={{
              width: 18,
              height: 18,
              padding: 0,
              visibility: hasChildren ? 'visible' : 'hidden',
            }}
          >
            {isExpanded ? <ChevronExpanded size={12} /> : <ChevronCollapsed size={12} />}
          </button>

          <span style={{ fontSize: 14, flexShrink: 0 }}>
            {typeof page.icon === 'string' && page.icon ? (
              page.icon
            ) : (
              <DocumentIcon size={14} style={{ color: 'var(--color-text-muted)' }} />
            )}
          </span>

          <span
            style={{
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {page.title}
          </span>
        </div>

        {/* Action icons on hover */}
        {isHovered && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onCreateSubpage(page.id)}
              className="axiom-icon-btn"
              style={{ width: 20, height: 20, padding: 0 }}
              title={language === 'ar' ? 'إضافة صفحة فرعية' : 'Add sub-page'}
            >
              <PlusIcon size={12} />
            </button>
            <button
              type="button"
              onClick={() => onDeletePage(page.id)}
              className="axiom-icon-btn"
              style={{ width: 20, height: 20, padding: 0, color: 'var(--color-status-danger)' }}
              title={language === 'ar' ? 'حذف الصفحة' : 'Delete page'}
            >
              <TrashIcon size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Nested children */}
      {hasChildren && isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {children.map((child) => (
            <PageTreeItem
              key={child.id}
              page={child}
              allPages={allPages}
              activePageId={activePageId}
              onSelectPage={onSelectPage}
              onCreateSubpage={onCreateSubpage}
              onDeletePage={onDeletePage}
              depth={depth + 1}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};
