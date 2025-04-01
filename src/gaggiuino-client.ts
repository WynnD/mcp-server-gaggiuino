import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from './config.js';
import { GaggiuinoConnectionError, GaggiuinoApiError } from './utils/error.js';

/**
 * Types for Gaggiuino API responses
 */
export interface Shot {
  id: string;
  timestamp: string;
  duration: number;
  data: ShotData;
}

export interface ShotData {
  temperature: number[];
  pressure: number[];
  flow: number[];
  weight?: number[];
  timePoints: number[];
}

export interface Profile {
  id: string;
  name: string;
  description?: string;
  parameters: Record<string, any>;
}

export interface SystemStatus {
  temperature: number;
  pressure: number;
  state: string;
  heaterPower: number;
  steamMode: boolean;
}

/**
 * Response format for latest shot ID
 */
export interface LatestShotResponse {
  lastShotId: string;
}

/**
 * Client for interacting with the Gaggiuino API
 */
export class GaggiuinoClient {
  private client: AxiosInstance;

  constructor(baseUrl: string = config.baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: config.timeout,
    });
  }

  /**
   * Get the latest shot data
   */
  async getLatestShot(): Promise<string> {
    try {
      const response = await this.client.get('/api/shots/latest');
      // Handle the response format: [{lastShotId: "4294967295"}]
      if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].lastShotId) {
        return response.data[0].lastShotId;
      } else if (typeof response.data === 'string') {
        // Handle the case where the response is just a string ID
        return response.data;
      } else {
        // Try to extract the ID if it's in a different format
        const data = response.data;
        if (data && typeof data === 'object') {
          if (data.lastShotId) {
            return data.lastShotId;
          } else if (data.id) {
            return data.id;
          }
        }
        
        throw new Error('Unexpected response format for latest shot');
      }
    } catch (error) {
      this.handleRequestError(error, 'fetching latest shot');
    }
  }
  
  /**
   * Handle axios errors in a consistent way
   */
  private handleRequestError(error: unknown, operation: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (!axiosError.response) {
        throw new GaggiuinoConnectionError(
          `Connection error while ${operation}: ${axiosError.message}`
        );
      }
      
      const statusCode = axiosError.response.status;
      const data = axiosError.response.data as any;
      const message = data?.message || axiosError.message;
      
      throw new GaggiuinoApiError(
        `API error while ${operation}: ${message}`,
        statusCode
      );
    }
    
    // For non-axios errors
    if (error instanceof Error) {
      throw new Error(`Error while ${operation}: ${error.message}`);
    }
    
    throw new Error(`Unknown error while ${operation}`);
  }

  /**
   * Get data for a specific shot
   */
  async getShot(id: string): Promise<Shot> {
    try {
      const response = await this.client.get(`/api/shots/${id}`);
      return response.data;
    } catch (error) {
      this.handleRequestError(error, `fetching shot ${id}`);
    }
  }

  /**
   * Upload a new shot (streaming)
   */
  async uploadShot(data: any): Promise<string> {
    try {
      const response = await this.client.post('/api/shots', data);
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'uploading shot data');
    }
  }

  /**
   * Get all available profiles
   */
  async getAllProfiles(): Promise<Profile[]> {
    try {
      const response = await this.client.get('/api/profiles/all');
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'fetching profiles');
    }
  }

  /**
   * Select a specific profile
   */
  async selectProfile(id: string): Promise<void> {
    try {
      await this.client.post(`/api/profile-select/${id}`);
    } catch (error) {
      this.handleRequestError(error, `selecting profile ${id}`);
    }
  }

  /**
   * Delete a specific profile
   */
  async deleteProfile(id: string): Promise<void> {
    try {
      await this.client.delete(`/api/profile-select/${id}`);
    } catch (error) {
      this.handleRequestError(error, `deleting profile ${id}`);
    }
  }

  /**
   * Get the current system status
   */
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const response = await this.client.get('/api/system/status');
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'fetching system status');
    }
  }
}

// Export a singleton instance
export const gaggiuinoClient = new GaggiuinoClient();