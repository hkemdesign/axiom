import React, { useState, useRef, useLayoutEffect } from 'react';
import type { Page, Block, BlockType, PageStatus, TableData, PageIconData } from '../../types';
import { translations } from '../../i18n/translations';
import {
  PlusIcon,
  DragHandleIcon,
  DocumentIcon,
  SparklesIcon,
} from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';
import { ArchitectureBlock } from '../Blocks/ArchitectureBlock';
import { TechStackBlock } from '../Blocks/TechStackBlock';
import { AdrBlock } from '../Blocks/AdrBlock';
import { ApiSpecBlock } from '../Blocks/ApiSpecBlock';
import { DatabaseSchemaBlock } from '../Blocks/DatabaseSchemaBlock';
import { CalloutBlock } from '../Blocks/CalloutBlock';
import { ChecklistBlock } from '../Blocks/ChecklistBlock';
import { CodeBlock } from '../Blocks/CodeBlock';
import { StandardBlock } from '../Blocks/StandardBlock';
import { TableBlock } from '../Blocks/TableBlock';
import { SubpageBlock } from '../Blocks/SubpageBlock';
import { TocRail } from './TocRail';
import { IconPickerModal } from './IconPickerModal';
import { BlockOptionsMenu } from './BlockOptionsMenu';
import { SlashMenu } from './SlashMenu';

interface Props {
  page: Page;
  allPages: Page[];
  onUpdatePage: (updated: Page) => void;
  onNavigateToPage: (pageId: string) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
  onOpenAiSynthesis?: () => void;
}

const CURATED_COVERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
];

