import React, { useState } from 'react';
import type { PageIconData } from '../../types';
import {
  DocumentIcon,
  FolderIcon,
  ServerIcon,
  DatabaseIcon,
  CloudIcon,
  ShieldIcon,
  FlowIcon,
  CubeIcon,
  SparklesIcon,
  CodeIcon,
  TerminalIcon,
  LockIcon,
  StarIcon,
  TableIcon,
  ListTreeIcon,
  CloseIcon,
  SearchIcon,
} from '../icons/HugeIcons';

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIcon?: string | PageIconData;
  onSelectIcon: (icon: string | PageIconData) => void;
  language?: 'ar' | 'en';
}

const CURATED_EMOJIS = [
  '🏛️', '🏗️', '📐', '🏢', '🏦', '⚡', '🔒', '📦', '🚀', '🛰️',
  '💻', '⚙️', '📊', '📈', '📋', '📁', '💡', '🎯', '🔥', '✨',
  '🧭', '🛡️', '🔑', '🏷️', '📌', '🔮', '🌐', '📡', '🧪', '🌿',
];

const AVAILABLE_HUGEICONS = [
  { name: 'document', label: 'Document', Component: DocumentIcon },
  { name: 'folder', label: 'Folder', Component: FolderIcon },
  { name: 'server', label: 'Server', Component: ServerIcon },
  { name: 'database', label: 'Database', Component: DatabaseIcon },
  { name: 'cloud', label: 'Cloud', Component: CloudIcon },
  { name: 'shield', label: 'Security', Component: ShieldIcon },
  { name: 'flow', label: 'Architecture', Component: FlowIcon },
  { name: 'cube', label: 'Module', Component: CubeIcon },
  { name: 'sparkles', label: 'Intelligence', Component: SparklesIcon },
  { name: 'code', label: 'Code', Component: CodeIcon },
  { name: 'terminal', label: 'Terminal', Component: TerminalIcon },
  { name: 'lock', label: 'Security Lock', Component: LockIcon },
  { name: 'star', label: 'Starred', Component: StarIcon },
  { name: 'table', label: 'Table Matrix', Component: TableIcon },
  { name: 'tree', label: 'Hierarchy', Component: ListTreeIcon },
];

const COLOR_TINTS = [
  { name: 'olive', color: '#5A710C', label: 'Olive' },
  { name: 'lime', color: '#C4D93B', label: 'Lime' },
  { name: 'blue', color: '#559AD4', label: 'Blue' },
  { name: 'amber', color: '#E2A43B', label: 'Amber' },
  { name: 'purple', color: '#9D84E8', label: 'Purple' },
  { name: 'slate', color: '#A3A79C', label: 'Slate' },
];

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectIcon,
  language = 'ar',
}) => {
  const [activeTab, setActiveTab] = useState<'emoji' | 'hugeicon'>('hugeicon');
  const [search, setSearch] = useState('');
  const [selectedTint, setSelectedTint] = useState('#C4D93B');

  if (!isOpen) return null;

  const filteredHugeIcons = AVAILABLE_HUGEICONS.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleRandomize = () => {
    if (activeTab === 'emoji') {
      const randomEmoji = CURATED_EMOJIS[Math.floor(Math.random() * CURATED_EMOJIS.length)];
      onSelectIcon(randomEmoji);
    } else {
      const randomIcon = AVAILABLE_HUGEICONS[Math.floor(Math.random() * AVAILABLE_HUGEICONS.length)];
      const randomTint = COLOR_TINTS[Math.floor(Math.random() * COLOR_TINTS.length)].color;
      onSelectIcon({ type: 'hugeicon', value: randomIcon.name, tint: randomTint });
    }
    onClose();
  };

  const handleRemove = () => {
    onSelectIcon('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="axiom-card"
        style={{
          width: 380,
          maxHeight: 460,
          display: 'flex',
          flexDirection: 'column',
          padding: 18,
          gap: 14,
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              onClick={() => setActiveTab('hugeicon')}
              className={`axiom-tab-pill ${activeTab === 'hugeicon' ? 'active' : ''}`}
            >
              {language === 'ar' ? 'أيقونات النظام' : 'Icons'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emoji')}
              className={`axiom-tab-pill ${activeTab === 'emoji' ? 'active' : ''}`}
            >
              {language === 'ar' ? 'رموز تعبيرية' : 'Emojis'}
            </button>
          </div>
          <button type="button" onClick={onClose} className="axiom-icon-btn">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'ar' ? 'بحث عن أيقونة...' : 'Filter icons...'}
            style={{
              width: '100%',
              padding: '7px 12px',
              paddingInlineStart: 32,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-canvas)',
              fontSize: 13,
            }}
          />
          <SearchIcon
            size={14}
            style={{
              position: 'absolute',
              top: '50%',
              insetInlineStart: 10,
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
            }}
          />
        </div>

        {/* Color Tints (for Hugeicons) */}
        {activeTab === 'hugeicon' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
              {language === 'ar' ? 'اللون:' : 'Tint:'}
            </span>
            {COLOR_TINTS.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setSelectedTint(t.color)}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: t.color,
                  border: selectedTint === t.color ? '2px solid var(--color-text-primary)' : '1px solid transparent',
                  cursor: 'pointer',
                }}
                title={t.label}
              />
            ))}
          </div>
        )}

        {/* Content Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 10,
            padding: '4px 0',
            minHeight: 180,
          }}
        >
          {activeTab === 'hugeicon' ? (
            filteredHugeIcons.map((item) => {
              const IconComp = item.Component;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onSelectIcon({ type: 'hugeicon', value: item.name, tint: selectedTint });
                    onClose();
                  }}
                  className="axiom-icon-btn"
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={item.label}
                >
                  <IconComp size={20} style={{ color: selectedTint }} />
                </button>
              );
            })
          ) : (
            CURATED_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  onSelectIcon(emoji);
                  onClose();
                }}
                className="axiom-icon-btn"
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 20,
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {emoji}
              </button>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: 10,
          }}
        >
          <button type="button" onClick={handleRemove} className="axiom-btn-ghost" style={{ fontSize: 12 }}>
            {language === 'ar' ? 'إزالة الأيقونة' : 'Remove Icon'}
          </button>
          <button type="button" onClick={handleRandomize} className="axiom-btn-secondary" style={{ fontSize: 12 }}>
            {language === 'ar' ? 'اختيار عشوائي' : 'Randomize'}
          </button>
        </div>
      </div>
    </div>
  );
};
