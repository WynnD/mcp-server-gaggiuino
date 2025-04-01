import { UserError } from 'fastmcp';

/**
 * Custom error types for the Gaggiuino MCP server
 */
export class GaggiuinoConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GaggiuinoConnectionError';
  }
}

export class GaggiuinoApiError extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'GaggiuinoApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Handles errors in a consistent way for MCP tool execution
 * @param error The error that occurred
 * @param context Additional context about the error
 * @returns A user-friendly error message
 */
export function handleError(error: unknown, context: string): never {
  console.error(`Error in ${context}:`, error);
  
  // Handle connection errors
  if (error instanceof GaggiuinoConnectionError) {
    throw new UserError(`Could not connect to the espresso machine: ${error.message}`);
  }
  
  // Handle API errors
  if (error instanceof GaggiuinoApiError) {
    if (error.statusCode === 404) {
      throw new UserError(`Resource not found: ${error.message}`);
    }
    throw new UserError(`API error: ${error.message}`);
  }
  
  // Handle other errors
  if (error instanceof Error) {
    throw new UserError(`An error occurred: ${error.message}`);
  }
  
  // Handle unknown errors
  throw new UserError(`An unknown error occurred while ${context}`);
}