#!/usr/bin/env node

/**
 * Axiom MCP Server (Model Context Protocol)
 * Enables AI coding agents (Claude, Cursor, Antigravity) to read, search,
 * create, and update architectural pages and blocks in Axiom.
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const WORKSPACE_FILE = process.env.AXIOM_DATA_FILE || path.join(process.cwd(), 'data', 'workspace.json');

function loadWorkspace() {
  if (fs.existsSync(WORKSPACE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(WORKSPACE_FILE, 'utf-8'));
    } catch (e) {
      // fallback
    }
  }
  return {
    pages: [
      {
        id: "page_arch_core",
        title: "Core Platform Architecture",
        status: "approved",
        blocks: [
          { type: "heading_1", content: "System Vision" },
          { type: "text", content: "Axiom foundational workspace with MCP integration." }
        ]
      }
    ]
  };
}

function saveWorkspace(data) {
  const dir = path.dirname(WORKSPACE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(WORKSPACE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

const TOOLS = [
  {
    name: "axiom_list_pages",
    description: "List all architectural blueprint pages and status in the Axiom workspace",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "axiom_read_page",
    description: "Read all blocks, ADRs, and tech stack items of a specific Axiom page",
    inputSchema: {
      type: "object",
      properties: {
        page_id: { type: "string", description: "ID of the page to read" }
      },
      required: ["page_id"]
    }
  },
  {
    name: "axiom_create_page",
    description: "Create a new architectural blueprint page in Axiom with structured blocks",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Title of the architecture blueprint" },
        status: { type: "string", enum: ["draft", "in_review", "approved", "active"] },
        initial_summary: { type: "string", description: "Initial summary paragraph" }
      },
      required: ["title"]
    }
  },
  {
    name: "axiom_append_block",
    description: "Append a new block (heading, adr, tech_stack, or api_spec) to an existing page",
    inputSchema: {
      type: "object",
      properties: {
        page_id: { type: "string" },
        block_type: { type: "string", enum: ["text", "heading_1", "heading_2", "adr", "callout", "code"] },
        content: { type: "string" }
      },
      required: ["page_id", "block_type", "content"]
    }
  }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line);
    const id = request.id;

    if (request.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'axiom-mcp-server', version: '1.0.0' }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    if (request.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    if (request.method === 'tools/call') {
      const { name, arguments: args } = request.params;
      const workspace = loadWorkspace();

      let resultText = '';

      if (name === 'axiom_list_pages') {
        const pagesList = workspace.pages.map(p => ({
          id: p.id,
          title: p.title,
          status: p.status,
          blocks_count: p.blocks?.length || 0
        }));
        resultText = JSON.stringify(pagesList, null, 2);
      } else if (name === 'axiom_read_page') {
        const found = workspace.pages.find(p => p.id === args.page_id);
        resultText = found ? JSON.stringify(found, null, 2) : `Page with ID ${args.page_id} not found.`;
      } else if (name === 'axiom_create_page') {
        const newPage = {
          id: `page_${Date.now()}`,
          title: args.title,
          status: args.status || 'draft',
          icon: '📐',
          blocks: [
            { id: `b_${Date.now()}`, type: 'text', content: args.initial_summary || 'Generated via MCP' }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        workspace.pages.push(newPage);
        saveWorkspace(workspace);
        resultText = `Successfully created page '${newPage.title}' with ID ${newPage.id}`;
      } else if (name === 'axiom_append_block') {
        const page = workspace.pages.find(p => p.id === args.page_id);
        if (page) {
          page.blocks.push({
            id: `b_${Date.now()}`,
            type: args.block_type,
            content: args.content
          });
          page.updatedAt = new Date().toISOString();
          saveWorkspace(workspace);
          resultText = `Appended ${args.block_type} block to page '${page.title}'`;
        } else {
          resultText = `Page not found: ${args.page_id}`;
        }
      }

      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            { type: 'text', text: resultText }
          ]
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    // Default response for other messages
    process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result: {} }) + '\n');
  } catch (err) {
    // ignore malformed lines
  }
});
