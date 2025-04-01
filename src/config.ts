/**
 * Configuration for the Gaggiuino MCP server
 */
export const config = {
  // The base URL for the Gaggiuino API
  baseUrl: process.env.GAGGIUINO_BASE_URL || 'http://gaggiuino.local',
  
  // Server configuration
  server: {
    name: 'Gaggiuino MCP Server',
    version: '1.0.0',
    port: parseInt(process.env.SERVER_PORT || '8080', 10),
  },
  
  // Timeout in milliseconds for API requests
  timeout: parseInt(process.env.REQUEST_TIMEOUT || '5000', 10),
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  }
};