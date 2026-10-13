import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import { translations } from '../../i18n/translations';
import {
  SearchIcon, PlusIcon, SparklesIcon, ShareIcon,
  ServerIcon, MoonIcon, GlobeIcon
} from '../icons/HugeIcons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pages: Page[];
  onSelectPage: (id: string) => void;
  onNewPage: () => void;
  onOpenAiSynthesis: () => void;
  onOpenShare: () => void;
  onOpenMcp: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  isRtl?: boolean;
}

export const CommandPalette: React.FC<Props> = ({
  isOpen,
  onClose,
  pages,
  onSelectPage,
  onNewPage,
  onOpenAiSynthesis,
  onOpenShare,
  onOpenMcp,
  onToggleTheme,
  onToggleLanguage,
  isRtl
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = isRtl ? translations.ar : translations.en;

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.blocks.some(b => b.content?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="ax-modal-backdrop" onClick={onClose}>
      <div
        className="ax-modal-container"
        style={{ maxWidth: '580px', marginTop: '-120px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <SearchIcon size={18} style={{ color: 'var(--color-accent)' }} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{ width: '100%', fontSize: '0.96rem' }}
          />
          <span className="ax-kbd">ESC</span>
        </div>

        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          {/* Quick Actions */}
          {!query && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', padding: '6px 10px', fontWeight: 600, textTransform: 'uppercase' }}>
                {t.cmdQuickActions}
              </div>

              <button
                onClick={() => { onNewPage(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <PlusIcon size={16} style={{ color: 'var(--color-accent)' }} />
                <span>{t.newPage}</span>
              </button>

              <button
                onClick={() => { onOpenAiSynthesis(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <SparklesIcon size={16} style={{ color: 'var(--color-accent)' }} />
                <span>{t.aiSynthesize}</span>
              </button>

              <button
                onClick={() => { onOpenShare(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <ShareIcon size={16} />
                <span>{t.shareShort}</span>
              </button>

              <button
                onClick={() => { onOpenMcp(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <ServerIcon size={16} />
                <span>{t.mcpHub}</span>
              </button>

              <button
                onClick={() => { onToggleTheme(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <MoonIcon size={16} />
                <span>{t.themeToggle}</span>
              </button>

              <button
                onClick={() => { onToggleLanguage(); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <GlobeIcon size={16} />
                <span>{isRtl ? 'التبديل إلى English' : 'Switch to العربية'}</span>
              </button>
            </div>
          )}

          {/* Blueprints Results */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', padding: '6px 10px', fontWeight: 600, textTransform: 'uppercase' }}>
              {t.cmdPages} ({filteredPages.length})
            </div>

            {filteredPages.map((page) => (
              <button
                key={page.id}
                onClick={() => { onSelectPage(page.id); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                  textAlign: isRtl ? 'right' : 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {typeof page.icon === 'string' && page.icon ? page.icon : '📄'}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {page.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                      {page.blocks.length} {isRtl ? 'كتلة' : 'blocks'} • {new Date(page.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <span className="ax-badge ax-badge-neutral">{page.status}</span>
              </button>
            ))}

            {filteredPages.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.86rem' }}>
                {t.cmdNoResults}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
