# Gaggiuino MCP Server Usage Guide

This document explains how to use the Gaggiuino MCP Server with Claude Desktop and other MCP-compatible clients.

## Connecting to Claude Desktop

1. Install Claude Desktop from the [Anthropic website](https://www.anthropic.com/claude)
2. Open Claude Desktop and go to Settings > MCP Servers
3. Click "Add Server"
4. Configure the server:
   - Name: Gaggiuino
   - Command: `node /path/to/mcp-server-gaggiuino/dist/index.js`
5. Click "Save"
6. You can now talk to Claude about your espresso machine

## Example Queries for Claude

Once connected, you can ask Claude to interact with your Gaggiuino machine in natural language. Here are some examples:

- "What's the current status of my espresso machine?"
- "Show me my latest espresso shot data"
- "What profiles do I have available?"
- "Switch to the 'Ristretto' profile"
- "Delete the 'Test' profile"
- "Upload my shot data with these parameters..."

## Available Tools

The Gaggiuino MCP Server exposes the following tools to Claude and other MCP clients:

### `getSystemStatus`

Get the current status of the espresso machine including temperature, pressure, and machine state.

```javascript
// Example response
{
  "temperature": 93.5,
  "pressure": 0,
  "state": "idle",
  "heaterPower": 0,
  "steamMode": false
}
```

### `getLatestShot`

Get the ID of the most recent espresso shot.

```javascript
// Example response
"shot_20250325_123045"
```

### `getShotData`

Get detailed data for a specific shot by ID.

Parameters:
- `id`: The ID of the shot to retrieve

```javascript
// Example response
{
  "id": "shot_20250325_123045",
  "timestamp": "2025-03-25T12:30:45Z",
  "duration": 28.5,
  "data": {
    "temperature": [93.2, 93.3, 93.4, ...],
    "pressure": [0, 2.1, 8.9, 9.0, ...],
    "flow": [0, 0.5, 1.8, 2.0, ...],
    "weight": [0, 5.2, 12.8, 18.7, ...],
    "timePoints": [0, 1000, 2000, 3000, ...]
  }
}
```

### `getAllProfiles`

Get a list of all available espresso profiles.

```javascript
// Example response
[
  {
    "id": "classic",
    "name": "Classic",
    "description": "Traditional 9-bar extraction",
    "parameters": { ... }
  },
  {
    "id": "ristretto",
    "name": "Ristretto",
    "description": "Short, intense extraction",
    "parameters": { ... }
  }
]
```

### `selectProfile`

Select a specific profile by ID.

Parameters:
- `id`: The ID of the profile to select

### `deleteProfile`

Delete a specific profile by ID.

Parameters:
- `id`: The ID of the profile to delete

### `uploadShot`

Upload data for a new espresso shot.

Parameters:
- `metadata`: Information about the shot
  - `profile`: The profile used for the shot
  - `beanName` (optional): Name of the coffee beans used
  - `grindSetting` (optional): Grinder setting used
  - `doseWeight` (optional): Weight of ground coffee in grams
  - `brewRatio` (optional): Desired brew ratio (e.g., 1:2)
  - `notes` (optional): Additional notes about the shot
- `dataPoints`: Array of data points for the shot
  - `timestamp`: Milliseconds since start of shot
  - `temperature`: Temperature in Celsius
  - `pressure`: Pressure in bars
  - `flow`: Flow rate in ml/s
  - `weight` (optional): Current weight in grams

## Troubleshooting

If you encounter issues connecting to your Gaggiuino machine:

1. Ensure your machine is powered on and accessible on the network
2. Check that the GAGGIUINO_BASE_URL environment variable is set correctly
3. Verify that the Gaggiuino API is functioning by accessing it directly
4. Check the server logs for error messages
5. Make sure you've built the project using `npm run build` before running

For more help, visit the [Gaggiuino community forums](https://gaggiuino.github.io/).