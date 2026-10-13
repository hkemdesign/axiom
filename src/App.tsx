import React, { useState, useEffect } from 'react';
import type { Page, Language, Theme, ShareSettings, SidebarState } from './types';
import { initialPages } from './data/initialWorkspace';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { PageEditor } from './components/Editor/PageEditor';
import { ShareModal } from './components/Modals/ShareModal';
import { McpApiModal } from './components/Modals/McpApiModal';
import { AiSynthesisModal } from './components/Modals/AiSynthesisModal';
import { CommandPalette } from './components/Modals/CommandPalette';
import { Toast } from './components/Toast/Toast';

const AXIOM_WORKSPACE_VERSION = 'axiom_v8_sidequeue_hub';

export const App: React.FC = () => {
  // Persistence in localStorage with version bump
  const [pages, setPages] = useState<Page[]>(() => {
    try {
      const v = localStorage.getItem('axiom_version');
      if (v !== AXIOM_WORKSPACE_VERSION) {
        localStorage.setItem('axiom_version', AXIOM_WORKSPACE_VERSION);
        localStorage.setItem('axiom_workspace_pages', JSON.stringify(initialPages));
        return initialPages;
      }
      const saved = localStorage.getItem('axiom_workspace_pages');
      return saved ? JSON.parse(saved) : initialPages;
    } catch {
      return initialPages;
    }
  });

  const [activePageId, setActivePageId] = useState<string>(() => {
    return pages[0]?.id || initialPages[0].id;
  });

  const [recentPageIds, setRecentPageIds] = useState<string[]>([activePageId]);

  const [sidebarState, setSidebarState] = useState<SidebarState>(() => {
    const saved = localStorage.getItem('axiom_sidebar_state');
    return (saved as SidebarState) || 'locked';
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('axiom_language');
    return (saved as Language) || 'ar';
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('axiom_theme');
    return (saved as Theme) || 'dark';
  });

  // Single modal state ensures NO overlapping modals
  const [activeModal, setActiveModal] = useState<'share' | 'mcp' | 'ai' | 'search' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPublicPreviewActive, setIsPublicPreviewActive] = useState(false);

  // Sync HTML attributes for RTL & Theme
  useEffect(() => {
    const html = document.documentElement;
    html.lang = currentLanguage;
    html.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    html.dataset.theme = currentTheme;

    localStorage.setItem('axiom_language', currentLanguage);
    localStorage.setItem('axiom_theme', currentTheme);
  }, [currentLanguage, currentTheme]);

  // Sync sidebar state
  useEffect(() => {
    localStorage.setItem('axiom_sidebar_state', sidebarState);
  }, [sidebarState]);

  // Sync pages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('axiom_workspace_pages', JSON.stringify(pages));
    } catch {
      // Storage quota fallback
    }
  }, [pages]);

  // Update recent page tabs when active page changes
  const handleSelectPage = (pageId: string) => {
    setActivePageId(pageId);
    setRecentPageIds((prev) => {
      if (!prev.includes(pageId)) {
        return [...prev, pageId].slice(-6);
      }
      return prev;
    });
  };

  const handleCloseRecentTab = (pageId: string) => {
    const updated = recentPageIds.filter((id) => id !== pageId);
    setRecentPageIds(updated);
    if (activePageId === pageId && updated.length > 0) {
      setActivePageId(updated[updated.length - 1]);
    }
  };

  // Global keyboard shortcut for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveModal((prev) => (prev === 'search' ? null : 'search'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activePage = pages.find((p) => p.id === activePageId) || pages[0];
  const isRtl = currentLanguage === 'ar';

  const handleUpdatePage = (updated: Page) => {
    setPages(pages.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleNewPage = (parentId?: string | null) => {
    const newPage: Page = {
      id: `page_${Date.now()}`,
      parentId: parentId || null,
      title: isRtl ? 'مخطط معماري جديد' : 'New Architecture Blueprint',
      icon: '📐',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shareSettings: {
        generalAccess: 'anyone_with_link',
        linkRole: 'viewer',
        isPublicLinkActive: true,
        shareId: `axiom-${Math.random().toString(36).substring(2, 8)}`,
        collaborators: [
          { email: 'founder@axiom.dev', name: 'Abdoo (Lead Architect)', role: 'owner' },
        ],
      },
      blocks: [
        {
          id: `b_${Date.now()}`,
          type: 'heading_1',
          content: isRtl ? '1. ملخص النظام والمحددات المعمارية' : '1. Architecture Overview & Invariants',
        },
        {
          id: `b_${Date.now() + 1}`,
          type: 'text',
          content: isRtl
            ? 'اكتب هنا تفاصيل البنية التحتية أو اكتب "/" لإدراج كتل معمارية متقدمة...'
            : 'Document architectural blueprints or type "/" for system blocks...',
        },
      ],
    };

    setPages([newPage, ...pages]);
    handleSelectPage(newPage.id);
    setToastMessage(isRtl ? 'تم إنشاء مخطط معماري جديد' : 'Created new architecture blueprint');
  };

  const handleDeletePage = (id: string) => {
    if (pages.length <= 1) return;
    const remaining = pages.filter((p) => p.id !== id);
    setPages(remaining);
    setRecentPageIds((prev) => prev.filter((pid) => pid !== id));
    if (activePageId === id) {
      setActivePageId(remaining[0].id);
    }
    setToastMessage(isRtl ? 'تم حذف المخطط المعماري' : 'Blueprint deleted');
  };

  const handleToggleFavorite = (id: string) => {
    setPages(pages.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)));
  };

  const handleToggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleExportMarkdown = () => {
    if (!activePage) return;
    let md = `# ${activePage.title}\n\n`;
    md += `Status: ${activePage.status} | Created: ${activePage.createdAt}\n\n---\n\n`;

    activePage.blocks.forEach((b) => {
      if (b.type === 'heading_1') md += `## ${b.content}\n\n`;
      else if (b.type === 'heading_2') md += `### ${b.content}\n\n`;
      else if (b.type === 'heading_3') md += `#### ${b.content}\n\n`;
      else if (b.type === 'text') md += `${b.content}\n\n`;
      else if (b.type === 'code') md += `\`\`\`${b.language || ''}\n${b.content}\n\`\`\`\n\n`;
      else if (b.type === 'callout') md += `> [!NOTE]\n> ${b.content}\n\n`;
      else if (b.type === 'table' && b.tableData) {
        md += `### ${b.tableData.title}\n\n`;
        const colHeaders = b.tableData.columns.map((c) => c.name).join(' | ');
        const colSep = b.tableData.columns.map(() => '---').join(' | ');
        md += `| ${colHeaders} |\n| ${colSep} |\n`;
        b.tableData.rows.forEach((r) => {
          const rowVals = b.tableData?.columns.map((c) => String(r.cells[c.id] || '')).join(' | ');
          md += `| ${rowVals} |\n`;
        });
        md += '\n';
      } else if (b.type === 'adr' && b.adrData) {
        md += `### ${b.adrData.title} (${b.adrData.status})\n- **Context**: ${b.adrData.context}\n- **Decision**: ${b.adrData.decision}\n- **Consequences**: ${b.adrData.consequences}\n\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage.title.replace(/\s+/g, '_')}.md`;
    a.click();
    setToastMessage(isRtl ? 'تم تصدير ملف Markdown بنجاح' : 'Exported Markdown blueprint');
  };

  const handleExportJson = () => {
    if (!activePage) return;
    const blob = new Blob([JSON.stringify(activePage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage.title.replace(/\s+/g, '_')}.json`;
    a.click();
    setToastMessage(isRtl ? 'تم تصدير كائن الهندسة المعمارية كـ JSON' : 'Exported Architecture JSON');
  };

  const handleSynthesizePage = (newPage: Page) => {
    setPages([newPage, ...pages]);
    handleSelectPage(newPage.id);
    setToastMessage(isRtl ? 'تم توليد المخطط المعماري عبر AI بنجاح!' : 'Synthesized architecture blueprint via AI!');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* 3-State Sidebar */}
      {!isPublicPreviewActive && (
        <Sidebar
          pages={pages}
          activePageId={activePageId}
          sidebarState={sidebarState}
          onSetSidebarState={setSidebarState}
          onSelectPage={handleSelectPage}
          onCreatePage={handleNewPage}
          onDeletePage={handleDeletePage}
          onOpenCommandPalette={() => setActiveModal('search')}
          onOpenAiModal={() => setActiveModal('ai')}
          onOpenMcpModal={() => setActiveModal('mcp')}
          language={currentLanguage}
        />
      )}

      {/* Main Workspace Canvas Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header
          page={activePage}
          allPages={pages}
          recentPageIds={recentPageIds}
          onSelectPage={handleSelectPage}
          onCloseRecentTab={handleCloseRecentTab}
          onOpenShare={() => setActiveModal('share')}
          onOpenAiSynthesis={() => setActiveModal('ai')}
          onOpenMcp={() => setActiveModal('mcp')}
          onToggleFavorite={() => handleToggleFavorite(activePage.id)}
          onExportMarkdown={handleExportMarkdown}
          onExportJson={handleExportJson}
          onToggleLanguage={handleToggleLanguage}
          currentTheme={currentTheme}
          onToggleTheme={handleToggleTheme}
          onToggleSidebar={() => setSidebarState(sidebarState === 'locked' ? 'closed' : 'locked')}
          isSidebarClosed={sidebarState === 'closed'}
          language={currentLanguage}
        />

        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg-canvas)' }}>
          <PageEditor
            page={activePage}
            allPages={pages}
            onUpdatePage={handleUpdatePage}
            onNavigateToPage={handleSelectPage}
            isReadOnly={isPublicPreviewActive}
            isRtl={isRtl}
            onOpenAiSynthesis={() => setActiveModal('ai')}
          />
        </main>
      </div>

      {/* Modals & Dialogs (Single active modal strictly prevents overlaps) */}
      <ShareModal
        page={activePage}
        isOpen={activeModal === 'share'}
        onClose={() => setActiveModal(null)}
        onUpdateShareSettings={(shareSettings: ShareSettings) => handleUpdatePage({ ...activePage, shareSettings })}
        onTogglePublicPreview={() => setIsPublicPreviewActive((prev) => !prev)}
        isPublicPreviewActive={isPublicPreviewActive}
        isRtl={isRtl}
      />

      <McpApiModal
        isOpen={activeModal === 'mcp'}
        onClose={() => setActiveModal(null)}
        pages={pages}
        isRtl={isRtl}
      />

      <AiSynthesisModal
        isOpen={activeModal === 'ai'}
        onClose={() => setActiveModal(null)}
        onSynthesize={handleSynthesizePage}
        isRtl={isRtl}
      />

      <CommandPalette
        isOpen={activeModal === 'search'}
        onClose={() => setActiveModal(null)}
        pages={pages}
        onSelectPage={handleSelectPage}
        onNewPage={() => handleNewPage(null)}
        onOpenAiSynthesis={() => setActiveModal('ai')}
        onOpenShare={() => setActiveModal('share')}
        onOpenMcp={() => setActiveModal('mcp')}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
        isRtl={isRtl}
      />

      {/* Global Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        isRtl={isRtl}
      />
    </div>
  );
};

export default App;
