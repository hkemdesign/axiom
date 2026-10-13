import React, { useState, useMemo } from 'react';
import type {
  TableData,
  TableColumn,
  TableRow,
  TableColumnType,
  TableSort,
} from '../../types';
import {
  FilterIcon,
  SortIcon,
  WrapTextIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
  MoreIcon,
  CheckIcon,
} from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';

interface TableBlockProps {
  data?: TableData;
  onChange: (updated: TableData) => void;
  language?: 'ar' | 'en';
}

const DEFAULT_COLUMNS: TableColumn[] = [
  { id: 'col_name', name: 'المكون المعماري', type: 'title', wrapText: true, width: 220 },
  {
    id: 'col_status',
    name: 'الحالة',
    type: 'status',
    wrapText: false,
    width: 140,
    options: [
      { id: 'planned', label: 'مخطط', color: '#559AD4' },
      { id: 'in_progress', label: 'قيد التنفيذ', color: '#C4D93B' },
      { id: 'completed', label: 'مكتمل', color: '#4EAA79' },
      { id: 'review', label: 'مراجعة', color: '#E2A43B' },
    ],
  },
  {
    id: 'col_layer',
    name: 'الطبقة البرمجية',
    type: 'select',
    wrapText: true,
    width: 160,
    options: [
      { id: 'core', label: 'Core Kernel', color: '#5A710C' },
      { id: 'api', label: 'Gateway API', color: '#9D84E8' },
      { id: 'data', label: 'Storage Layer', color: '#DE5B52' },
    ],
  },
  { id: 'col_desc', name: 'الملاحظات والمتطلبات الفنية', type: 'text', wrapText: true, width: 300 },
];

const DEFAULT_ROWS: TableRow[] = [
  {
    id: 'row_1',
    cells: {
      col_name: 'Authentication Engine',
      col_status: 'completed',
      col_layer: 'core',
      col_desc: 'محرك التحقق متعدد العوامل مع دعم مفاتيح الجلسات المشفرة وتخزين الرموز المؤقتة.',
    },
  },
  {
    id: 'row_2',
    cells: {
      col_name: 'Vector Search Pipeline',
      col_status: 'in_progress',
      col_layer: 'data',
      col_desc: 'فهرسة الوثائق المعمارية عبر تضمينات نصية فائقة السرعة مع استرجاع هجين.',
    },
  },
  {
    id: 'row_3',
    cells: {
      col_name: 'API Gateway Router',
      col_status: 'review',
      col_layer: 'api',
      col_desc: 'توجيه المسارات والتحكم في معدل الطلبات وفحص شهادات الأمان بدقة.',
    },
  },
];

