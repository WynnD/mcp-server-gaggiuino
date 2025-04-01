# Gaggiuino MCP Server

A Model Context Protocol (MCP) server for Gaggiuino-modified espresso machines. This server provides a standardized interface to access and control your Gaggia espresso machine's API through the MCP protocol.

## Features

- Access shot data and history
- View and manage espresso profiles
- Monitor machine status in real-time
- Upload new shot data
- Compatible with AI assistants and other MCP clients

## Prerequisites

- Node.js 18 or later
- A Gaggiuino-modified espresso machine accessible via HTTP
- npm or yarn

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/mcp-server-gaggiuino.git
   cd mcp-server-gaggiuino
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

Configure the server using environment variables:

- `GAGGIUINO_BASE_URL`: URL of your Gaggiuino API (default: `http://localhost:3000`)
- `SERVER_PORT`: Port for HTTP transport (default: `8080`)
- `MCP_TRANSPORT_TYPE`: Transport type (`stdio` or `http`, default: `stdio`)
- `REQUEST_TIMEOUT`: API request timeout in ms (default: `5000`)
- `LOG_LEVEL`: Logging level (default: `info`)

## Usage

### Starting the Server

```bash
npm start
```

For development with hot reloading:

```bash
npm run dev
```

### Testing with MCP Inspector

```bash
npm run inspect
```

### Connecting to Claude Desktop

1. In Claude Desktop, go to Settings > MCP Servers
2. Add a new server with the command: `node /path/to/mcp-server-gaggiuino/dist/index.js`

## API Reference

### Tools

- `getSystemStatus`: Get the current status of the espresso machine
- `getLatestShot`: Get the ID of the most recent shot
- `getShotData`: Get detailed data for a specific shot by ID
- `getAllProfiles`: Get a list of all available profiles
- `selectProfile`: Select a profile by ID
- `deleteProfile`: Delete a profile by ID
- `uploadShot`: Upload data for a new shot

## License

MIT

## Acknowledgements

- [Gaggiuino Project](https://gaggiuino.github.io/)
- [FastMCP](https://github.com/punkpeye/fastmcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)