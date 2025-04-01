import { describe, it, expect, vi } from 'vitest';
import { handleError, GaggiuinoConnectionError, GaggiuinoApiError } from './error.js';
import { UserError } from 'fastmcp';

describe('Error utilities', () => {
  // Mock console.error to avoid polluting test output
  console.error = vi.fn();
  
  describe('handleError', () => {
    it('should handle GaggiuinoConnectionError', () => {
      const error = new GaggiuinoConnectionError('Failed to connect');
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(UserError);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(/Could not connect to the espresso machine/);
    });
    
    it('should handle GaggiuinoApiError with 404 status', () => {
      const error = new GaggiuinoApiError('Profile not found', 404);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(UserError);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(/Resource not found/);
    });
    
    it('should handle generic GaggiuinoApiError', () => {
      const error = new GaggiuinoApiError('Server error', 500);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(UserError);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(/API error/);
    });
    
    it('should handle generic Error', () => {
      const error = new Error('Generic error');
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(UserError);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(/An error occurred/);
    });
    
    it('should handle unknown error types', () => {
      const error = 'Not an error object';
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(UserError);
      
      expect(() => {
        handleError(error, 'test context');
      }).toThrow(/An unknown error occurred/);
    });
  });
});