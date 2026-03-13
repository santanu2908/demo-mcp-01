# demo-mcp-01

A local MCP (Model Context Protocol) server for Claude Desktop.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#-project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Claude Desktop](#3-configure-claude-desktop)
  - [4. Restart Claude Desktop](#4-restart-claude-desktop)
  - [5. Verify the Setup](#5-verify-the-setup)
- [How the Server Starts](#️-how-the-server-starts--no-npm-start-needed)
- [How It Works — End-to-End Flow](#-how-it-works--end-to-end-flow)
- [Tool Reference](#️-tool-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project is a local **MCP (Model Context Protocol) server** that extends Claude Desktop with custom tools. MCP is an open protocol that allows Claude to interact with local services, files, APIs, and more — turning Claude into a powerful assistant tailored to your specific workflow.

This server is built with the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) and runs locally on your machine via `stdio` transport. Once configured, Claude Desktop automatically starts the server and makes its tools available in every conversation.

### What's included

- **`calculate`** — Performs basic math operations: `add`, `subtract`, `multiply`, and `divide`

> This is a starter project — you can easily extend it by adding more tools in `src/index.js`.

---

## 📁 Project Structure

```
demo-mcp-01/
│
├── src/
│   └── index.js          # MCP server entry point
│
├── tools/
│   └── calculate.js      # Calculate tool logic
│
├── .gitignore            # Ignore node_modules, .env, etc.
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Claude Desktop](https://claude.ai/download)

---

### 1. Clone the Repository

```bash
git clone https://github.com/smohanta2908/demo-mcp-01.git
cd demo-mcp-01
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Claude Desktop

Create a file named `claude_desktop_config.json` in the Claude config folder.

**Config folder path (Windows):**

```
C:\Users\<YourUsername>\AppData\Roaming\Claude\
```

> 💡 To quickly open this folder, press **Win + R** and type:
> `%APPDATA%\Claude`
> If the `Claude` folder doesn't exist, create it manually.

**Paste the following into `claude_desktop_config.json`**, updating the path to match where you cloned the repo:

```json
{
  "mcpServers": {
    "my-local-server": {
      "command": "node",
      "args": [
        "C:\\Users\\<YourUsername>\\path\\to\\demo-mcp-01\\src\\index.js"
      ]
    }
  }
}
```

> ⚠️ On Windows, use **double backslashes** `\\` in the path.
> Example: `"C:\\Users\\John\\Documents\\demo-mcp-01\\src\\index.js"`

### 4. Restart Claude Desktop

Fully quit Claude Desktop (check the system tray → right-click → **Quit**) and reopen it.

### 5. Verify the Setup

Open Claude Desktop and go to **Settings → Developer**. You should see `my-local-server` listed with a **green status indicator** showing it is running. If it shows an error or is missing, revisit the config path and restart Claude Desktop.

---

## ⚙️ How the Server Starts — No `npm start` Needed

You never need to manually run `npm start` or keep a terminal open. **Claude Desktop launches the server for you automatically.**

When Claude Desktop reads your config:

```json
{
  "command": "node",
  "args": ["C:\\...\\src\\index.js"]
}
```

It runs `node src/index.js` as a **child process in the background** every time Claude Desktop opens. When you close Claude Desktop, it shuts the process down too.

This works because the server uses **`StdioServerTransport`** — it communicates via **stdin/stdout** rather than HTTP or a network port. Claude Desktop pipes messages directly to the process, so there is nothing to manually start or keep alive. Claude Desktop owns the entire process lifecycle.

|                          | Traditional Server | MCP stdio Server |
| ------------------------ | ------------------ | ---------------- |
| Who starts it?           | You (`npm start`)  | Claude Desktop   |
| How does it communicate? | HTTP / WebSocket   | stdin / stdout   |
| Who keeps it alive?      | You                | Claude Desktop   |
| Port needed?             | Yes                | No               |

---

## 🔄 How It Works — End-to-End Flow

Here's a walkthrough of a real tool call: _"Multiply 12 by 7"_

### Step 1 — User Prompt

The user sends a message to Claude Desktop:

```
Use the calculate tool to multiply 12 by 7
```

### Step 2 — Tool Discovery

- Claude used the internal `tool_search` mechanism to locate the `calculate` tool by querying `"math multiply"`.
- The tool schema was returned with the following parameters:
  - `a` → number (first operand)
  - `b` → number (second operand)
  - `operation` → one of `add | subtract | multiply | divide`

### Step 3 — Tool Invocation

- Claude called the `calculate` tool with:
  ```
  a = 12
  b = 7
  operation = multiply
  ```
- The server executed the operation and returned:
  ```
  Result: 84
  ```

### Step 4 — Result Verification

- Claude received `84` from the tool and confirmed it as correct.
- This validated the full MCP loop: **Claude → Tool Call → Local Server → Result → Claude**.

---

## 🛠 Tool Reference

### `calculate`

Performs a basic arithmetic operation on two numbers.

| Parameter   | Type     | Required | Values                                  |
| ----------- | -------- | -------- | --------------------------------------- |
| `a`         | `number` | ✅       | Any numeric value                       |
| `b`         | `number` | ✅       | Any numeric value                       |
| `operation` | `string` | ✅       | `add`, `subtract`, `multiply`, `divide` |

**Example Request:**

```json
{
  "a": 12,
  "b": 7,
  "operation": "multiply"
}
```

**Example Response:**

```
Result: 84
```

---

## Troubleshooting

**No hammer icon showing?**

- Double-check the path in your config file points to the correct `index.js`
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Make sure Node.js is installed: run `node --version` in a terminal
- Fully quit Claude Desktop from the system tray before restarting

**Config not loading?**

- Confirm the file is named exactly `claude_desktop_config.json` (not `.json.txt`)
- Confirm it lives in `%APPDATA%\Claude\`, not inside the project folder

## 📌 Key Takeaways

- MCP lets Claude call **real, external code** — not guess answers.
- The `calculate` tool is deterministic: same input always yields the same output.
- This pattern scales to databases, APIs, file systems, and hardware.

---

_Built with [Model Context Protocol](https://modelcontextprotocol.io) · Connected via Claude.ai Developer Tools_
