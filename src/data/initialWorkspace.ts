import type { Page } from '../types';

export const initialPages: Page[] = [
  // =========================================================================
  // 1. PRIMARY RECREATED NOTION HUB: Sidequeue: Project Hub
  // =========================================================================
  {
    id: 'page_sidequeue_hub',
    parentId: null,
    title: 'Sidequeue: Project Hub',
    icon: '🎮',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    status: 'active',
    createdAt: '2026-08-26T12:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    isFavorite: true,
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'sidequeue-hub-3c8ae4',
      collaborators: [
        { email: 'founder@sidequeue.gg', name: 'Abdoo (Lead Architect)', role: 'owner' },
        { email: 'agent@antigravity.ai', name: 'Antigravity AI Agent', role: 'editor' },
      ],
    },
    blocks: [
      {
        id: 'b_sq_callout_main',
        type: 'callout',
        calloutType: 'info',
        content: 'This page is the main reference for the project. Any AI agent starts from here.',
      },
      {
        id: 'b_sq_lead',
        type: 'text',
        content: 'League of Legends tournament platform covering registration, live draft, bracket play, custom game lobbies, and match reporting. Built for organizers running competitive LoL tournaments end to end.',
      },
      {
        id: 'b_sq_h1_what',
        type: 'heading_1',
        content: 'What is this',
      },
      {
        id: 'b_sq_desc_what',
        type: 'text',
        content: 'A comprehensive tournament platform for League of Legends. Covers tournament brackets, live draft and pick-ban, custom game lobbies, and match reporting, from registration to finals.\n\nProject name: Sidequeue. Confirmed 2026-08-26.',
      },
      {
        id: 'b_sq_tech_stack',
        type: 'tech_stack',
        techStackItems: [
          {
            id: 'ts_fe',
            category: 'Frontend Engine',
            name: 'Next.js 15 (App Router)',
            version: 'React 19 / TypeScript',
            reason: 'Server Components, streaming metadata, and high-performance routing.',
          },
          {
            id: 'ts_ui',
            category: 'Styling & Design System',
            name: 'Tailwind CSS + shadcn/ui',
            version: 'Phase 0.5 tokens',
            reason: 'Custom dark high-contrast esports theme, typography scale, and components.',
          },
          {
            id: 'ts_db',
            category: 'Database & Auth',
            name: 'Supabase (Postgres, Auth, Realtime)',
            version: 'PostgreSQL 16',
            reason: 'Row Level Security (RLS) enforcement, same setup as Muqtarah | مُقترح - Project.',
          },
          {
            id: 'ts_infra',
            category: 'Hosting & Deployment',
            name: 'Vercel',
            version: 'Edge Network',
            reason: 'Preview deployments per branch, automated CI/CD.',
          },
          {
            id: 'ts_riot',
            category: 'External Game API',
            name: 'Riot Games API & Data Dragon',
            version: 'v1 / v4 / v5 APIs',
            reason: 'Account-V1, Summoner-V4, League-V4, Match-V5, Spectator-V5, Tournament-V5 static CDN.',
          },
          {
            id: 'ts_realtime',
            category: 'Realtime Channels',
            name: 'Supabase Realtime WebSockets',
            version: 'Live Channels',
            reason: 'Sub-second synchronization for live draft pick-ban and bracket progression.',
          },
        ],
      },
      {
        id: 'b_sq_h1_plans',
        type: 'heading_1',
        content: 'Plans',
      },
      {
        id: 'b_sq_subpage_riot',
        type: 'subpage',
        subpageId: 'page_plan_riot_api',
      },
      {
        id: 'b_sq_subpage_draft',
        type: 'subpage',
        subpageId: 'page_plan_draft_tool',
      },
      {
        id: 'b_sq_subpage_bracket',
        type: 'subpage',
        subpageId: 'page_plan_bracket_engine',
      },
      {
        id: 'b_sq_subpage_lobby',
        type: 'subpage',
        subpageId: 'page_plan_lobby_reporting',
      },
      {
        id: 'b_sq_h1_current',
        type: 'heading_1',
        content: 'Current State',
      },
      {
        id: 'b_sq_state_text',
        type: 'text',
        content: 'Phase 0 and Phase 0.5 complete, awaiting review. Repo: https://github.com/hkemdesign/sidequeue (private). Next.js 15 App Router scaffold with Tailwind CSS, shadcn/ui, ESLint, Prettier, and Supabase env placeholders (not wired live). Design system foundation, dark high-contrast palette, type scale, spacing and radius scale, shadcn theme tokens, button/card/badge/input variants, live at /design-system. Repo is ready to link to Vercel, not deployed yet.',
      },
      {
        id: 'b_sq_key_callout',
        type: 'callout',
        calloutType: 'warning',
        content: 'Development key caps at 20 requests per second and 100 per 2 minutes, expires every 24 hours, and cannot power anything public, not even an open beta. A production key is required before this goes live, needs a working prototype to apply, and review takes one to three weeks or longer. Start that application once Phase 2 has something to show. Full detail in the Riot Games API Integration Layer plan above.',
      },
      {
        id: 'b_sq_h1_next',
        type: 'heading_1',
        content: 'Next Tasks',
      },
      {
        id: 'b_sq_next_tasks',
        type: 'checklist',
        checklistItems: [
          {
            id: 'chk_nt1',
            text: 'Confirm project name and branding direction (Done, name is Sidequeue)',
            completed: true,
          },
          {
            id: 'chk_nt2',
            text: 'Confirm which regions the tournament runs in, Riot API rate limits and routing are per region',
            completed: false,
          },
          {
            id: 'chk_nt3',
            text: 'Start Phase 0 (scaffold), then Phase 0.5 (design system) before any feature screen gets built (Done, awaiting review before Phase 1)',
            completed: true,
          },
        ],
      },
      {
        id: 'b_sq_h1_rules',
        type: 'heading_1',
        content: 'Agent Rules',
      },
      {
        id: 'b_sq_rules_callout',
        type: 'callout',
        calloutType: 'security',
        content: '1. TypeScript only\n2. No em dashes anywhere in generated content\n3. Work in phases, confirm each phase before starting the next (Each Phases Complete write beside "Done", same in future added Phases)\n4. Zod validation on every input\n5. Every Supabase query scoped by RLS, never trust a client-side role claim\n6. Riot API key stays server-side only, never exposed to the client\n7. All Riot API calls go through the throttled service layer, no direct fetches from routes',
      },
      {
        id: 'b_sq_h1_roadmap',
        type: 'heading_1',
        content: 'Phase Roadmap',
      },
      {
        id: 'b_sq_roadmap',
        type: 'checklist',
        checklistItems: [
          {
            id: 'rm_p0',
            text: 'Phase 0: Foundation & Scaffold - Done',
            completed: true,
          },
          {
            id: 'rm_p05',
            text: 'Phase 0.5: Design System Foundation, color palette, typography scale, spacing and radius scale, shadcn theme tokens, core component variants. Done right after scaffold, before any feature screen, so nothing gets built on shadcn defaults - Done',
            completed: true,
          },
          {
            id: 'rm_p1',
            text: 'Phase 1: Auth & Core Data Model',
            completed: false,
          },
          {
            id: 'rm_p2',
            text: 'Phase 2: Riot Games API Integration Layer',
            completed: false,
          },
          {
            id: 'rm_p3',
            text: 'Phase 3: Tournament & Bracket Engine',
            completed: false,
          },
          {
            id: 'rm_p4',
            text: 'Phase 4: Draft & Pick-Ban Tool',
            completed: false,
          },
          {
            id: 'rm_p5',
            text: 'Phase 5: Custom Game Lobby & Match Reporting',
            completed: false,
          },
          {
            id: 'rm_p6',
            text: 'Phase 6: Team & Player Management',
            completed: false,
          },
          {
            id: 'rm_p7',
            text: 'Phase 7: Standings & Results',
            completed: false,
          },
          {
            id: 'rm_p8',
            text: 'Phase 8: Public Spectator Site',
            completed: false,
          },
          {
            id: 'rm_p9',
            text: 'Phase 9: Admin Dashboard',
            completed: false,
          },
          {
            id: 'rm_p10',
            text: 'Phase 10: Responsiveness & Polish Pass, full audit against every screen built in Phases 0 through 9, loading skeletons, accessibility pass. The design system itself is Phase 0.5, this phase is the audit against real screens',
            completed: false,
          },
        ],
      },
      {
        id: 'b_sq_roadmap_note',
        type: 'text',
        content: 'Each phase task-level breakdown lives in the Tasks database below, not duplicated here.',
      },
      {
        id: 'b_sq_h1_tasks',
        type: 'heading_1',
        content: 'Tasks',
      },
      {
        id: 'b_sq_tasks_matrix',
        type: 'table',
        tableData: {
          title: 'LoL Tournament Platform - Tasks',
          columns: [
            { id: 'col_task', name: 'Task', type: 'title', wrapText: true, width: 230 },
            {
              id: 'col_area',
              name: 'Area',
              type: 'select',
              wrapText: false,
              width: 120,
              options: [
                { id: 'Design', label: 'Design', color: '#E2A43B' },
                { id: 'Frontend', label: 'Frontend', color: '#559AD4' },
                { id: 'Backend', label: 'Backend', color: '#4EAA79' },
                { id: 'Riot API', label: 'Riot API', color: '#C4D93B' },
                { id: 'Database', label: 'Database', color: '#9D84E8' },
                { id: 'Infra', label: 'Infra', color: '#A3A79C' },
              ],
            },
            { id: 'col_details', name: 'Details', type: 'text', wrapText: true, width: 280 },
            {
              id: 'col_phase',
              name: 'Phase',
              type: 'select',
              wrapText: false,
              width: 170,
              options: [
                { id: 'p0', label: 'Phase 0 - Scaffold', color: '#A3A79C' },
                { id: 'p05', label: 'Phase 0.5 - Design System', color: '#E2A43B' },
                { id: 'p1', label: 'Phase 1 - Auth & Data Model', color: '#9D84E8' },
                { id: 'p2', label: 'Phase 2 - Riot API', color: '#C4D93B' },
                { id: 'p3', label: 'Phase 3 - Bracket Engine', color: '#E2A43B' },
                { id: 'p4', label: 'Phase 4 - Draft Tool', color: '#4EAA79' },
                { id: 'p5', label: 'Phase 5 - Custom Lobby', color: '#559AD4' },
                { id: 'p6', label: 'Phase 6 - Team & Player Mgt', color: '#9D84E8' },
                { id: 'p7', label: 'Phase 7 - Standings & Results', color: '#E2A43B' },
                { id: 'p8', label: 'Phase 8 - Public Site', color: '#559AD4' },
                { id: 'p9', label: 'Phase 9 - Admin Dashboard', color: '#DE5B52' },
                { id: 'p10', label: 'Phase 10 - Design Polish', color: '#A3A79C' },
              ],
            },
            {
              id: 'col_priority',
              name: 'Priority',
              type: 'select',
              wrapText: false,
              width: 110,
              options: [
                { id: 'High', label: 'High', color: '#DE5B52' },
                { id: 'Medium', label: 'Medium', color: '#E2A43B' },
                { id: 'Low', label: 'Low', color: '#A3A79C' },
              ],
            },
            {
              id: 'col_status',
              name: 'Status',
              type: 'status',
              wrapText: false,
              width: 130,
              options: [
                { id: 'not_started', label: 'Not started', color: '#A3A79C' },
                { id: 'in_progress', label: 'In progress', color: '#559AD4' },
                { id: 'done', label: 'Done', color: '#4EAA79' },
              ],
            },
          ],
          rows: [
            {
              id: 't1',
              cells: {
                col_task: 'Define spacing and radius scale',
                col_area: 'Design',
                col_details: 'Consistent scale applied to shared components and layouts.',
                col_phase: 'p05',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't2',
              cells: {
                col_task: 'Define color palette',
                col_area: 'Design',
                col_details: 'Dark base, blue and red team-side accents, neutral scale.',
                col_phase: 'p05',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't3',
              cells: {
                col_task: 'Define typography scale',
                col_area: 'Design',
                col_details: 'Heading and body fonts, weights, tabular numerals for stats.',
                col_phase: 'p05',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't4',
              cells: {
                col_task: 'Build core component variants on tokens',
                col_area: 'Frontend',
                col_details: 'Buttons, cards, badges, inputs, tabs with dark mode fidelity.',
                col_phase: 'p05',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't5',
              cells: {
                col_task: 'Build penalty and disqualification controls',
                col_area: 'Backend',
                col_details: 'Admin records a penalty against team or player with audit trail.',
                col_phase: 'p9',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't6',
              cells: {
                col_task: 'Implement single and double elimination brackets',
                col_area: 'Backend',
                col_details: 'Power-of-two math, byes to top seeds, winners/losers bracket trees.',
                col_phase: 'p3',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't7',
              cells: {
                col_task: 'Build server-authoritative draft state engine',
                col_area: 'Backend',
                col_details: 'Clients send intent only. Server validates timer and turn locks.',
                col_phase: 'p4',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't8',
              cells: {
                col_task: 'Build spectator and broadcast view',
                col_area: 'Frontend',
                col_details: 'Read-only, configurable delay for tournament streams.',
                col_phase: 'p4',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't9',
              cells: {
                col_task: 'Build side (blue/red) assignment logic',
                col_area: 'Backend',
                col_details: 'Coin flip or seed-based rule, coin flip winner picks side.',
                col_phase: 'p5',
                col_priority: 'Low',
                col_status: 'not_started',
              },
            },
            {
              id: 't10',
              cells: {
                col_task: 'Apply for Riot developer key',
                col_area: 'Riot API',
                col_details: 'Start on a development key, apply for production key early.',
                col_phase: 'p2',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't11',
              cells: {
                col_task: 'Build team and player public stat pages',
                col_area: 'Frontend',
                col_details: 'Public-facing version of profile and team roster stats.',
                col_phase: 'p8',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't12',
              cells: {
                col_task: 'Build core schema: users, teams, tournaments',
                col_area: 'Database',
                col_details: 'Foundation tables every other phase builds on with RLS.',
                col_phase: 'p1',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't13',
              cells: {
                col_task: 'Build LoL-appropriate design system theme',
                col_area: 'Design',
                col_details: 'Dark, high-contrast base, accent gold and hextech blues.',
                col_phase: 'p05',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't14',
              cells: {
                col_task: 'Build live bracket and live draft views',
                col_area: 'Frontend',
                col_details: 'Same data as authenticated view, no action controls.',
                col_phase: 'p8',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't15',
              cells: {
                col_task: 'Build player profile pages with Riot stats',
                col_area: 'Frontend',
                col_details: 'Match history and tournament stats from Supabase + Riot API.',
                col_phase: 'p6',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't16',
              cells: {
                col_task: 'Build dual-captain score confirmation flow',
                col_area: 'Backend',
                col_details: 'Both captains confirm before a match result is finalized.',
                col_phase: 'p7',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't17',
              cells: {
                col_task: 'Build interactive bracket visualization',
                col_area: 'Frontend',
                col_details: 'Zoomable, pannable, works on desktop and mobile.',
                col_phase: 'p3',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't18',
              cells: {
                col_task: 'Build tournament creation form with validation',
                col_area: 'Frontend',
                col_details: 'Single elim, double elim, round robin, format rules with Zod.',
                col_phase: 'p3',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't19',
              cells: {
                col_task: 'Add loading skeletons on every route',
                col_area: 'Design',
                col_details: 'One consistent skeleton pattern per screen type.',
                col_phase: 'p10',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't20',
              cells: {
                col_task: 'Build Bo1/Bo3/Bo5 series tracking',
                col_area: 'Backend',
                col_details: 'Game-by-game record within a match until series winner is decided.',
                col_phase: 'p5',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't21',
              cells: {
                col_task: 'Build captain view: champion grid, bans & picks',
                col_area: 'Frontend',
                col_details: 'Search and role filter on champion grid, live turn indicator.',
                col_phase: 'p4',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't22',
              cells: {
                col_task: 'Create Supabase project, connect envs',
                col_area: 'Infra',
                col_details: 'Separate dev and prod Supabase projects with migrations.',
                col_phase: 'p0',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't23',
              cells: {
                col_task: 'Implement round robin and Swiss pairings',
                col_area: 'Backend',
                col_details: 'Round robin generates every pairing, Swiss pairs equal records.',
                col_phase: 'p3',
                col_priority: 'Medium',
                col_status: 'not_started',
              },
            },
            {
              id: 't24',
              cells: {
                col_task: 'Build tournament control panel: stage, pause',
                col_area: 'Frontend',
                col_details: 'Core admin surface for running a live tournament.',
                col_phase: 'p9',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't25',
              cells: {
                col_task: 'Install and theme Tailwind CSS and shadcn/ui',
                col_area: 'Frontend',
                col_details: 'Base theme tokens set now so everything builds on tokens.',
                col_phase: 'p0',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
            {
              id: 't26',
              cells: {
                col_task: 'Full responsive pass, mobile through desktop',
                col_area: 'Design',
                col_details: 'Every surface built in Phases 0 through 9 audited on mobile.',
                col_phase: 'p10',
                col_priority: 'High',
                col_status: 'not_started',
              },
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // SUBPAGE 1: Plan: Riot Games API Integration Layer
  // =========================================================================
  {
    id: 'page_plan_riot_api',
    parentId: 'page_sidequeue_hub',
    title: 'Plan: Riot Games API Integration Layer',
    icon: '🔌',
    status: 'in_review',
    createdAt: '2026-08-26T12:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'sidequeue-riot-api',
      collaborators: [{ email: 'founder@sidequeue.gg', name: 'Abdoo', role: 'owner' }],
    },
    blocks: [
      {
        id: 'p_riot_h1',
        type: 'heading_1',
        content: 'Riot Games API Architecture & Rate Limits',
      },
      {
        id: 'p_riot_callout',
        type: 'callout',
        calloutType: 'warning',
        content: 'Development keys cap at 20 req/s and 100 req/2min and expire every 24 hours. Production keys require an application with a functioning prototype.',
      },
      {
        id: 'p_riot_text',
        type: 'text',
        content: 'All requests route through a token-bucket throttled service layer with Redis caching. Client endpoints never receive or invoke Riot tokens directly.',
      },
      {
        id: 'p_riot_adr',
        type: 'adr',
        adrData: {
          title: 'ADR: Throttled Server-Side Gateway for Riot API',
          status: 'accepted',
          context: 'Riot API keys must never leak to the client and require strict regional rate limiting.',
          decision: 'Implement an internal proxy service using Node.js with in-memory token bucket and Redis cache.',
          consequences: 'Guarantees compliance with Riot terms of service with zero risk of client key exposure.',
        },
      },
    ],
  },

  // =========================================================================
  // SUBPAGE 2: Plan: Draft & Pick-Ban Tool
  // =========================================================================
  {
    id: 'page_plan_draft_tool',
    parentId: 'page_sidequeue_hub',
    title: 'Plan: Draft & Pick-Ban Tool',
    icon: '🎯',
    status: 'in_review',
    createdAt: '2026-08-26T12:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'sidequeue-draft-tool',
      collaborators: [{ email: 'founder@sidequeue.gg', name: 'Abdoo', role: 'owner' }],
    },
    blocks: [
      {
        id: 'p_draft_h1',
        type: 'heading_1',
        content: 'Server-Authoritative Pick & Ban System',
      },
      {
        id: 'p_draft_text',
        type: 'text',
        content: 'The draft tool mirrors official competitive LoL tournament drafts (Fearless draft options, 5 bans per team, pick rotations). Clients send selection intent; timers and locks are strictly enforced server-side.',
      },
      {
        id: 'p_draft_checklist',
        type: 'checklist',
        checklistItems: [
          { id: 'dc1', text: 'WebSocket sync via Supabase Realtime broadcast channels', completed: true },
          { id: 'dc2', text: 'Server authoritative 30-second turn countdown clock', completed: true },
          { id: 'dc3', text: 'Spectator view with configurable stream delay', completed: false },
        ],
      },
    ],
  },

  // =========================================================================
  // SUBPAGE 3: Plan: Tournament Bracket Engine
  // =========================================================================
  {
    id: 'page_plan_bracket_engine',
    parentId: 'page_sidequeue_hub',
    title: 'Plan: Tournament Bracket Engine',
    icon: '🏆',
    status: 'in_review',
    createdAt: '2026-08-26T12:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'sidequeue-bracket-engine',
      collaborators: [{ email: 'founder@sidequeue.gg', name: 'Abdoo', role: 'owner' }],
    },
    blocks: [
      {
        id: 'p_bracket_h1',
        type: 'heading_1',
        content: 'Bracket Mechanics & Mathematical Seeding',
      },
      {
        id: 'p_bracket_text',
        type: 'text',
        content: 'Supports Single Elimination, Double Elimination, Round Robin, and Swiss Tournament pairings with automatic bye assignment based on seeding powers-of-two.',
      },
      {
        id: 'p_bracket_canvas',
        type: 'architecture_canvas',
        architectureNodes: [
          { id: 'bn1', name: 'Seeding Processor', role: 'Initial Seed Distribution', technology: 'TypeScript Core', status: 'healthy' },
          { id: 'bn2', name: 'Bracket Tree Generator', role: 'Winner / Loser Round Trees', technology: 'DAG Algorithm', status: 'healthy' },
          { id: 'bn3', name: 'Match State Engine', role: 'Series Score & Advancement', technology: 'Postgres Triggers', status: 'healthy' },
        ],
      },
    ],
  },

  // =========================================================================
  // SUBPAGE 4: Plan: Custom Game Lobby & Match Reporting
  // =========================================================================
  {
    id: 'page_plan_lobby_reporting',
    parentId: 'page_sidequeue_hub',
    title: 'Plan: Custom Game Lobby & Match Reporting',
    icon: '🎮',
    status: 'in_review',
    createdAt: '2026-08-26T12:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'sidequeue-lobby-reporting',
      collaborators: [{ email: 'founder@sidequeue.gg', name: 'Abdoo', role: 'owner' }],
    },
    blocks: [
      {
        id: 'p_lobby_h1',
        type: 'heading_1',
        content: 'Automated Match Validation & Score Reporting',
      },
      {
        id: 'p_lobby_text',
        type: 'text',
        content: 'Provides tournament codes for automated in-game client lobbies, and ingests post-game stats from Match-V5 with dual-captain cryptographic signatures.',
      },
    ],
  },

  // =========================================================================
  // EXISTING CORE ARCHITECTURE BLUEPRINT (PRESERVED)
  // =========================================================================
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
    ],
  },
  {
    id: 'page_db_subpage',
    parentId: 'page_arch_core',
    title: 'نظام إدارة قواعد البيانات والتخزين الموزع',
    icon: '🗄️',
    status: 'active',
    createdAt: '2026-10-12T09:00:00Z',
    updatedAt: '2026-10-13T09:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'axiom-pub-db981',
      collaborators: [{ email: 'founder@axiom.dev', name: 'Abdoo', role: 'owner' }],
    },
    blocks: [
      {
        id: 'db_b1',
        type: 'heading_1',
        content: 'مخطط البيانات المعماري',
      },
      {
        id: 'db_b2',
        type: 'database_schema',
        dbData: {
          tableName: 'core_ledgers',
          description: 'جدول تخزين سجل التغييرات والمعاملات المعمارية.',
          columns: [
            { id: 'c1', name: 'id', type: 'UUID', isPrimary: true },
            { id: 'c2', name: 'page_id', type: 'VARCHAR(64)', isNullable: false },
            { id: 'c3', name: 'block_hash', type: 'VARCHAR(128)', isNullable: false },
            { id: 'c4', name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false },
          ],
        },
      },
    ],
  },
  {
    id: 'page_api_subpage',
    parentId: 'page_arch_core',
    title: 'بوابة الخدمات وواجهات الربط البرمجي API Gateway',
    icon: '🔌',
    status: 'in_review',
    createdAt: '2026-10-12T10:00:00Z',
    updatedAt: '2026-10-13T09:00:00Z',
    shareSettings: {
      generalAccess: 'anyone_with_link',
      linkRole: 'viewer',
      isPublicLinkActive: true,
      shareId: 'axiom-pub-api12',
      collaborators: [{ email: 'founder@axiom.dev', name: 'Abdoo', role: 'owner' }],
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
