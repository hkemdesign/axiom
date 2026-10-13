export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export type PageStatus = 'draft' | 'in_review' | 'approved' | 'active';

export type BlockType =
  | 'text'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'table'
  | 'subpage'
  | 'architecture_canvas'
  | 'tech_stack'
  | 'adr'
  | 'api_spec'
  | 'database_schema'
  | 'callout'
  | 'checklist'
  | 'code'
  | 'divider';

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  technology: string;
  status: 'healthy' | 'draft' | 'deprecated';
}

export interface TechStackItem {
  id: string;
  category: string;
  name: string;
  version?: string;
  reason: string;
}

export interface AdrData {
  title: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'superseded';
  context: string;
  decision: string;
  consequences: string;
}

export interface ApiEndpointData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  authRequired: boolean;
  sampleResponse?: string;
}

export interface DbColumn {
  id: string;
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
}

export interface DbEntityData {
  tableName: string;
  description: string;
  columns: DbColumn[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

/* --------------------------------------------------------------------------
   DATABASE TABLE BLOCK TYPES
   -------------------------------------------------------------------------- */
export type TableColumnType = 'title' | 'text' | 'select' | 'status' | 'number' | 'date';

export interface TableSelectOption {
  id: string;
  label: string;
  color: string;
}

export interface TableColumn {
  id: string;
  name: string;
  type: TableColumnType;
  wrapText: boolean;
  width?: number;
  options?: TableSelectOption[];
}

export interface TableRow {
  id: string;
  cells: Record<string, any>;
}

export interface TableFilter {
  columnId: string;
  operator: 'equals' | 'contains' | 'is_empty';
  value: string;
}

export interface TableSort {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface TableData {
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
  filters?: TableFilter[];
  sorts?: TableSort[];
  searchQuery?: string;
}

export interface Block {
  id: string;
  type: BlockType;
  content?: string;
  calloutType?: 'info' | 'warning' | 'security' | 'tip';
  colorTint?: string;
  language?: string;
  architectureNodes?: ArchitectureNode[];
  techStackItems?: TechStackItem[];
  adrData?: AdrData;
  apiData?: ApiEndpointData;
  dbData?: DbEntityData;
  checklistItems?: ChecklistItem[];
  tableData?: TableData;
  subpageId?: string;
}

export interface Collaborator {
  email: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  avatar?: string;
}

export interface ShareSettings {
  generalAccess: 'restricted' | 'anyone_with_link';
  linkRole: 'viewer' | 'commenter' | 'editor';
  collaborators: Collaborator[];
  isPublicLinkActive: boolean;
  shareId: string;
  passwordProtected?: boolean;
  password?: string;
  expiresAt?: string;
}

export interface PageIconData {
  type: 'emoji' | 'hugeicon';
  value: string;
  tint?: string;
}

export interface Page {
  id: string;
  parentId: string | null;
  title: string;
  icon: string | PageIconData;
  coverImage?: string;
  status: PageStatus;
  blocks: Block[];
  shareSettings: ShareSettings;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export type SidebarState = 'locked' | 'closed' | 'peek';

export interface Workspace {
  id: string;
  name: string;
  currentLanguage: Language;
  theme: Theme;
  pages: Page[];
  activePageId: string;
}
