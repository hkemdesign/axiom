import React, { useState } from 'react';
import type { Page, SidebarState } from '../../types';
import { PageTreeItem } from './PageTreeItem';
import {
  PinIcon,
  PinOffIcon,
  PlusIcon,
  SearchIcon,
  PanelLeftClose,
  FolderIcon,
  SparklesIcon,
  TerminalIcon,
} from '../icons/HugeIcons';

interface SidebarProps {
  pages: Page[];
  activePageId: string;
  sidebarState: SidebarState;
  onSetSidebarState: (state: SidebarState) => void;
  onSelectPage: (id: string) => void;
  onCreatePage: (parentId?: string | null) => void;
  onDeletePage: (id: string) => void;
  onOpenCommandPalette: () => void;
  onOpenMcpModal: () => void;
  onOpenAiModal: () => void;
  language?: 'ar' | 'en';
}

export const Sidebar: React.FC<SidebarProps> = ({
  pages,
  activePageId,
  sidebarState,
  onSetSidebarState,
  onSelectPage,
  onCreatePage,
  onDeletePage,
  onOpenCommandPalette,
  onOpenMcpModal,
  onOpenAiModal,
  language = 'ar',
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  // Top-level root pages
  const rootPages = pages.filter((p) => !p.parentId);

  // Filtered pages if searching
  const filteredPages = filterQuery.trim()
    ? pages.filter((p) => p.title.toLowerCase().includes(filterQuery.toLowerCase()))
    : null;

  return (
    <>
      {/* Edge Trigger when Closed */}
      {sidebarState === 'closed' && (
        <div
          className="axiom-sidebar-edge-trigger"
          onMouseEnter={() => onSetSidebarState('peek')}
          title={language === 'ar' ? 'تحريك المؤشر لفتح الشريط الجانبي' : 'Hover to preview sidebar'}
        >
          <div className="axiom-sidebar-edge-pill" />
        </div>
      )}

      {/* Backdrop for Peek state */}
      {sidebarState === 'peek' && (
        <div
          className="axiom-sidebar-backdrop"
          onClick={() => onSetSidebarState('closed')}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`axiom-sidebar state-${sidebarState}`}
        onMouseLeave={() => {
          if (sidebarState === 'peek') {
            onSetSidebarState('closed');
          }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '12px 10px', gap: 10 }}>
          {/* Workspace Branding and Pin/Lock Control */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-olive)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                A
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Axiom Workspace
                </span>
                <span style={{ fontSize: 10.5, color: 'var(--color-text-muted)' }}>
                  {language === 'ar' ? 'التخطيط المعماري' : 'Architecture Platform'}
                </span>
              </div>
            </div>

            {/* Pin / Close Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <button
                type="button"
                onClick={() => onSetSidebarState(sidebarState === 'locked' ? 'closed' : 'locked')}
                className={`axiom-icon-btn ${sidebarState === 'locked' ? 'active' : ''}`}
                title={
                  sidebarState === 'locked'
                    ? (language === 'ar' ? 'إلغاء التثبيت وإغلاق' : 'Unpin sidebar')
                    : (language === 'ar' ? 'تثبيت الشريط الجانبي' : 'Lock sidebar')
                }
              >
                {sidebarState === 'locked' ? <PinIcon size={14} /> : <PinOffIcon size={14} />}
              </button>

              <button
                type="button"
                onClick={() => onSetSidebarState('closed')}
                className="axiom-icon-btn"
                title={language === 'ar' ? 'إغلاق الشريط' : 'Close sidebar'}
              >
                <PanelLeftClose size={14} />
              </button>
            </div>
          </div>

          {/* Search / Command palette trigger */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في الوثائق...' : 'Quick search...'}
              style={{
                width: '100%',
                padding: '6px 10px',
                paddingInlineStart: 28,
                fontSize: 12.5,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-primary)',
              }}
            />
            <SearchIcon
              size={13}
              style={{
                position: 'absolute',
                top: '50%',
                insetInlineStart: 9,
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
          </div>

          {/* Quick Shortcuts Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="axiom-btn-ghost"
              style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5, padding: '5px 8px' }}
            >
              <SearchIcon size={13} />
              <span>{language === 'ar' ? 'لوحة الأوامر السريعة' : 'Command Palette'}</span>
              <span style={{ marginInlineStart: 'auto', fontSize: 10, color: 'var(--color-text-muted)' }}>Ctrl+K</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiModal}
              className="axiom-btn-ghost"
              style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5, padding: '5px 8px' }}
            >
              <SparklesIcon size={13} style={{ color: 'var(--color-accent-lime)' }} />
              <span>{language === 'ar' ? 'التوليد المعماري بالذكاء' : 'AI Architect'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenMcpModal}
              className="axiom-btn-ghost"
              style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5, padding: '5px 8px' }}
            >
              <TerminalIcon size={13} />
              <span>{language === 'ar' ? 'واجهة البرمجة و MCP' : 'MCP & API Engine'}</span>
            </button>
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border-subtle)', margin: '2px 0' }} />

          {/* Pages Tree Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {language === 'ar' ? 'شجرة الصفحات' : 'PAGES TREE'}
            </span>
            <button
              type="button"
              onClick={() => onCreatePage(null)}
              className="axiom-icon-btn"
              style={{ width: 22, height: 22, padding: 0 }}
              title={language === 'ar' ? 'إنشاء صفحة رئيسية جديدة' : 'Add Root Page'}
            >
              <PlusIcon size={13} />
            </button>
          </div>

          {/* Recursive Page Tree */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredPages ? (
              filteredPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => onSelectPage(page.id)}
                  className="axiom-btn-ghost"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    fontSize: 12.5,
                    padding: '5px 8px',
                    backgroundColor: page.id === activePageId ? 'var(--color-bg-surface-hover)' : 'transparent',
                  }}
                >
                  <FolderIcon size={13} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {page.title}
                  </span>
                </div>
              ))
            ) : (
              rootPages.map((page) => (
                <PageTreeItem
                  key={page.id}
                  page={page}
                  allPages={pages}
                  activePageId={activePageId}
                  onSelectPage={onSelectPage}
                  onCreateSubpage={onCreatePage}
                  onDeletePage={onDeletePage}
                  language={language}
                />
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