export const PageEditor: React.FC<Props> = ({
  page,
  allPages,
  onUpdatePage,
  onNavigateToPage,
  isReadOnly,
  isRtl,
  onOpenAiSynthesis,
}) => {
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [activeMenuBlock, setActiveMenuBlock] = useState<Block | null>(null);

  // Drag and drop state
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'top' | 'bottom' | null>(null);

  // Auto-hug title textarea
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.style.height = 'auto';
      titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`;
    }
  }, [page.title]);

  const t = isRtl ? translations.ar : translations.en;

  const handleUpdateTitle = (title: string) => {
    onUpdatePage({ ...page, title, updatedAt: new Date().toISOString() });
  };

  const handleUpdateStatus = (status: PageStatus) => {
    onUpdatePage({ ...page, status, updatedAt: new Date().toISOString() });
  };

  const handleAddBlock = (type: BlockType, insertIndex?: number) => {
    const newBlock: Block = {
      id: `block_${Date.now()}`,
      type,
    };

    switch (type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'text':
        newBlock.content = isRtl ? 'نص أو عنوان جديد...' : 'New text or heading...';
        break;
      case 'table':
        newBlock.tableData = {
          title: isRtl ? 'جدول المكونات المعمارية' : 'Architectural Matrix',
          columns: [
            { id: 'col_name', name: isRtl ? 'المكون' : 'Component', type: 'title', wrapText: true, width: 220 },
            {
              id: 'col_status',
              name: isRtl ? 'الحالة' : 'Status',
              type: 'status',
              wrapText: false,
              width: 140,
              options: [
                { id: 'planned', label: isRtl ? 'مخطط' : 'Planned', color: '#559AD4' },
                { id: 'in_progress', label: isRtl ? 'قيد التنفيذ' : 'In Progress', color: '#C4D93B' },
                { id: 'completed', label: isRtl ? 'مكتمل' : 'Completed', color: '#4EAA79' },
              ],
            },
            { id: 'col_desc', name: isRtl ? 'الملاحظات' : 'Notes', type: 'text', wrapText: true, width: 280 },
          ],
          rows: [
            {
              id: 'row_1',
              cells: {
                col_name: 'Core System Engine',
                col_status: 'in_progress',
                col_desc: isRtl ? 'النواة المركزية لإدارة الحالات وتنسيق الكتل المعمارية.' : 'Core kernel for state management and block coordination.',
              },
            },
          ],
        };
        break;
      case 'subpage': {
        const subId = `page_${Date.now()}`;
        newBlock.subpageId = subId;
        break;
      }
      case 'callout':
        newBlock.content = isRtl ? 'ملاحظة معمارية هامة حول المتطلبات الأمنية وتوزيع الأحمال.' : 'Important architectural requirement regarding security and scalability.';
        newBlock.calloutType = 'info';
        break;
      case 'code':
        newBlock.content = '// Architectural definition\ninterface ArchitectureModel {\n  nodes: string[];\n}';
        newBlock.language = 'typescript';
        break;
      case 'architecture_canvas':
        newBlock.architectureNodes = [
          { id: 'node_1', name: 'API Gateway', role: 'Entry point', technology: 'Envoy', status: 'healthy' },
          { id: 'node_2', name: 'Auth Service', role: 'Identity', technology: 'Node.js', status: 'healthy' },
        ];
        break;
      case 'tech_stack':
        newBlock.techStackItems = [
          { id: 'ts_1', category: 'Backend', name: 'Go / Node.js', reason: 'High throughput' },
          { id: 'ts_2', category: 'Database', name: 'PostgreSQL', reason: 'ACID compliance' },
        ];
        break;
      case 'adr':
        newBlock.adrData = {
          title: isRtl ? 'قرار استخدام معمارية الخدمات المستقلة' : 'Adoption of Microservices Architecture',
          status: 'accepted',
          context: isRtl ? 'الحاجة إلى مرونة التوسع واستقلالية نشر الفرق البرمجية.' : 'Need for elastic scaling and autonomous squad deployments.',
          decision: isRtl ? 'فصل النظم المركزية إلى خدمات معيارية عبر بروتوكول gRPC.' : 'Decouple core modules into standardized gRPC microservices.',
          consequences: isRtl ? 'مرونة عالية مع زيادة طفيفة في متطلبات مراقبة الشبكة.' : 'High elasticity with minor overhead in distributed observability.',
        };
        break;
      case 'api_spec':
        newBlock.apiData = {
          method: 'POST',
          path: '/api/v1/architecture/sync',
          description: isRtl ? 'مزامنة مخططات المعمارية وبيانات النظم.' : 'Synchronize architecture models and topology data.',
          authRequired: true,
          sampleResponse: '{\n  "status": "synchronized"\n}',
        };
        break;
      case 'database_schema':
        newBlock.dbData = {
          tableName: 'system_components',
          description: isRtl ? 'سجل المكونات المعمارية وحالاتها التشغيلية.' : 'Registry of architecture components and runtime health.',
          columns: [
            { id: 'c1', name: 'id', type: 'UUID', isPrimary: true },
            { id: 'c2', name: 'name', type: 'VARCHAR(255)', isNullable: false },
          ],
        };
        break;
      case 'checklist':
        newBlock.checklistItems = [
          { id: 'chk_1', text: isRtl ? 'مراجعة معايير الأمان والتشفير' : 'Security review & encryption validation', completed: true },
          { id: 'chk_2', text: isRtl ? 'اختبار تحمل الضغط وحجم المعاملات' : 'Load testing and transaction throughput', completed: false },
        ];
        break;
    }

    const updatedBlocks = [...page.blocks];
    if (typeof insertIndex === 'number') {
      updatedBlocks.splice(insertIndex + 1, 0, newBlock);
    } else {
      updatedBlocks.push(newBlock);
    }

    onUpdatePage({ ...page, blocks: updatedBlocks, updatedAt: new Date().toISOString() });
  };

  const handleUpdateBlock = (blockId: string, patch: Partial<Block>) => {
    const updated = page.blocks.map((b) => (b.id === blockId ? { ...b, ...patch } : b));
    onUpdatePage({ ...page, blocks: updated, updatedAt: new Date().toISOString() });
  };

  const handleDeleteBlock = (blockId: string) => {
    const updated = page.blocks.filter((b) => b.id !== blockId);
    onUpdatePage({ ...page, blocks: updated, updatedAt: new Date().toISOString() });
  };

  const handleDuplicateBlock = (block: Block) => {
    const idx = page.blocks.findIndex((b) => b.id === block.id);
    const duplicated: Block = {
      ...JSON.parse(JSON.stringify(block)),
      id: `block_${Date.now()}`,
    };
    const updated = [...page.blocks];
    updated.splice(idx + 1, 0, duplicated);
    onUpdatePage({ ...page, blocks: updated, updatedAt: new Date().toISOString() });
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= page.blocks.length) return;
    const updated = [...page.blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onUpdatePage({ ...page, blocks: updated, updatedAt: new Date().toISOString() });
  };

  const handleTurnInto = (blockId: string, newType: BlockType) => {
    const updated = page.blocks.map((b) => {
      if (b.id === blockId) {
        return { ...b, type: newType };
      }
      return b;
    });
    onUpdatePage({ ...page, blocks: updated, updatedAt: new Date().toISOString() });
  };

  const handleSetBlockTint = (blockId: string, tint?: string) => {
    handleUpdateBlock(blockId, { colorTint: tint });
  };

  const handleReorderBlocks = (sourceId: string, targetId: string, position: 'top' | 'bottom') => {
    if (sourceId === targetId) return;
    const sourceIdx = page.blocks.findIndex((b) => b.id === sourceId);
    const targetIdx = page.blocks.findIndex((b) => b.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    const newBlocks = [...page.blocks];
    const [moved] = newBlocks.splice(sourceIdx, 1);
    const newTargetIdx = newBlocks.findIndex((b) => b.id === targetId);
    const insertIdx = position === 'bottom' ? newTargetIdx + 1 : newTargetIdx;
    newBlocks.splice(insertIdx, 0, moved);
    onUpdatePage({ ...page, blocks: newBlocks, updatedAt: new Date().toISOString() });
    setDraggedBlockId(null);
    setDragOverBlockId(null);
    setDropPosition(null);
  };

  const renderPageIcon = () => {
    if (!page.icon) {
      return <DocumentIcon size={28} style={{ color: 'var(--color-primary-olive)' }} />;
    }
    if (typeof page.icon === 'string') {
      return <span style={{ fontSize: 32 }}>{page.icon}</span>;
    }
    const iconData = page.icon as PageIconData;
    return <DocumentIcon size={28} style={{ color: iconData.tint || 'var(--color-accent-lime)' }} />;
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 24px 100px',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Side Content Lines: TOC Rail */}
      <TocRail blocks={page.blocks} language={isRtl ? 'ar' : 'en'} />

      {/* Cover Image */}
      {page.coverImage && (
        <div
          style={{
            position: 'relative',
            height: 200,
            margin: '0 -24px 28px',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
            overflow: 'hidden',
            background: `url(${page.coverImage}) center/cover no-repeat`,
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          {!isReadOnly && (
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                insetInlineEnd: 16,
                display: 'flex',
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={() => setShowCoverPicker(!showCoverPicker)}
                className="axiom-btn-secondary"
                style={{ fontSize: 12, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
              >
                {t.changeCover}
              </button>
              <button
                type="button"
                onClick={() => onUpdatePage({ ...page, coverImage: undefined })}
                className="axiom-btn-secondary"
                style={{ fontSize: 12, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
              >
                {t.removeCover}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cover Picker */}
      {showCoverPicker && (
        <div
          className="axiom-card"
          style={{
            padding: 12,
            marginBottom: 20,
            display: 'flex',
            gap: 10,
          }}
        >
          {CURATED_COVERS.map((cov, idx) => (
            <div
              key={idx}
              onClick={() => {
                onUpdatePage({ ...page, coverImage: cov });
                setShowCoverPicker(false);
              }}
              style={{
                width: 70,
                height: 42,
                borderRadius: 'var(--radius-sm)',
                background: `url(${cov}) center/cover no-repeat`,
                cursor: 'pointer',
                border: '1px solid var(--color-border-medium)',
              }}
            />
          ))}
        </div>
      )}

      {/* Add Cover Action if none */}
      {!page.coverImage && !isReadOnly && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => onUpdatePage({ ...page, coverImage: CURATED_COVERS[0] })}
            className="axiom-btn-ghost"
            style={{ fontSize: 12, color: 'var(--color-text-muted)' }}
          >
            + {t.addCover}
          </button>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          {/* Page Icon Trigger */}
          <div
            onClick={() => !isReadOnly && setShowIconPicker(true)}
            style={{
              cursor: isReadOnly ? 'default' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              borderRadius: 'var(--radius-md)',
              transition: 'background var(--transition-fast)',
            }}
            title={isRtl ? 'تغيير أيقونة الصفحة' : 'Change icon'}
          >
            {renderPageIcon()}
          </div>

          {/* Status & AI Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!isReadOnly && (
              <AxiomDropdown
                size="sm"
                variant="pill"
                value={page.status}
                onChange={(val) => handleUpdateStatus(val as PageStatus)}
                options={[
                  { id: 'draft', label: t.statusDraft, color: 'var(--color-text-secondary)' },
                  { id: 'in_review', label: t.statusInReview, color: 'var(--color-status-warning)' },
                  { id: 'approved', label: t.statusApproved, color: 'var(--color-status-success)' },
                  { id: 'active', label: t.statusActive, color: 'var(--color-accent-lime)' },
                ]}
                isRtl={isRtl}
              />
            )}

            {!isReadOnly && onOpenAiSynthesis && (
              <button
                type="button"
                onClick={onOpenAiSynthesis}
                className="axiom-btn-ghost"
                style={{ color: 'var(--color-accent-lime)', gap: 5, fontSize: 12 }}
              >
                <SparklesIcon size={14} />
                <span>{t.aiSynthesize}</span>
              </button>
            )}
          </div>
        </div>

        {/* Title Input */}
        {isReadOnly ? (
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--color-text-primary)', marginBottom: 8 }}>
            {page.title}
          </h1>
        ) : (
          <textarea
            ref={titleTextareaRef}
            value={page.title}
            onChange={(e) => handleUpdateTitle(e.target.value)}
            rows={1}
            placeholder={t.untitledPage}
            style={{
              width: '100%',
              fontSize: '2.2rem',
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'var(--color-text-primary)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              marginBottom: 8,
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              display: 'block',
            }}
          />
        )}

        {/* Metadata subline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--color-text-muted)' }}>
          <span>{t.lastEdited} {new Date(page.updatedAt).toLocaleTimeString()}</span>
          <span>•</span>
          <span>{page.blocks.length} {isRtl ? 'كتلة معمارية' : 'blocks'}</span>
          {page.shareSettings.isPublicLinkActive && (
            <>
              <span>•</span>
              <span className="axiom-chip" style={{ fontSize: 11 }}>
                {isRtl ? 'رابط عام نشط' : 'Public link active'}
              </span>
            </>
          )}
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: 'var(--color-border-subtle)', marginBottom: 24 }} />

      {/* Render All Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {page.blocks.map((block, index) => {
          const isDragOver = dragOverBlockId === block.id;
          return (
            <div
              key={block.id}
              id={`block-${block.id}`}
              onMouseEnter={() => setHoveredBlockId(block.id)}
              onMouseLeave={() => setHoveredBlockId(null)}
              onDragOver={(e) => {
                if (isReadOnly || !draggedBlockId || draggedBlockId === block.id) return;
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                const pos = e.clientY < midY ? 'top' : 'bottom';
                setDragOverBlockId(block.id);
                setDropPosition(pos);
              }}
              onDragLeave={() => {
                if (dragOverBlockId === block.id) {
                  setDragOverBlockId(null);
                  setDropPosition(null);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedBlockId && dropPosition) {
                  handleReorderBlocks(draggedBlockId, block.id, dropPosition);
                }
              }}
              className="axiom-block-wrapper"
              style={{
                backgroundColor: block.colorTint || 'transparent',
                padding: block.colorTint ? '8px 12px' : '2px 0',
                borderTop: isDragOver && dropPosition === 'top' ? '2px solid var(--color-primary-olive)' : 'none',
                borderBottom: isDragOver && dropPosition === 'bottom' ? '2px solid var(--color-primary-olive)' : 'none',
                transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
              }}
            >
              {/* Block Hover Drag Handle & Action Trigger */}
              {!isReadOnly && (
                <div
                  className="axiom-block-handle"
                  style={{ opacity: hoveredBlockId === block.id ? 1 : 0 }}
                >
                  <button
                    type="button"
                    draggable={!isReadOnly}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', block.id);
                      setDraggedBlockId(block.id);
                    }}
                    onDragEnd={() => {
                      setDraggedBlockId(null);
                      setDragOverBlockId(null);
                      setDropPosition(null);
                    }}
                    onClick={() => setActiveMenuBlock(block)}
                    className="axiom-icon-btn"
                    style={{ width: 22, height: 22, padding: 0, cursor: 'grab' }}
                    title={isRtl ? 'اسحب لإعادة الترتيب أو انقر للخيارات' : 'Drag to reorder or click for options'}
                  >
                    <DragHandleIcon size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('text', index)}
                    className="axiom-icon-btn"
                    style={{ width: 22, height: 22, padding: 0 }}
                    title={isRtl ? 'إضافة كتلة بالأسفل' : 'Add block below'}
                  >
                    <PlusIcon size={12} />
                  </button>
                </div>
              )}

            {/* Block Type Rendering */}
            {block.type === 'table' && (
              <TableBlock
                data={block.tableData}
                onChange={(updatedTable: TableData) => handleUpdateBlock(block.id, { tableData: updatedTable })}
                language={isRtl ? 'ar' : 'en'}
              />
            )}

            {block.type === 'subpage' && (
              <SubpageBlock
                page={allPages.find((p) => p.id === block.subpageId)}
                onNavigate={onNavigateToPage}
                language={isRtl ? 'ar' : 'en'}
              />
            )}

            {block.type === 'architecture_canvas' && (
              <ArchitectureBlock
                nodes={block.architectureNodes || []}
                onUpdate={(nodes) => handleUpdateBlock(block.id, { architectureNodes: nodes })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'tech_stack' && (
              <TechStackBlock
                items={block.techStackItems || []}
                onUpdate={(items) => handleUpdateBlock(block.id, { techStackItems: items })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'adr' && block.adrData && (
              <AdrBlock
                data={block.adrData}
                onUpdate={(adrData) => handleUpdateBlock(block.id, { adrData })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'api_spec' && block.apiData && (
              <ApiSpecBlock
                data={block.apiData}
                onUpdate={(apiData) => handleUpdateBlock(block.id, { apiData })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'database_schema' && block.dbData && (
              <DatabaseSchemaBlock
                data={block.dbData}
                onUpdate={(dbData) => handleUpdateBlock(block.id, { dbData })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'callout' && (
              <CalloutBlock
                content={block.content || ''}
                type={block.calloutType}
                onUpdate={(content, type) => handleUpdateBlock(block.id, { content, calloutType: type })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'checklist' && (
              <ChecklistBlock
                items={block.checklistItems || []}
                onUpdate={(items) => handleUpdateBlock(block.id, { checklistItems: items })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {block.type === 'code' && (
              <CodeBlock
                content={block.content || ''}
                language={block.language}
                onUpdate={(content, language) => handleUpdateBlock(block.id, { content, language })}
                isReadOnly={isReadOnly}
                isRtl={isRtl}
              />
            )}

            {(block.type === 'text' ||
              block.type === 'heading_1' ||
              block.type === 'heading_2' ||
              block.type === 'heading_3' ||
              block.type === 'divider') && (
              <StandardBlock
                type={block.type}
                content={block.content || ''}
                onUpdate={(content) => handleUpdateBlock(block.id, { content })}
                onKeyDown={(e) => {
                  if (e.key === '/' && (block.content === '' || block.content === '/')) {
                    setSlashMenuOpen(true);
                  }
                }}
                isReadOnly={isReadOnly}
                placeholder={t.pagePlaceholder}
              />
            )}
          </div>
        );
      })}
      </div>

      {/* Block Options Modal Menu */}
      {activeMenuBlock && (
        <BlockOptionsMenu
          block={activeMenuBlock}
          isOpen={Boolean(activeMenuBlock)}
          onClose={() => setActiveMenuBlock(null)}
          onTurnInto={(type) => handleTurnInto(activeMenuBlock.id, type)}
          onSetColorTint={(tint) => handleSetBlockTint(activeMenuBlock.id, tint)}
          onDuplicate={() => handleDuplicateBlock(activeMenuBlock)}
          onMoveUp={() => {
            const idx = page.blocks.findIndex((b) => b.id === activeMenuBlock.id);
            handleMoveBlock(idx, 'up');
          }}
          onMoveDown={() => {
            const idx = page.blocks.findIndex((b) => b.id === activeMenuBlock.id);
            handleMoveBlock(idx, 'down');
          }}
          onDelete={() => handleDeleteBlock(activeMenuBlock.id)}
          language={isRtl ? 'ar' : 'en'}
        />
      )}

      {/* Page Icon Picker Modal */}
      <IconPickerModal
        isOpen={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        currentIcon={page.icon}
        onSelectIcon={(icon) => onUpdatePage({ ...page, icon })}
        language={isRtl ? 'ar' : 'en'}
      />

      {/* Slash Command Menu */}
      <SlashMenu
        isOpen={slashMenuOpen}
        onClose={() => setSlashMenuOpen(false)}
        onSelect={(type) => handleAddBlock(type)}
        isRtl={isRtl}
      />

      {/* Bottom Add Block & Slash Trigger */}
      {!isReadOnly && (
        <div style={{ marginTop: 28, display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setSlashMenuOpen(!slashMenuOpen)}
            className="axiom-btn-secondary"
          >
            <PlusIcon size={14} />
            <span>{isRtl ? 'إضافة كتلة معمارية (/)' : 'Add Block (/)'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
