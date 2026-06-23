# Dockerfile for Glama (and any container host) — builds the PulseNetwork MCP
# server and runs it over stdio. The server lists all tools via MCP introspection
# (tools/list) without requiring a wallet key, so Glama's start + introspection
# checks pass with no secrets. A wallet key (AGENT_PRIVATE_KEY) is only needed at
# call time to actually pay for a query.
FROM node:24-slim

WORKDIR /app

# Install deps without running the `prepare` build (source isn't copied yet).
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy source and build (tsc -> dist/index.js).
COPY . .
RUN npm run build

# stdio MCP server.
CMD ["node", "dist/index.js"]
