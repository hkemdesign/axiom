import React, { useState, useEffect } from 'react';
import type { Block } from '../../types';
import { ListTreeIcon } from '../icons/HugeIcons';

interface TocRailProps {
  blocks: Block[];
  language?: 'ar' | 'en';
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TocRail: React.FC<TocRailProps> = ({ blocks, language = 'ar' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  const headings: TocItem[] = blocks
    .filter((b) => b.type === 'heading_1' || b.type === 'heading_2' || b.type === 'heading_3')
    .map((b) => ({
      id: b.id,
      text: b.content || (language === 'ar' ? 'عنوان فارغ' : 'Untitled Heading'),
      level: b.type === 'heading_1' ? 1 : b.type === 'heading_2' ? 2 : 3,
    }));

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => ({ id: h.id, el: document.getElementById(`block-${h.id}`) }))
        .filter((h) => h.el !== null);

      let currentActive = headings[0].id;
      for (const item of headingElements) {
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentActive = item.id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(`block-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <div
      className="axiom-toc-rail"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Table of Contents Rail"
    >
      <div className="axiom-toc-rail-track">
        {headings.map((item) => (
          <div
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className={`axiom-toc-dash level-${item.level} ${activeId === item.id ? 'active' : ''}`}
            title={item.text}
          />
        ))}
      </div>

      {isHovered && (
        <div className="axiom-toc-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4, paddingBottom: 6, borderBottom: '1px solid var(--color-border-subtle)' }}>
            <ListTreeIcon size={15} style={{ color: 'var(--color-accent-lime)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {language === 'ar' ? 'محتويات الصفحة' : 'Table of Contents'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 320, overflowY: 'auto' }}>
            {headings.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={`axiom-toc-item level-${item.level} ${activeId === item.id ? 'active' : ''}`}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: activeId === item.id ? 'var(--color-accent-lime)' : 'var(--color-text-muted)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
