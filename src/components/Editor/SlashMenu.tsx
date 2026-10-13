import React, { useState, useEffect } from 'react';
import type { BlockType } from '../../types';
import { translations } from '../../i18n/translations';
import {
  DocumentIcon,
  FlowIcon,
  CubeIcon,
  ShieldIcon,
  ServerIcon,
  DatabaseIcon,
  CheckIcon,
  SparklesIcon,
  CodeIcon,
  TableIcon,
  SubpageIcon,
} from '../icons/HugeIcons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: BlockType) => void;
  isRtl?: boolean;
}

export const SlashMenu: React.FC<Props> = ({ isOpen, onClose, onSelect, isRtl }) => {
  const [search, setSearch] = useState('');
  const t = isRtl ? translations.ar : translations.en;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items: Array<{
    type: BlockType;
    label: string;
    desc: string;
    icon: React.ReactNode;
    keywords: string;
  }> = [
    {
      type: 'text',
      label: t.slashText,
      desc: t.slashTextDesc,
      icon: <DocumentIcon size={16} />,
      keywords: 'text paragraph p',
    },
    {
      type: 'heading_1',
      label: t.slashH1,
      desc: t.slashH1Desc,
      icon: <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>H1</span>,
      keywords: 'heading 1 title h1',
    },
    {
      type: 'heading_2',
      label: t.slashH2,
      desc: t.slashH2Desc,
      icon: <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>H2</span>,
      keywords: 'heading 2 subtitle h2',
    },
    {
      type: 'heading_3',
      label: t.slashH3,
      desc: t.slashH3Desc,
      icon: <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>H3</span>,
      keywords: 'heading 3 sub h3',
    },
    {
      type: 'table',
      label: isRtl ? 'جدول قواعد البيانات' : 'Database Table',
      desc: isRtl ? 'جدول متقدم مع تصفية والتفاف النص وترتيب' : 'Advanced table with filters, wrap text, and sort',
      icon: <TableIcon size={16} style={{ color: 'var(--color-accent-lime)' }} />,
      keywords: 'table database matrix grid filter wrap',
    },
    {
      type: 'subpage',
      label: isRtl ? 'صفحة فرعية متداخلة' : 'Sub-page',
      desc: isRtl ? 'إنشاء صفحة داخل الصفحة الحالية' : 'Create a page inside this page',
      icon: <SubpageIcon size={16} style={{ color: 'var(--color-primary-olive)' }} />,
      keywords: 'subpage page nest child document',
    },
    {
      type: 'architecture_canvas',
      label: t.slashArchCanvas,
      desc: t.slashArchCanvasDesc,
      icon: <FlowIcon size={16} style={{ color: 'var(--color-primary-olive)' }} />,
      keywords: 'architecture flow topology canvas system diagram',
    },
    {
      type: 'tech_stack',
      label: t.slashTechStack,
      desc: t.slashTechStackDesc,
      icon: <CubeIcon size={16} style={{ color: 'var(--color-status-info)' }} />,
      keywords: 'tech stack matrix technologies tools libraries',
    },
    {
      type: 'adr',
      label: t.slashAdr,
      desc: t.slashAdrDesc,
      icon: <ShieldIcon size={16} style={{ color: 'var(--color-status-success)' }} />,
      keywords: 'adr architecture decision record decision log',
    },
    {
      type: 'api_spec',
      label: t.slashApiSpec,
      desc: t.slashApiSpecDesc,
      icon: <ServerIcon size={16} style={{ color: 'var(--color-status-warning)' }} />,
      keywords: 'api endpoint route rest http contract',
    },
    {
      type: 'database_schema',
      label: t.slashDbSchema,
      desc: t.slashDbSchemaDesc,
      icon: <DatabaseIcon size={16} style={{ color: 'var(--color-status-purple)' }} />,
      keywords: 'database db schema table entities sql',
    },
    {
      type: 'checklist',
      label: t.slashChecklist,
      desc: t.slashChecklistDesc,
      icon: <CheckIcon size={16} style={{ color: 'var(--color-status-success)' }} />,
      keywords: 'checklist todo milestones tasks',
    },
    {
      type: 'callout',
      label: t.slashCallout,
      desc: t.slashCalloutDesc,
      icon: <SparklesIcon size={16} style={{ color: 'var(--color-accent-lime)' }} />,
      keywords: 'callout note warning security tip',
    },
    {
      type: 'code',
      label: t.slashCode,
      desc: t.slashCodeDesc,
      icon: <CodeIcon size={16} />,
      keywords: 'code block iac typescript snippet',
    },
    {
      type: 'divider',
      label: t.slashDivider,
      desc: t.slashDividerDesc,
      icon: <span style={{ width: 14, height: 1.5, background: 'currentColor' }} />,
      keywords: 'divider hr line separate',
    },
  ];

  const filtered = items.filter(
    (i) =>
      i.label.toLowerCase().includes(search.toLowerCase()) ||
      i.keywords.toLowerCase().includes(search.toLowerCase()) ||
      i.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'relative',
        margin: '12px 0 20px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-medium)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: 480,
        overflow: 'hidden',
        zIndex: 40,
        animation: 'fadeIn var(--transition-fast)',
      }}
    >
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <input
          autoFocus
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isRtl ? 'فلترة الكتل المعمارية...' : 'Filter blocks (e.g. table, subpage, arch)...'}
          style={{ width: '100%', fontSize: 13, padding: '4px', background: 'transparent', border: 'none', outline: 'none' }}
        />
      </div>

      <div style={{ maxHeight: 290, overflowY: 'auto', padding: 6 }}>
        <div
          style={{
            fontSize: 11,
            color: 'var(--color-text-muted)',
            padding: '4px 8px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {t.slashTitle}
        </div>

        {filtered.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => {
              onSelect(item.type);
              onClose();
            }}
            className="axiom-btn-ghost"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              padding: '7px 10px',
              borderRadius: 'var(--radius-sm)',
              textAlign: isRtl ? 'right' : 'left',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.desc}
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
            {isRtl ? 'لا توجد كتلة معمارية مطابقة' : 'No matching architectural blocks'}
          </div>
        )}
      </div>
    </div>
  );
};
