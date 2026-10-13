import type { Page } from '../types';

export const initialPages: Page[] = [
  {
    id: 'page_arch_core',
    parentId: null,
    title: 'المخطط المعماري للنظام الأساسي: Core Platform Architecture',
    icon: '⚡',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    status: 'approved',
    createdAt: '2026-10-12T08:00:00Z',
    updatedAt: '2026-10-13T09:00:00Z',
    isFavorite: true,
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'axiom-pub-8f92a1',
      collaborators: [
        { email: 'founder@axiom.dev', name: 'Abdoo (Lead Architect)', role: 'owner' },
        { email: 'engineer@axiom.dev', name: 'Sara Al-Omari', role: 'editor' },
        { email: 'devops@axiom.dev', name: 'Tariq Hassan', role: 'viewer' },
      ],
    },
    blocks: [
      {
        id: 'b1',
        type: 'heading_1',
        content: '1. الرؤية الهندسية وأهداف النظام (System Vision & Invariants)',
      },
      {
        id: 'b2',
        type: 'text',
        content: 'يقدم هذا المستند المرجعي الأساس الهيكلي الموحد لمنصة Axiom. يركز التصميم على مرونة الأداء العالي، واستقلالية الخدمات، والتوافق الفوري مع وكلاء الذكاء الاصطناعي عبر بروتوكول MCP دون أي وسائط معقدة.',
      },
      {
        id: 'b3',
        type: 'callout',
        calloutType: 'security',
        content: 'مبدأ أمني ثابت: لا يتم تخزين أي مفاتيح تشفير أو رموز وصول في جانب المتصفح. جميع استدعاءات وكلاء الذكاء الاصطناعي تمر عبر بوابات مصادقة مدعومة بـ mTLS وRBAC.',
      },
      {
        id: 'b_sub1',
        type: 'subpage',
        subpageId: 'page_db_subpage',
      },
      {
        id: 'b_sub2',
        type: 'subpage',
        subpageId: 'page_api_subpage',
      },
      {
        id: 'b4',
        type: 'heading_2',
        content: '2. جدول مصفوفة النظم والمكونات (Systems Matrix)',
      },
      {
        id: 'b_table',
        type: 'table',
        tableData: {
          title: 'جدول المكونات المعمارية وحالاتها',
          columns: [
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
              name: 'الطبقة',
              type: 'select',
              wrapText: true,
              width: 160,
              options: [
                { id: 'core', label: 'Core Kernel', color: '#5A710C' },
                { id: 'gateway', label: 'API Gateway', color: '#9D84E8' },
                { id: 'data', label: 'Storage', color: '#DE5B52' },
              ],
            },
            { id: 'col_desc', name: 'الملاحظات والمتطلبات الفنية والتفاصيل', type: 'text', wrapText: true, width: 320 },
          ],
          rows: [
            {
              id: 'r1',
              cells: {
                col_name: 'Authentication Engine',
                col_status: 'completed',
                col_layer: 'core',
                col_desc: 'محرك التحقق متعدد العوامل مع دعم مفاتيح الجلسات المشفرة وتخزين الرموز المؤقتة في الذاكرة السريعة.',
              },
            },
            {
              id: 'r2',
              cells: {
                col_name: 'Vector Search Pipeline',
                col_status: 'in_progress',
                col_layer: 'data',
                col_desc: 'فهرسة الوثائق المعمارية عبر تضمينات نصية فائقة السرعة مع استرجاع هجين يدعم البحث الدلالي.',
              },
            },
            {
              id: 'r3',
              cells: {
                col_name: 'API Gateway Router',
                col_status: 'review',
                col_layer: 'gateway',
                col_desc: 'توجيه المسارات والتحكم في معدل الطلبات وفحص شهادات الأمان بدقة عالية قبل الوصول للخدمات.',
              },
            },
          ],
        },
      },
      {
        id: 'b5',
        type: 'heading_2',
        content: '3. مخطط تدفق بنية النظام التفاعلي (System Topology Flow)',
      },
      {
        id: 'b6',
        type: 'architecture_canvas',
        architectureNodes: [
          { id: 'n1', name: 'Edge Client / UI', role: 'Vite Client with Offline Cache', technology: 'React 19 + Axiom Tokens', status: 'healthy' },
          { id: 'n2', name: 'API Gateway', role: 'Reverse Proxy, Rate Limiting & Auth', technology: 'Envoy / Traefik', status: 'healthy' },
          { id: 'n3', name: 'Axiom Core Engine', role: 'Block Ledger, Page Tree & Mutations', technology: 'Node.js 22 LTS / Fastify', status: 'healthy' },
          { id: 'n4', name: 'AI MCP Bridge', role: 'Model Context Protocol Server', technology: '@modelcontextprotocol/sdk', status: 'healthy' },
          { id: 'n5', name: 'Primary Database', role: 'Structured Blocks, Pages & Access', technology: 'PostgreSQL / Local SQLite', status: 'healthy' },
        ],
      },
      {
        id: 'b7',
        type: 'heading_2',
        content: '4. قرار معماري: استخدام بروتوكول MCP للذكاء الاصطناعي',
      },
      {
        id: 'b8',
        type: 'adr',
        adrData: {
          title: 'ADR-001: اعتماد بروتوكول MCP كواجهة قياسية وحيدة لنمذجة الوكلاء الذكية',
          status: 'accepted',
          context: 'نحتاج إلى تمكين وكلاء البرمجة ومساعدي الذكاء الاصطناعي من قراءة وتحديث صفحات النظام دون الحاجة لبناء ملحقات مخصصة لكل نموذج.',
          decision: 'توفير خادم MCP محلي وعن بعد يتيح أدوات: list_blueprints, read_page, create_page, append_block.',
          consequences: 'تحقيق تكامل مباشر مع جميع الوكلاء دون تكلفة اشتراكات أو قيود واجهات خارجية.',
        },
      },
      {
        id: 'b9',
        type: 'heading_3',
        content: '5. قائمة التحقق المعمارية للتنفيذ (Milestones)',
      },
      {
        id: 'b10',
        type: 'checklist',
        checklistItems: [
          { id: 'c1', text: 'بناء نظام التصميم المعماري Axiom بالوضعين الداكن والفاتح', completed: true },
          { id: 'c2', text: 'إعداد خط GT America Arabic عبر 7 أوزان قياسية', completed: true },
          { id: 'c3', text: 'إدراج خطوط المحتوى الجانبية (TOC Rail) مع المعاينة التفاعلية', completed: true },
          { id: 'c4', text: 'بناء جدول قواعد البيانات مع تصفية والتفاف النصوص والترتيب', completed: true },
          { id: 'c5', text: 'دعم تداخل الصفحات الفرعية والتنقل الهرمي في الشريط العلوي', completed: true },
        ],
      },
    ],
  },
  {
    id: 'page_db_subpage',
    parentId: 'page_arch_core',
    title: 'نظام إدارة قواعد البيانات والتخزين الموزع',
    icon: '🗄️',
    status: 'in_review',
    createdAt: '2026-10-12T09:30:00Z',
    updatedAt: '2026-10-13T09:30:00Z',
    shareSettings: {
      generalAccess: 'restricted',
      linkRole: 'viewer',
      isPublicLinkActive: false,
      shareId: 'axiom-pub-db-91',
      collaborators: [],
    },
    blocks: [
      {
        id: 'db_b1',
        type: 'heading_1',
        content: 'مخطط طبقة البيانات وتوزيع الأحمال',
      },
      {
        id: 'db_b2',
        type: 'text',
        content: 'تفاصيل تقسيم جداول الكتل المعمارية والفهارس السريعة لضمان أداء قراءة في أقل من 10 مللي ثانية.',
      },
      {
        id: 'db_b3',
        type: 'database_schema',
        dbData: {
          tableName: 'workspace_pages',
          description: 'جدول الصفحات المعمارية والعلاقات الهرمية.',
          columns: [
            { id: 'col1', name: 'id', type: 'UUID', isPrimary: true },
            { id: 'col2', name: 'parent_id', type: 'UUID', isNullable: true },
            { id: 'col3', name: 'title', type: 'VARCHAR(255)', isNullable: false },
            { id: 'col4', name: 'blocks_json', type: 'JSONB', isNullable: false },
          ],
        },
      },
    ],
  },
  {
    id: 'page_api_subpage',
    parentId: 'page_arch_core',
    title: 'بوابة الـ API ومسارات الاتصال المباشر',
    icon: '🚀',
    status: 'approved',
    createdAt: '2026-10-12T10:00:00Z',
    updatedAt: '2026-10-13T10:00:00Z',
    shareSettings: {
      generalAccess: 'restricted',
      linkRole: 'viewer',
      isPublicLinkActive: false,
      shareId: 'axiom-pub-api-44',
      collaborators: [],
    },
    blocks: [
      {
        id: 'api_b1',
        type: 'heading_1',
        content: 'مواصفات مسارات الـ API',
      },
      {
        id: 'api_b2',
        type: 'api_spec',
        apiData: {
          method: 'POST',
          path: '/api/v1/pages/create',
          description: 'إنشاء صفحة معمارية جديدة وتخصيص الكتل الهندسية لها.',
          authRequired: true,
          sampleResponse: '{\n  "status": "success",\n  "pageId": "page_123"\n}',
        },
      },
    ],
  },
];
