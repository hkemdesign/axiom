import React, { useState } from 'react';
import type { Page, Block } from '../../types';
import { translations } from '../../i18n/translations';
import { SparklesIcon } from '../icons/HugeIcons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSynthesize: (newPage: Page) => void;
  isRtl?: boolean;
}

export const AiSynthesisModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSynthesize,
  isRtl
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const t = isRtl ? translations.ar : translations.en;

  const handleRunSynthesis = () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      // Synthesize realistic architectural blocks based on input
      const title = prompt.length > 50 ? `${prompt.substring(0, 48)}...` : prompt;

      const generatedBlocks: Block[] = [
        {
          id: `b_gen_1`,
          type: 'heading_1',
          content: isRtl ? '1. الرؤية الهندسية وأهداف النظام (System Vision)' : '1. System Vision & Architecture Objectives'
        },
        {
          id: `b_gen_2`,
          type: 'text',
          content: isRtl
            ? `تم تحليل المتطلبات المعمارية لمشروع "${prompt}". تم تصميم النظام ليعمل بكفاءة عالية وفق معايير الحوسبة الموزعة وقابلية التوسع الأفقي.`
            : `Architectural analysis synthesized for "${prompt}". Designed for resilience, horizontal scalability, and developer ergonomics.`
        },
        {
          id: `b_gen_3`,
          type: 'architecture_canvas',
          architectureNodes: [
            { id: 'gn1', name: 'Web/Mobile Client', role: 'Next.js & Flutter frontend', technology: 'TypeScript / Dart', status: 'healthy' },
            { id: 'gn2', name: 'API Gateway', role: 'Authentication & Rate Limiting', technology: 'Envoy Proxy', status: 'healthy' },
            { id: 'gn3', name: 'Core Microservices', role: 'Domain Business Logic', technology: 'Go / Node.js 22', status: 'healthy' },
            { id: 'gn4', name: 'Relational Database', role: 'Primary persistent store', technology: 'PostgreSQL 16', status: 'healthy' },
            { id: 'gn5', name: 'Cache & Stream', role: 'High speed buffer & pub/sub', technology: 'Redis & Kafka', status: 'healthy' }
          ]
        },
        {
          id: `b_gen_4`,
          type: 'tech_stack',
          techStackItems: [
            { id: 'gt1', category: 'Backend Engine', name: 'Go + Gin / Node Fastify', version: 'Latest', reason: 'معدل استجابة منخفض واستهلاك ذاكرة أدنى' },
            { id: 'gt2', category: 'Database', name: 'PostgreSQL + Prisma/Drizzle', version: '16.x', reason: 'اتساق المعاملات ACID ودعم JSONB' },
            { id: 'gt3', category: 'Observability', name: 'OpenTelemetry + Prometheus', version: '2026', reason: 'مراقبة زمن الاستجابة والمقاييس الموزعة' }
          ]
        },
        {
          id: `b_gen_5`,
          type: 'adr',
          adrData: {
            title: isRtl ? 'ADR: اعتماد نمط Event-Driven للنظام' : 'ADR: Event-Driven Topology Selection',
            status: 'accepted',
            context: isRtl
              ? `المشروع يتطلب فك الارتباط بين معالجة الطلبات وتنفيذ العمليات الثقيلة في الخلفية.`
              : `The architecture demands decoupling request processing from heavy background tasks.`,
            decision: isRtl
              ? `تقرر اعتماد طوابير رسائل موزعة عبر Kafka لمعالجة الأحداث بشكل غير متزامن.`
              : `Adopt asynchronous event processing over message streams with idempotency guarantees.`,
            consequences: isRtl
              ? `تحسن استقرار النظام وانخفاض زمن الاستجابة للمستخدم، مع متطلب إدارة طوابير الرسائل.`
              : `Substantially lower latency, at the cost of eventual consistency management.`
          }
        },
        {
          id: `b_gen_6`,
          type: 'checklist',
          checklistItems: [
            { id: 'gc1', text: isRtl ? 'إعداد بنية الـ Repository وإعدادات Docker' : 'Initialize monorepo & container definitions', completed: true },
            { id: 'gc2', text: isRtl ? 'بناء مخطط قاعدة البيانات ونماذج الـ ORM' : 'Build schema migrations & Drizzle models', completed: false },
            { id: 'gc3', text: isRtl ? 'تطبيق واجهات الـ REST وحماية مسارات الـ Auth' : 'Implement API endpoints & JWT/OAuth policies', completed: false }
          ]
        }
      ];

      const newPage: Page = {
        id: `page_ai_${Date.now()}`,
        parentId: null,
        title: `${isRtl ? 'مخطط معماري: ' : 'Blueprint: '}${title}`,
        icon: '🧠',
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
        status: 'in_review',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: true,
        shareSettings: {
          generalAccess: 'anyone_with_link',
          linkRole: 'viewer',
          isPublicLinkActive: true,
          shareId: `axiom-ai-${Math.random().toString(36).substring(2, 8)}`,
          collaborators: [
            { email: 'founder@axiom.dev', name: 'Abdoo (Lead Architect)', role: 'owner' },
            { email: 'ai-architect@axiom.dev', name: 'Axiom AI Architect', role: 'editor' }
          ]
        },
        blocks: generatedBlocks
      };

      setLoading(false);
      onSynthesize(newPage);
      onClose();
    }, 900);
  };

  return (
    <div className="ax-modal-backdrop" onClick={onClose}>
      <div className="ax-modal-container" onClick={(e) => e.stopPropagation()}>
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
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent)'
            }}>
              <SparklesIcon size={20} />
            </span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.aiModalTitle}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.aiModalSubtitle}</p>
            </div>
          </div>

          <button onClick={onClose} className="ax-btn-icon" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
            ✕
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <textarea
            autoFocus
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.aiInputPlaceholder}
            className="ax-input"
            style={{ width: '100%', resize: 'vertical', lineHeight: 1.6 }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {isRtl ? 'نماذج جاهزة للاختبار بنقرة واحدة:' : 'Try a quick prompt:'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                onClick={() => setPrompt(t.aiSamplePrompt1)}
                className="ax-btn ax-btn-secondary ax-btn-sm"
                style={{ fontSize: '0.76rem' }}
              >
                {t.aiSamplePrompt1}
              </button>
              <button
                onClick={() => setPrompt(t.aiSamplePrompt2)}
                className="ax-btn ax-btn-secondary ax-btn-sm"
                style={{ fontSize: '0.76rem' }}
              >
                {t.aiSamplePrompt2}
              </button>
              <button
                onClick={() => setPrompt(t.aiSamplePrompt3)}
                className="ax-btn ax-btn-secondary ax-btn-sm"
                style={{ fontSize: '0.76rem' }}
              >
                {t.aiSamplePrompt3}
              </button>
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          background: 'var(--color-bg-surface)'
        }}>
          <button onClick={onClose} className="ax-btn ax-btn-secondary">
            {t.cancel}
          </button>
          <button
            onClick={handleRunSynthesis}
            disabled={!prompt.trim() || loading}
            className="ax-btn ax-btn-primary"
            style={{ opacity: !prompt.trim() || loading ? 0.6 : 1 }}
          >
            {loading ? (
              <span>{t.aiProcessing}</span>
            ) : (
              <>
                <SparklesIcon size={16} />
                <span>{t.aiSynthesizeBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
