import React, { useState } from 'react';
import type { Page } from '../../types';
import { ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, DocumentIcon } from '../icons/HugeIcons';

interface BreadcrumbsProps {
  pages: Page[];
  activePage: Page;
  onSelectPage: (pageId: string) => void;
  language?: 'ar' | 'en';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  pages,
  activePage,
  onSelectPage,
  language = 'ar',
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  // Build ancestry chain
  const chain: Page[] = [];
  let curr: Page | undefined = activePage;
  const visited = new Set<string>();

  while (curr && !visited.has(curr.id)) {
    visited.add(curr.id);
    chain.unshift(curr);
    if (!curr.parentId) break;
    curr = pages.find((p) => p.id === curr?.parentId);
  }

  const Separator = language === 'ar' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
      {chain.map((page, index) => {
        const isLast = index === chain.length - 1;
        const siblings = pages.filter((p) => p.parentId === page.parentId);

        return (
          <React.Fragment key={page.id}>
            {index > 0 && (
              <Separator size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            )}

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  if (siblings.length > 1) {
                    setOpenMenuIndex(openMenuIndex === index ? null : index);
                  } else {
                    onSelectPage(page.id);
                  }
                }}
                className={`axiom-tab-pill ${isLast ? 'active' : ''}`}
                style={{ padding: '3px 8px', fontSize: 13, gap: 5 }}
              >
                <span style={{ fontSize: 14 }}>
                  {typeof page.icon === 'string' && page.icon ? page.icon : <DocumentIcon size={13} />}
                </span>
                <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {page.title}
                </span>
                {siblings.length > 1 && (
                  <ChevronDownIcon size={11} style={{ color: 'var(--color-text-muted)' }} />
                )}
              </button>

              {/* Sibling dropdown */}
              {openMenuIndex === index && siblings.length > 1 && (
                <div
                  className="axiom-card"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    insetInlineStart: 0,
                    width: 200,
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    zIndex: 70,
                    boxShadow: 'var(--shadow-md)',
                  }}
                  onMouseLeave={() => setOpenMenuIndex(null)}
                >
                  {siblings.map((sib) => (
                    <button
                      key={sib.id}
                      type="button"
                      onClick={() => {
                        onSelectPage(sib.id);
                        setOpenMenuIndex(null);
                      }}
                      className="axiom-btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        fontSize: 12.5,
                        padding: '5px 8px',
                        backgroundColor: sib.id === page.id ? 'var(--color-bg-surface-hover)' : 'transparent',
                      }}
                    >
                      <span style={{ fontSize: 13 }}>
                        {typeof sib.icon === 'string' && sib.icon ? sib.icon : <DocumentIcon size={12} />}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {sib.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
