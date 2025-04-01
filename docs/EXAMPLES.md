# Gaggiuino MCP Server Examples

This document provides examples of how to interact with the Gaggiuino MCP server from different client applications.

## Claude Desktop Examples

When using Claude Desktop with the Gaggiuino MCP server, you can interact with your espresso machine using natural language. Here are some examples:

### Checking Machine Status

```
User: What's the current status of my espresso machine?

Claude: Let me check the status of your espresso machine.
[Uses getSystemStatus tool]

Your espresso machine is currently:
- Temperature: 93.5°C
- Pressure: 0 bar
- State: idle
- Heater power: 0%
- Steam mode: off

Your machine is ready to brew at the ideal temperature.
```

### Viewing Latest Shot

```
User: Show me data from my latest espresso shot

Claude: Let me retrieve information about your latest espresso shot.
[Uses getLatestShot tool to get ID]
[Uses getShotData tool to get details]

Your latest shot (from March 25, 2025 at 12:30 PM):
- Duration: 28.5 seconds
- Profile: Classic
- Brew temperature: 93.2°C to 93.4°C
- Final yield: 36g (from 18g dose)
- Peak pressure: 9.0 bar

The shot had good pressure stability and temperature consistency. Would you like me to analyze the extraction curve in more detail?
```

### Selecting a Profile

```
User: Can you switch my machine to the Ristretto profile?

Claude: I'll select the Ristretto profile for your espresso machine.
[Uses selectProfile tool]

The Ristretto profile has been successfully selected. This profile is designed for a shorter, more concentrated shot with a slower pre-infusion phase and slightly higher brewing temperature.

Your machine is now ready to brew a Ristretto. Remember to adjust your grind size finer than usual for the best results with this profile.
```

## Node.js Client Example

Here's how to interact with the Gaggiuino MCP server using a Node.js client:

```javascript
import { Client } from '@modelcontextprotocol/sdk/client';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio';

// Connect to the MCP server
async function connectToGaggiuino() {
  // Create a transport to the server
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['/path/to/mcp-server-gaggiuino/dist/index.js'],
  });

  // Create the client
  const client = new Client(
    { name: 'GaggiuinoClient', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  // Connect to the server
  await client.connect(transport);
  
  return client;
}

// Example: Get system status
async function getSystemStatus(client) {
  const result = await client.callTool({
    name: 'getSystemStatus',
    arguments: {}
  });
  
  console.log('Machine Status:', JSON.parse(result));
}

// Example: Get the latest shot
async function getLatestShot(client) {
  // Get the latest shot ID
  const shotId = await client.callTool({
    name: 'getLatestShot',
    arguments: {}
  });
  
  // Get the shot data
  const shotData = await client.callTool({
    name: 'getShotData',
    arguments: { id: shotId }
  });
  
  console.log('Latest Shot:', JSON.parse(shotData));
}

// Run the examples
async function main() {
  const client = await connectToGaggiuino();
  
  await getSystemStatus(client);
  await getLatestShot(client);
  
  // Close the connection
  await client.disconnect();
}

main().catch(console.error);
```

## Python Client Example

Here's how to interact with the Gaggiuino MCP server using a Python client:

```python
import asyncio
import json
from mcp.client import Client
from mcp.client.stdio import StdioTransport

# Connect to the MCP server
async def connect_to_gaggiuino():
    # Create a transport to the server
    transport = StdioTransport(
        command="node",
        args=["/path/to/mcp-server-gaggiuino/dist/index.js"],
    )
    
    # Create the client
    client = Client(
        name="GaggiuinoClient",
        version="1.0.0",
        capabilities={"tools": {}},
    )
    
    # Connect to the server
    await client.connect(transport)
    
    return client

# Example: Get system status
async def get_system_status(client):
    result = await client.call_tool(
        name="getSystemStatus",
        arguments={},
    )
    
    print("Machine Status:", json.loads(result))

# Example: Get the latest shot
async def get_latest_shot(client):
    # Get the latest shot ID
    shot_id = await client.call_tool(
        name="getLatestShot",
        arguments={},
    )
    
    # Get the shot data
    shot_data = await client.call_tool(
        name="getShotData",
        arguments={"id": shot_id},
    )
    
    print("Latest Shot:", json.loads(shot_data))

# Run the examples
async def main():
    client = await connect_to_gaggiuino()
    
    await get_system_status(client)
    await get_latest_shot(client)
    
    # Close the connection
    await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
```

## Using HTTP Transport

If you're running the MCP server with HTTP transport enabled, you can also connect to it via HTTP:

```javascript
// Node.js example with HTTP transport
import { Client } from '@modelcontextprotocol/sdk/client';
import { HttpClientTransport } from '@modelcontextprotocol/sdk/client/http';

async function connectToGaggiuinoHttp() {
  // Create a transport to the server
  const transport = new HttpClientTransport({
    baseUrl: 'http://localhost:8080',
  });

  // Create the client
  const client = new Client(
    { name: 'GaggiuinoClient', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  // Connect to the server
  await client.connect(transport);
  
  return client;
}
```

```python
# Python example with HTTP transport
from mcp.client.http import HttpTransport

async def connect_to_gaggiuino_http():
    # Create a transport to the server
    transport = HttpTransport(base_url="http://localhost:8080")
    
    # Create the client
    client = Client(
        name="GaggiuinoClient",
        version="1.0.0",
        capabilities={"tools": {}},
    )
    
    # Connect to the server
    await client.connect(transport)
    
    return client
```
