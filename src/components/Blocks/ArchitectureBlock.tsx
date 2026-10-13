import React from 'react';
import type { ArchitectureNode } from '../../types';
import { ServerIcon, FlowIcon, PlusIcon, TrashIcon } from '../icons/HugeIcons';

interface Props {
  nodes: ArchitectureNode[];
  onUpdate: (nodes: ArchitectureNode[]) => void;
  isReadOnly?: boolean;
  isRtl?: boolean;
}

export const ArchitectureBlock: React.FC<Props> = ({ nodes, onUpdate, isReadOnly, isRtl }) => {
  const handleAddNode = () => {
    const newNode: ArchitectureNode = {
      id: `node_${Date.now()}`,
      name: isRtl ? 'خدمة سحابية جديدة' : 'New Microservice',
      role: isRtl ? 'معالجة العمليات والتكامل' : 'Business logic & integrations',
      technology: 'Node.js / Go',
      status: 'healthy'
    };
    onUpdate([...nodes, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    onUpdate(nodes.filter(n => n.id !== id));
  };

  const handleUpdateNode = (id: string, field: keyof ArchitectureNode, value: string) => {
    onUpdate(nodes.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  return (
    <div style={{
      margin: '18px 0',
      padding: '20px',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'flex',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-accent-soft)',
            color: 'var(--color-accent)'
          }}>
            <FlowIcon size={18} />
          </span>
          <div>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isRtl ? 'مخطط تدفق النظام والخدمات (System Topology Flow)' : 'System Topology Flow'}
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              {isRtl ? 'تمثيل تفاعلي لتسلسل البيانات والمكونات المعمارية' : 'Interactive flow representing architecture nodes & data transit'}
            </p>
          </div>
        </div>

        {!isReadOnly && (
          <button onClick={handleAddNode} className="ax-btn ax-btn-secondary ax-btn-sm">
            <PlusIcon size={14} />
            <span>{isRtl ? 'إضافة مكون' : 'Add Node'}</span>
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '12px'
      }}>
        {nodes.map((node, index) => (
          <div
            key={node.id}
            style={{
              position: 'relative',
              padding: '14px',
              background: 'var(--color-bg-surface-hover)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              transition: 'border-color var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                  #{index + 1}
                </span>
                <ServerIcon size={14} style={{ color: 'var(--color-text-muted)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`ax-badge ${node.status === 'healthy' ? 'ax-badge-success' : 'ax-badge-warning'}`}>
                  {node.status}
                </span>
                {!isReadOnly && (
                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="ax-btn-icon"
                    style={{ padding: '2px' }}
                    title={isRtl ? 'حذف المكون' : 'Delete node'}
                  >
                    <TrashIcon size={12} />
                  </button>
                )}
              </div>
            </div>

            {isReadOnly ? (
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{node.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{node.role}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                  {node.technology}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <input
                  type="text"
                  value={node.name}
                  onChange={(e) => handleUpdateNode(node.id, 'name', e.target.value)}
                  style={{
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: '2px 0'
                  }}
                  placeholder={isRtl ? 'اسم المكون' : 'Component Name'}
                />
                <input
                  type="text"
                  value={node.role}
                  onChange={(e) => handleUpdateNode(node.id, 'role', e.target.value)}
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-text-secondary)',
                    padding: '2px 0'
                  }}
                  placeholder={isRtl ? 'الدور والمسؤولية' : 'Role & Responsibility'}
                />
                <input
                  type="text"
                  value={node.technology}
                  onChange={(e) => handleUpdateNode(node.id, 'technology', e.target.value)}
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 0'
                  }}
                  placeholder={isRtl ? 'التقنية المستخدمة' : 'Technology Stack'}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
