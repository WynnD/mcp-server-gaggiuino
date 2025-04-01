#!/bin/bash

# Setup script for Gaggiuino MCP Server

set -e

# Print colored messages
function echo_green {
  echo -e "\033[0;32m$1\033[0m"
}

function echo_blue {
  echo -e "\033[0;34m$1\033[0m"
}

function echo_red {
  echo -e "\033[0;31m$1\033[0m"
}

echo_blue "=== Gaggiuino MCP Server Setup ==="
echo_blue "This script will install dependencies and prepare the server for use."
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
  echo_red "Node.js is not installed!"
  echo "Please install Node.js 18 or higher and try again."
  echo "Visit https://nodejs.org/ for installation instructions."
  exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR_VERSION -lt 18 ]; then
  echo_red "Node.js version 18 or higher is required!"
  echo "Current version: $NODE_VERSION"
  echo "Please upgrade Node.js and try again."
  exit 1
fi

echo_green "✓ Node.js version $NODE_VERSION detected"

# Install dependencies
echo_blue "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo_blue "Creating .env file..."
  cp .env.example .env
  echo_green "✓ Created .env file from example"
  echo "Please edit .env to configure your server settings."
fi

# Build the project
echo_blue "Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo_red "Build failed! Please check the errors above."
  exit 1
fi

echo_green "✓ Build successful!"

# Make the script executable
chmod +x dist/index.js

echo ""
echo_green "=== Setup complete! ==="
echo ""
echo "To start the server, run:"
echo "  npm start"
echo ""
echo "To run in development mode with hot reloading:"
echo "  npm run dev"
echo ""
echo "To test with the MCP inspector:"
echo "  npm run inspect"
echo ""
echo "For more information, see the README.md and docs/ directory."
