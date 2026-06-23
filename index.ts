#!/usr/bin/env node
// stdio entry — local install (npx mcp-pulsenetwork). Key from AGENT_PRIVATE_KEY env.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools, buildPaymentFetch } from './lib/register-tools.js';

const server = new McpServer({
  name: 'PulseNetwork',
  version: '1.1.0',
  description:
    'PulseNetwork — 67 AI-powered intelligence verticals (660+ endpoints), all x402-native. ' +
    'Covers finance, health, law, travel, real estate, immigration, crypto, careers, ' +
    'sustainability, and more. Global coverage. Pay-per-query via USDC on Base + Solana.',
});

let fetch402: ReturnType<typeof buildPaymentFetch> | undefined;
registerTools(server, () => {
  if (!fetch402) {
    const key = process.env.AGENT_PRIVATE_KEY;
    if (!key) throw new Error('AGENT_PRIVATE_KEY environment variable is required');
    fetch402 = buildPaymentFetch(key);
  }
  return fetch402;
});

const transport = new StdioServerTransport();
await server.connect(transport);
