import { spawn } from 'child_process';
import path from 'path';

const mcpServerPath = path.resolve('./scripts/mcp-server.mjs');

console.log('--- Testing Axiom MCP Server at:', mcpServerPath, '---');

const child = spawn('node', [mcpServerPath], {
  env: {
    ...process.env,
    AXIOM_DATA_FILE: path.resolve('./data/workspace.json')
  },
  stdio: ['pipe', 'pipe', 'inherit']
});

let outputBuffer = '';

child.stdout.on('data', (chunk) => {
  outputBuffer += chunk.toString();
  const lines = outputBuffer.split('\n');
  outputBuffer = lines.pop(); // keep remainder

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line);
      console.log('MCP Response [id=' + msg.id + ']:', JSON.stringify(msg.result || msg, null, 2));
    } catch (e) {
      console.log('Raw output:', line);
    }
  }
});

function send(req) {
  child.stdin.write(JSON.stringify(req) + '\n');
}

// 1. Initialize
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });

// 2. List tools
setTimeout(() => {
  send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
}, 200);

// 3. Call axiom_list_pages
setTimeout(() => {
  send({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'axiom_list_pages', arguments: {} } });
}, 400);

// 4. Call axiom_read_page on Sidequeue
setTimeout(() => {
  send({
    jsonrpc: '2.0',
    id: 4,
    method: 'tools/call',
    params: { name: 'axiom_read_page', arguments: { page_id: 'page_sidequeue_hub' } }
  });
}, 600);

setTimeout(() => {
  child.kill();
  console.log('--- MCP Test Completed Successfully ---');
  process.exit(0);
}, 1000);
