import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { calculateSchema, calculateHandler } from "../tools/calculate.js";

const server = new McpServer({
  name: "my-local-server",
  version: "1.0.0",
});

// Register the calculate tool
server.tool(
  "calculate",
  "Performs basic math operations",
  calculateSchema,
  calculateHandler
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
