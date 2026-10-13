import React, { useState } from 'react';
import { translations } from '../../i18n/translations';
import type { Page } from '../../types';
import { ServerIcon, CopyIcon, CheckIcon } from '../icons/HugeIcons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pages: Page[];
  isRtl?: boolean;
}

export const McpApiModal: React.FC<Props> = ({ isOpen, onClose, pages, isRtl }) => {
  const [activeTab, setActiveTab] = useState<'mcp' | 'api' | 'script'>('mcp');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [apiOutput, setApiOutput] = useState<string>('');

  if (!isOpen) return null;

  const t = isRtl ? translations.ar : translations.en;

  const mcpConfigJson = JSON.stringify({
    mcpServers: {
      "axiom-workspace": {
        command: "node",
        args: ["./scripts/mcp-server.mjs"],
        env: {
          AXIOM_WORKSPACE_DIR: "C:\\Users\\abdoo\\Axiom"
        }
      }
    }
  }, null, 2);

  const handleCopyMcp = () => {
    navigator.clipboard.writeText(mcpConfigJson);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2200);
  };

  const handleTestApi = (endpoint: string) => {
    if (endpoint === 'list') {
      const summary = pages.map(p => ({
        id: p.id,
        title: p.title,
        status: p.status,
        blocks_count: p.blocks.length,
        share_id: p.shareSettings.shareId,
        public_url: `https://axiom.workspace/#share=${p.shareSettings.shareId}`
      }));
      setApiOutput(JSON.stringify({ status: 200, count: pages.length, pages: summary }, null, 2));
    } else if (endpoint === 'current') {
      const sample = pages[0];
      setApiOutput(JSON.stringify({ status: 200, page: sample }, null, 2));
    } else if (endpoint === 'create') {
      setApiOutput(JSON.stringify({
        status: 201,
        message: "Created by AI via MCP tool 'create_page'",
        new_page_id: `page_${Date.now()}`,
        status_badge: "draft"
      }, null, 2));
    }
  };

  return (
    <div className="ax-modal-backdrop" onClick={onClose}>
      <div className="ax-modal-container" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'flex',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent-chip-bg)',
              color: 'var(--color-primary-olive)'
            }}>
              <ServerIcon size={20} />
            </span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.mcpTitle}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.mcpSubtitle}</p>
            </div>
          </div>

          <button type="button" onClick={onClose} className="ax-btn-icon" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '10px 20px',
          borderBottom: '1px solid var(--color-border-subtle)',
          background: 'var(--color-bg-surface-hover)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('mcp')}
            className={`ax-tab-btn ${activeTab === 'mcp' ? 'active' : ''}`}
          >
            {t.mcpConfigTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`ax-tab-btn ${activeTab === 'api' ? 'active' : ''}`}
          >
            {t.restApiTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`ax-tab-btn ${activeTab === 'script' ? 'active' : ''}`}
          >
            Standalone Server Script
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '24px', maxHeight: '480px', overflowY: 'auto' }}>
          {activeTab === 'mcp' && (
            <div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '14px', lineHeight: 1.6 }}>
                {t.mcpInstructions} (Claude Desktop, Cursor <code>.cursor/mcp.json</code>, أو Antigravity IDE):
              </p>

              <div style={{
                position: 'relative',
                background: 'var(--color-bg-canvas)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-medium)',
                direction: 'ltr',
                textAlign: 'left'
              }}>
                <button
                  type="button"
                  onClick={handleCopyMcp}
                  className="ax-btn ax-btn-primary ax-btn-sm"
                  style={{ position: 'absolute', top: '12px', right: '12px' }}
                >
                  {copiedSnippet ? (
                    <>
                      <CheckIcon size={14} />
                      <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>{isRtl ? 'نسخ الإعداد' : 'Copy Config'}</span>
                    </>
                  )}
                </button>

                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--color-primary-olive)',
                  margin: 0
                }}>
                  {mcpConfigJson}
                </pre>
              </div>

              <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  {isRtl ? 'الأدوات التي يمتلكها الذكاء الاصطناعي عبر MCP:' : 'Exposed AI Tools via MCP:'}
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
                  <div style={{ padding: '10px', background: 'var(--color-bg-surface-hover)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                    <code style={{ color: 'var(--color-primary-olive)', fontWeight: 600, fontSize: '0.8rem' }}>axiom_list_pages()</code>
                    <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {isRtl ? 'قراءة فهرس المخططات والصفحات المعمارية' : 'List all workspace pages and hierarchy'}
                    </p>
                  </div>
                  <div style={{ padding: '10px', background: 'var(--color-bg-surface-hover)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                    <code style={{ color: 'var(--color-primary-olive)', fontWeight: 600, fontSize: '0.8rem' }}>axiom_read_page(page_id)</code>
                    <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {isRtl ? 'قراءة محتوى الكتل وقرارات ADR والمسارات' : 'Retrieve full page blocks, ADRs & specs'}
                    </p>
                  </div>
                  <div style={{ padding: '10px', background: 'var(--color-bg-surface-hover)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                    <code style={{ color: 'var(--color-primary-olive)', fontWeight: 600, fontSize: '0.8rem' }}>axiom_create_page(title, blocks)</code>
                    <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {isRtl ? 'إنشاء صفحة ومخطط جديد تلقائياً عبر AI' : 'Generate new page and architectural blocks'}
                    </p>
                  </div>
                  <div style={{ padding: '10px', background: 'var(--color-bg-surface-hover)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                    <code style={{ color: 'var(--color-primary-olive)', fontWeight: 600, fontSize: '0.8rem' }}>axiom_append_block(page_id, block)</code>
                    <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {isRtl ? 'إلحاق كتل ومواصفات أو جداول دون الكتابة فوق المحتوى' : 'Append ADRs or architecture cards'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
                {t.testApiHeading}
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => handleTestApi('list')} className="ax-btn ax-btn-secondary ax-btn-sm">
                  GET /api/v1/pages
                </button>
                <button type="button" onClick={() => handleTestApi('current')} className="ax-btn ax-btn-secondary ax-btn-sm">
                  GET /api/v1/pages/current
                </button>
                <button type="button" onClick={() => handleTestApi('create')} className="ax-btn ax-btn-secondary ax-btn-sm">
                  POST /api/v1/pages (Simulate AI)
                </button>
              </div>

              {apiOutput ? (
                <div style={{
                  background: 'var(--color-bg-canvas)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  direction: 'ltr',
                  textAlign: 'left'
                }}>
                  <pre style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    maxHeight: '220px',
                    overflowY: 'auto'
                  }}>
                    {apiOutput}
                  </pre>
                </div>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.86rem' }}>
                  {isRtl ? 'اضغط على أي مسار لتجربة استجابة الـ API الحية...' : 'Click an endpoint above to inspect live JSON payload...'}
                </div>
              )}
            </div>
          )}

          {activeTab === 'script' && (
            <div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                ملف خادم الـ MCP جاهز في مشروعك داخل <code>scripts/mcp-server.mjs</code>. يمكنك تشغيله مباشرة عبر:
              </p>
              <div style={{
                background: 'var(--color-bg-canvas)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                color: 'var(--color-primary-olive)',
                direction: 'ltr',
                textAlign: 'left',
                marginBottom: '14px'
              }}>
                node scripts/mcp-server.mjs
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                {isRtl ? 'يعمل الخادم محلياً بالكامل ومجاناً دون الحاجة لمفاتيح API سحابية، ويرتبط بملف بياناتك المحلي مباشرة.' : 'Runs 100% locally and free with zero cloud dependencies.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--color-bg-surface)'
        }}>
          <button type="button" onClick={onClose} className="ax-btn ax-btn-secondary">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