export const TableBlock: React.FC<TableBlockProps> = ({
  data = { title: 'قاعدة بيانات النظم', columns: DEFAULT_COLUMNS, rows: DEFAULT_ROWS },
  onChange,
  language = 'ar',
}) => {
  const [search, setSearch] = useState('');
  const [filterColumn, setFilterColumn] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('');
  const [activeSort, setActiveSort] = useState<TableSort | null>(null);
  const [activeMenuColId, setActiveMenuColId] = useState<string | null>(null);

  const columns = data.columns || DEFAULT_COLUMNS;
  const rows = data.rows || DEFAULT_ROWS;

  // Filter and Sort Rows
  const processedRows = useMemo(() => {
    let result = [...rows];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row.cells).some((val) =>
          String(val || '').toLowerCase().includes(q)
        )
      );
    }

    // Column filter
    if (filterColumn !== 'all' && filterValue.trim()) {
      result = result.filter((row) => {
        const val = String(row.cells[filterColumn] || '').toLowerCase();
        return val.includes(filterValue.toLowerCase());
      });
    }

    // Sort
    if (activeSort) {
      result.sort((a, b) => {
        const valA = String(a.cells[activeSort.columnId] || '');
        const valB = String(b.cells[activeSort.columnId] || '');
        const cmp = valA.localeCompare(valB);
        return activeSort.direction === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [rows, search, filterColumn, filterValue, activeSort]);

  const handleCellChange = (rowId: string, colId: string, value: any) => {
    const updatedRows = rows.map((r) => {
      if (r.id === rowId) {
        return { ...r, cells: { ...r.cells, [colId]: value } };
      }
      return r;
    });
    onChange({ ...data, rows: updatedRows });
  };

  const handleToggleWrap = (colId: string) => {
    const updatedCols = columns.map((col) => {
      if (col.id === colId) {
        return { ...col, wrapText: !col.wrapText };
      }
      return col;
    });
    onChange({ ...data, columns: updatedCols });
    setActiveMenuColId(null);
  };

  const handleAddRow = () => {
    const newRowId = `row_${Date.now()}`;
    const newRow: TableRow = {
      id: newRowId,
      cells: {
        [columns[0]?.id || 'col_name']: language === 'ar' ? 'عنصر جديد' : 'New Item',
      },
    };
    onChange({ ...data, rows: [...rows, newRow] });
  };

  const handleDeleteRow = (rowId: string) => {
    onChange({ ...data, rows: rows.filter((r) => r.id !== rowId) });
  };

  const handleAddColumn = (type: TableColumnType = 'text') => {
    const newColId = `col_${Date.now()}`;
    const newCol: TableColumn = {
      id: newColId,
      name: language === 'ar' ? `عمود ${columns.length + 1}` : `Column ${columns.length + 1}`,
      type,
      wrapText: true,
      width: 180,
    };
    onChange({ ...data, columns: [...columns, newCol] });
  };

  const handleDeleteColumn = (colId: string) => {
    if (columns.length <= 1) return;
    onChange({ ...data, columns: columns.filter((c) => c.id !== colId) });
    setActiveMenuColId(null);
  };

  const handleSortToggle = (colId: string) => {
    if (activeSort?.columnId === colId) {
      if (activeSort.direction === 'asc') {
        setActiveSort({ columnId: colId, direction: 'desc' });
      } else {
        setActiveSort(null);
      }
    } else {
      setActiveSort({ columnId: colId, direction: 'asc' });
    }
  };

  return (
    <div className="axiom-table-container">
      {/* Table Toolbar */}
      <div className="axiom-table-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--color-text-primary)' }}>
            {data.title || (language === 'ar' ? 'جدول البيانات' : 'Data Table')}
          </span>
          <span className="axiom-chip" style={{ fontSize: 11 }}>
            {processedRows.length} {language === 'ar' ? 'عنصر' : 'rows'}
          </span>
        </div>

        {/* Filters and search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <FilterIcon size={13} style={{ color: filterColumn !== 'all' ? 'var(--color-accent-lime)' : 'var(--color-text-muted)' }} />
            <AxiomDropdown
              size="sm"
              value={filterColumn}
              onChange={(val) => {
                setFilterColumn(val);
                if (val === 'all') setFilterValue('');
              }}
              options={[
                { id: 'all', label: language === 'ar' ? 'كل الأعمدة' : 'All Columns' },
                ...columns.map((c) => ({ id: c.id, label: c.name })),
              ]}
              isRtl={language === 'ar'}
            />
            {filterColumn !== 'all' && (
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder={language === 'ar' ? 'قيمة التصفية...' : 'Filter value...'}
                style={{
                  padding: '3px 6px',
                  fontSize: 12,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-bg-surface)',
                  width: 90,
                }}
              />
            )}
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في الجدول...' : 'Filter table...'}
              style={{
                padding: '4px 8px',
                paddingInlineStart: 26,
                fontSize: 12,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-surface)',
                width: 140,
              }}
            />
            <SearchIcon
              size={12}
              style={{
                position: 'absolute',
                top: '50%',
                insetInlineStart: 8,
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
          </div>

          {/* Add Column Dropdown */}
          <button
            type="button"
            onClick={() => handleAddColumn('text')}
            className="axiom-btn-secondary"
            style={{ fontSize: 12, padding: '4px 10px' }}
          >
            <PlusIcon size={12} />
            <span>{language === 'ar' ? 'إضافة عمود' : 'Add Column'}</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <table className="axiom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} style={{ width: col.width || 'auto', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <div
                    onClick={() => handleSortToggle(col.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                  >
                    <span>{col.name}</span>
                    {activeSort?.columnId === col.id && (
                      <span style={{ fontSize: 10, color: 'var(--color-accent-lime)' }}>
                        {activeSort.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>

                  {/* Column Settings Menu Trigger */}
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => setActiveMenuColId(activeMenuColId === col.id ? null : col.id)}
                      className="axiom-icon-btn"
                      style={{ width: 20, height: 20 }}
                    >
                      <MoreIcon size={12} />
                    </button>

                    {activeMenuColId === col.id && (
                      <div
                        className="axiom-card"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          insetInlineEnd: 0,
                          width: 190,
                          padding: 6,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 3,
                          zIndex: 60,
                          boxShadow: 'var(--shadow-md)',
                        }}
                      >
                        {/* Wrap text toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleWrap(col.id)}
                          className="axiom-btn-ghost"
                          style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            fontSize: 12,
                            padding: '5px 8px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <WrapTextIcon size={13} />
                            <span>{language === 'ar' ? 'التفاف النص' : 'Wrap text'}</span>
                          </div>
                          {col.wrapText && <CheckIcon size={13} style={{ color: 'var(--color-accent-lime)' }} />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSortToggle(col.id)}
                          className="axiom-btn-ghost"
                          style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12, padding: '5px 8px' }}
                        >
                          <SortIcon size={13} />
                          <span>{language === 'ar' ? 'ترتيب تصاعدي/تنازلي' : 'Sort column'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteColumn(col.id)}
                          className="axiom-btn-ghost"
                          style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            fontSize: 12,
                            padding: '5px 8px',
                            color: 'var(--color-status-danger)',
                          }}
                        >
                          <TrashIcon size={13} />
                          <span>{language === 'ar' ? 'حذف العمود' : 'Delete column'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </th>
            ))}
            <th style={{ width: 44, textAlign: 'center' }} />
          </tr>
        </thead>
        <tbody>
          {processedRows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                const cellVal = row.cells[col.id] || '';
                const wrapClass = col.wrapText ? 'axiom-table-cell-wrap' : 'axiom-table-cell-nowrap';

                return (
                  <td key={col.id} className={wrapClass}>
                    {col.type === 'status' && col.options ? (
                      <AxiomDropdown
                        size="sm"
                        variant="pill"
                        value={cellVal}
                        onChange={(val) => handleCellChange(row.id, col.id, val)}
                        options={col.options.map((opt) => ({
                          id: opt.id,
                          label: opt.label,
                          color: opt.color,
                        }))}
                        isRtl={language === 'ar'}
                      />
                    ) : col.type === 'select' && col.options ? (
                      <AxiomDropdown
                        size="sm"
                        variant="pill"
                        value={cellVal}
                        onChange={(val) => handleCellChange(row.id, col.id, val)}
                        options={col.options.map((opt) => ({
                          id: opt.id,
                          label: opt.label,
                          color: opt.color,
                        }))}
                        isRtl={language === 'ar'}
                      />
                    ) : (
                      <textarea
                        value={cellVal}
                        rows={col.wrapText ? Math.max(1, Math.ceil(cellVal.length / 32)) : 1}
                        onChange={(e) => handleCellChange(row.id, col.id, e.target.value)}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          resize: 'none',
                          fontSize: 13,
                          lineHeight: 1.5,
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    )}
                  </td>
                );
              })}
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteRow(row.id)}
                  className="axiom-icon-btn"
                  style={{ width: 24, height: 24, color: 'var(--color-text-muted)' }}
                  title={language === 'ar' ? 'حذف السطر' : 'Delete row'}
                >
                  <TrashIcon size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button at bottom */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-canvas)' }}>
        <button
          type="button"
          onClick={handleAddRow}
          className="axiom-btn-ghost"
          style={{ fontSize: 12.5, gap: 5 }}
        >
          <PlusIcon size={13} />
          <span>{language === 'ar' ? 'إضافة سجل جديد' : 'New Row'}</span>
        </button>
      </div>
    </div>
  );
};
