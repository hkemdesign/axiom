import React from 'react';
import type { Page } from '../../types';
import { CloseIcon, DocumentIcon } from '../icons/HugeIcons';

interface RecentTabsProps {
  recentPageIds: string[];
  pages: Page[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export const RecentTabs: React.FC<RecentTabsProps> = ({
  recentPageIds,
  pages,
  activePageId,
  onSelectPage,
  onCloseTab,
}) => {
  const recentPages = recentPageIds
    .map((id) => pages.find((p) => p.id === id))
    .filter((p): p is Page => Boolean(p));

  if (recentPages.length <= 1) return null;

  return (
    <div className="axiom-header-tabs">
      {recentPages.map((page) => {
        const isActive = page.id === activePageId;
        return (
          <div
            key={page.id}
            onClick={() => onSelectPage(page.id)}
            className={`axiom-tab-pill ${isActive ? 'active' : ''}`}
            style={{ position: 'relative', paddingRight: 24 }}
          >
            <span style={{ fontSize: 13 }}>
              {typeof page.icon === 'string' && page.icon ? page.icon : <DocumentIcon size={12} />}
            </span>
            <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {page.title}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(page.id);
              }}
              className="axiom-icon-btn"
              style={{
                position: 'absolute',
                insetInlineEnd: 4,
                width: 16,
                height: 16,
                padding: 0,
                color: 'var(--color-text-muted)',
              }}
              title="Close tab"
            >
              <CloseIcon size={10} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
