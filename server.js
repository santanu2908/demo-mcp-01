import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-local-server",
  version: "1.0.0",
});

// Example tool: a simple calculator
server.tool(
  "calculate",
  "Performs basic math operations",
  {
    operation: z.enum(["add", "subtract", "multiply", "divide"]),
    a: z.number(),
    b: z.number(),
  },
  async ({ operation, a, b }) => {
    const results = {
      add: a + b,
      subtract: a - b,
      multiply: a * b,
      divide: a / b,
    };
    return {
      content: [{ type: "text", text: `Result: ${results[operation]}` }],
    };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
