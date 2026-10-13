import React from 'react';
import type { Block, BlockType } from '../../types';
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  PilcrowIcon,
  TableIcon,
  CodeIcon,
  ServerIcon,
  FlowIcon,
  DatabaseIcon,
  SubpageIcon,
  DuplicateIcon,
  TrashIcon,
  LinkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PaletteIcon,
} from '../icons/HugeIcons';

interface BlockOptionsMenuProps {
  block: Block;
  isOpen: boolean;
  onClose: () => void;
  onTurnInto: (type: BlockType) => void;
  onSetColorTint: (tint?: string) => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  language?: 'ar' | 'en';
}

const COLOR_OPTIONS = [
  { name: 'default', color: 'transparent', label: 'Default' },
  { name: 'olive', color: 'rgba(90, 113, 12, 0.12)', label: 'Olive' },
  { name: 'lime', color: 'rgba(196, 217, 59, 0.14)', label: 'Lime' },
  { name: 'blue', color: 'rgba(85, 154, 212, 0.14)', label: 'Blue' },
  { name: 'amber', color: 'rgba(226, 164, 59, 0.14)', label: 'Amber' },
  { name: 'purple', color: 'rgba(157, 132, 232, 0.14)', label: 'Purple' },
];

export const BlockOptionsMenu: React.FC<BlockOptionsMenuProps> = ({
  block,
  isOpen,
  onClose,
  onTurnInto,
  onSetColorTint,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete,
  language = 'ar',
}) => {
  if (!isOpen) return null;

  const wordCount = (block.content || '').trim().split(/\s+/).filter(Boolean).length;
  const charCount = (block.content || '').length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
      }}
      onClick={onClose}
    >
      <div
        className="axiom-card"
        style={{
          position: 'absolute',
          top: 100,
          insetInlineStart: 'max(10%, 60px)',
          width: 270,
          boxShadow: 'var(--shadow-modal)',
          padding: '8px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxHeight: 520,
          overflowY: 'auto',
          zIndex: 85,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <button
            type="button"
            onClick={() => { onDuplicate(); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
          >
            <DuplicateIcon size={14} />
            <span>{language === 'ar' ? 'تكرار الكتلة' : 'Duplicate'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onMoveUp(); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
          >
            <ArrowUpIcon size={14} />
            <span>{language === 'ar' ? 'تحريك للأعلى' : 'Move Up'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onMoveDown(); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
          >
            <ArrowDownIcon size={14} />
            <span>{language === 'ar' ? 'تحريك للأسفل' : 'Move Down'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href + '#block-' + block.id);
              onClose();
            }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
          >
            <LinkIcon size={14} />
            <span>{language === 'ar' ? 'نسخ رابط الكتلة' : 'Copy Link to Block'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onDelete(); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5, color: 'var(--color-status-danger)' }}
          >
            <TrashIcon size={14} />
            <span>{language === 'ar' ? 'حذف الكتلة' : 'Delete'}</span>
          </button>
        </div>

        <div style={{ height: 1, backgroundColor: 'var(--color-border-subtle)', margin: '4px 0' }} />

        {/* Color Tints */}
        <div style={{ padding: '4px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
            <PaletteIcon size={12} />
            <span>{language === 'ar' ? 'لون الخلفية' : 'Background Tint'}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => { onSetColorTint(c.color === 'transparent' ? undefined : c.color); onClose(); }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: c.color === 'transparent' ? 'var(--color-bg-surface-hover)' : c.color,
                  border: '1px solid var(--color-border-medium)',
                  cursor: 'pointer',
                }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: 'var(--color-border-subtle)', margin: '4px 0' }} />

        {/* Turn into section */}
        <div style={{ padding: '2px 8px 4px 8px', fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>
          {language === 'ar' ? 'تحويل إلى' : 'Turn Into'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <button
            type="button"
            onClick={() => { onTurnInto('text'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <PilcrowIcon size={13} />
            <span>{language === 'ar' ? 'نص فقرة' : 'Paragraph'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('heading_1'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <Heading1Icon size={13} />
            <span>{language === 'ar' ? 'عنوان رئيسي 1' : 'Heading 1'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('heading_2'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <Heading2Icon size={13} />
            <span>{language === 'ar' ? 'عنوان فرعي 2' : 'Heading 2'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('heading_3'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <Heading3Icon size={13} />
            <span>{language === 'ar' ? 'عنوان فرعي 3' : 'Heading 3'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('table'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <TableIcon size={13} />
            <span>{language === 'ar' ? 'جدول قواعد بيانات' : 'Database Table'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('code'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <CodeIcon size={13} />
            <span>{language === 'ar' ? 'كتلة برمجية' : 'Code Block'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('subpage'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <SubpageIcon size={13} />
            <span>{language === 'ar' ? 'صفحة فرعية' : 'Sub-page'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('architecture_canvas'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <FlowIcon size={13} />
            <span>{language === 'ar' ? 'مخطط معماري' : 'Architecture Canvas'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('tech_stack'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <ServerIcon size={13} />
            <span>{language === 'ar' ? 'المكدس التقني' : 'Tech Stack'}</span>
          </button>

          <button
            type="button"
            onClick={() => { onTurnInto('database_schema'); onClose(); }}
            className="axiom-btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}
          >
            <DatabaseIcon size={13} />
            <span>{language === 'ar' ? 'مخطط البيانات' : 'Database Schema'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: 6,
            marginTop: 4,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10.5,
            color: 'var(--color-text-muted)',
            paddingInline: 6,
          }}
        >
          <span>{wordCount} {language === 'ar' ? 'كلمات' : 'words'}</span>
          <span>{charCount} {language === 'ar' ? 'حرف' : 'chars'}</span>
        </div>
      </div>
    </div>
  );
};
