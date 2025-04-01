#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { config } from './config.js';
import { logger } from './utils/logger.js';
import { registerTools } from './tools/index.js';

/**
 * Create the FastMCP server
 */
const server = new FastMCP({
  name: config.server.name,
  version: config.server.version as `${number}.${number}.${number}`,
});

// Register all tools with the server
registerTools(server);

/**
 * Start the MCP server
 */
server.start({
  transportType: 'stdio'
});

logger.info(`${config.server.name} v${config.server.version} started`, {
  port: config.server.port,
  transportType: process.env.MCP_TRANSPORT_TYPE || 'stdio'
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled promise rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined
  });
});