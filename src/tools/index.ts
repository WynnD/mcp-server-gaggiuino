import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import { gaggiuinoClient } from '../gaggiuino-client.js';
import { ShotUpload } from '../types/shot.js';
import { handleError } from '../utils/error.js';

/**
 * Register all Gaggiuino tools with the MCP server
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP): void {
  // System status tool
  server.addTool({
    name: 'getSystemStatus',
    description: 'Get the current system status of the espresso machine',
    parameters: z.object({}),
    execute: async () => {
      try {
        const status = await gaggiuinoClient.getSystemStatus();
        return JSON.stringify(status, null, 2);
      } catch (error) {
        return handleError(error, 'fetching system status');
      }
    },
  });

  // Get latest shot tool
  server.addTool({
    name: 'getLatestShot',
    description: 'Get the ID of the latest espresso shot',
    parameters: z.object({}),
    execute: async () => {
      try {
        const shotId = await gaggiuinoClient.getLatestShot();
        return shotId;
      } catch (error) {
        return handleError(error, 'fetching latest shot');
      }
    },
  });

  // Get shot data tool
  server.addTool({
    name: 'getShotData',
    description: 'Get detailed data for a specific espresso shot',
    parameters: z.object({
      id: z.string().describe('The ID of the shot to fetch'),
    }),
    execute: async (args) => {
      try {
        const shot = await gaggiuinoClient.getShot(args.id);
        return JSON.stringify(shot, null, 2);
      } catch (error) {
        return handleError(error, `fetching shot ${args.id}`);
      }
    },
  });

  // Get all profiles tool
  server.addTool({
    name: 'getAllProfiles',
    description: 'Get all available espresso profiles',
    parameters: z.object({}),
    execute: async () => {
      try {
        const profiles = await gaggiuinoClient.getAllProfiles();
        return JSON.stringify(profiles, null, 2);
      } catch (error) {
        return handleError(error, 'fetching profiles');
      }
    },
  });

  // Select profile tool
  server.addTool({
    name: 'selectProfile',
    description: 'Select a specific espresso profile',
    parameters: z.object({
      id: z.string().describe('The ID of the profile to select'),
    }),
    execute: async (args) => {
      try {
        await gaggiuinoClient.selectProfile(args.id);
        return `Profile ${args.id} selected successfully`;
      } catch (error) {
        return handleError(error, `selecting profile ${args.id}`);
      }
    },
  });

  // Delete profile tool
  server.addTool({
    name: 'deleteProfile',
    description: 'Delete a specific espresso profile',
    parameters: z.object({
      id: z.string().describe('The ID of the profile to delete'),
    }),
    execute: async (args) => {
      try {
        await gaggiuinoClient.deleteProfile(args.id);
        return `Profile ${args.id} deleted successfully`;
      } catch (error) {
        return handleError(error, `deleting profile ${args.id}`);
      }
    },
  });

  // Upload shot data tool
  server.addTool({
    name: 'uploadShot',
    description: 'Upload data for a new espresso shot',
    parameters: z.object({
      metadata: z.object({
        profile: z.string().describe('The profile used for the shot'),
        beanName: z.string().optional().describe('Name of the coffee beans used'),
        grindSetting: z.number().optional().describe('Grinder setting used'),
        doseWeight: z.number().optional().describe('Weight of ground coffee in grams'),
        brewRatio: z.number().optional().describe('Desired brew ratio (e.g., 1:2)'),
        notes: z.string().optional().describe('Additional notes about the shot'),
      }),
      dataPoints: z.array(z.object({
        timestamp: z.number().describe('Milliseconds since start of shot'),
        temperature: z.number().describe('Temperature in Celsius'),
        pressure: z.number().describe('Pressure in bars'),
        flow: z.number().describe('Flow rate in ml/s'),
        weight: z.number().optional().describe('Current weight in grams'),
      })),
    }),
    execute: async (args) => {
      try {
        const shotData: ShotUpload = {
          metadata: args.metadata,
          dataPoints: args.dataPoints,
        };

        const shotId = await gaggiuinoClient.uploadShot(shotData);
        return `Shot uploaded successfully with ID: ${shotId}`;
      } catch (error) {
        return handleError(error, 'uploading shot data');
      }
    },
  });
}
