import { config } from '../config.js';

/**
 * Log levels
 */
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

/**
 * Map string log levels to enum values
 */
const LOG_LEVEL_MAP: Record<string, LogLevel> = {
  error: LogLevel.ERROR,
  warn: LogLevel.WARN,
  info: LogLevel.INFO,
  debug: LogLevel.DEBUG,
};

/**
 * Get current log level from config
 */
const getCurrentLogLevel = (): LogLevel => {
  const configLevel = config.logging.level.toLowerCase();
  return LOG_LEVEL_MAP[configLevel] ?? LogLevel.INFO;
};

/**
 * Format a log message
 */
const formatMessage = (level: string, message: string, meta?: any): string => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};

/**
 * Logger implementation
 */
export const logger = {
  error(message: string, meta?: any): void {
    if (getCurrentLogLevel() >= LogLevel.ERROR) {
      console.error(formatMessage('error', message, meta));
    }
  },

  warn(message: string, meta?: any): void {
    if (getCurrentLogLevel() >= LogLevel.WARN) {
      console.warn(formatMessage('warn', message, meta));
    }
  },

  info(message: string, meta?: any): void {
    if (getCurrentLogLevel() >= LogLevel.INFO) {
      console.info(formatMessage('info', message, meta));
    }
  },

  debug(message: string, meta?: any): void {
    if (getCurrentLogLevel() >= LogLevel.DEBUG) {
      console.debug(formatMessage('debug', message, meta));
    }
  },
};