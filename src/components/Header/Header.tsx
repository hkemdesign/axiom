import React, { useState } from 'react';
import type { Page, Theme } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';
import {
  ShareIcon,
  SparklesIcon,
  TerminalIcon,
  StarIcon,
  MoreIcon,
  MoonIcon,
  SunIcon,
  GlobeIcon,
  PanelLeftOpen,
} from '../icons/HugeIcons';

interface HeaderProps {
  page: Page;
  allPages: Page[];
  recentPageIds?: string[];
  onSelectPage: (id: string) => void;
  onCloseRecentTab?: (id: string) => void;
  onOpenShare: () => void;
  onOpenAiSynthesis: () => void;
  onOpenMcp: () => void;
  onToggleFavorite: () => void;
  onExportMarkdown: () => void;
  onExportJson: () => void;
  onToggleLanguage: () => void;
  currentTheme: Theme;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  isSidebarClosed: boolean;
  language?: 'ar' | 'en';
}

export const Header: React.FC<HeaderProps> = ({
  page,
  allPages,
  onSelectPage,
  onOpenShare,
  onOpenAiSynthesis,
  onOpenMcp,
  onToggleFavorite,
  onExportMarkdown,
  onExportJson,
  onToggleLanguage,
  currentTheme,
  onToggleTheme,
  onToggleSidebar,
  isSidebarClosed,
  language = 'ar',
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--color-bg-canvas)',
        borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backdropFilter: 'blur(12px)',
        gap: 12,
      }}
    >
      {/* Left side: Sidebar Toggle + Unified Breadcrumbs Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {isSidebarClosed && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="axiom-icon-btn"
            title={language === 'ar' ? 'فتح الشريط الجانبي' : 'Open sidebar'}
          >
            <PanelLeftOpen size={16} />
          </button>
        )}

        <Breadcrumbs
          pages={allPages}
          activePage={page}
          onSelectPage={onSelectPage}
          language={language}
        />
      </div>

      {/* Right side: Global Actions & Share Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {/* Favorite */}
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`axiom-icon-btn ${page.isFavorite ? 'active' : ''}`}
          title={language === 'ar' ? 'إضافة إلى المفضلة' : 'Favorite'}
        >
          <StarIcon size={15} filled={page.isFavorite} />
        </button>

        {/* AI Synthesis */}
        <button
          type="button"
          onClick={onOpenAiSynthesis}
          className="axiom-icon-btn"
          title={language === 'ar' ? 'التوليد المعماري بالذكاء' : 'AI Architect'}
        >
          <SparklesIcon size={15} style={{ color: 'var(--color-accent-lime)' }} />
        </button>

        {/* MCP & API */}
        <button
          type="button"
          onClick={onOpenMcp}
          className="axiom-icon-btn"
          title={language === 'ar' ? 'محرك واجهات البرمجة و MCP' : 'MCP & API Engine'}
        >
          <TerminalIcon size={15} />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="axiom-icon-btn"
          title={language === 'ar' ? 'تبديل المظهر' : 'Toggle Theme'}
        >
          {currentTheme === 'dark' ? <SunIcon size={15} /> : <MoonIcon size={15} />}
        </button>

        {/* Language Toggle */}
        <button
          type="button"
          onClick={onToggleLanguage}
          className="axiom-icon-btn"
          title={language === 'ar' ? 'English' : 'العربية'}
        >
          <GlobeIcon size={15} />
        </button>

        {/* More Actions Menu */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="axiom-icon-btn"
            title={language === 'ar' ? 'خيارات إضافية' : 'More actions'}
          >
            <MoreIcon size={15} />
          </button>

          {showMoreMenu && (
            <div
              className="axiom-card"
              style={{
                position: 'absolute',
                top: '100%',
                insetInlineEnd: 0,
                width: 180,
                padding: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                zIndex: 60,
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseLeave={() => setShowMoreMenu(false)}
            >
              <button
                type="button"
                onClick={() => { onExportMarkdown(); setShowMoreMenu(false); }}
                className="axiom-btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
              >
                {language === 'ar' ? 'تصدير كـ Markdown' : 'Export Markdown'}
              </button>
              <button
                type="button"
                onClick={() => { onExportJson(); setShowMoreMenu(false); }}
                className="axiom-btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
              >
                {language === 'ar' ? 'تصدير كـ JSON' : 'Export JSON'}
              </button>
            </div>
          )}
        </div>

        {/* Primary Share Button with signature interaction */}
        <button
          type="button"
          onClick={onOpenShare}
          className="axiom-btn-primary"
          style={{ padding: '6px 14px', fontSize: 13 }}
        >
          <ShareIcon size={14} />
          <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
        </button>
      </div>
    </header>
  );
};
