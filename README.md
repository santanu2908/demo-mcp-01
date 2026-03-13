# 🔧 my-local-server — MCP Calculator Tool

> A minimal Model Context Protocol (MCP) server that exposes a `calculate` tool to Claude, enabling deterministic arithmetic via external code execution.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Steps Performed](#steps-performed)
- [Tool Reference](#tool-reference)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Pushing to GitHub](#pushing-to-github)

---

## Overview

This project demonstrates how to build and connect a local MCP server to Claude (claude.ai). Claude can then call the `calculate` tool to perform reliable, deterministic math operations — rather than relying on language-model inference for arithmetic.

---

## ✅ Steps Performed

### Step 1 — MCP Server Setup

- A local server (`my-local-server`) was created and configured to run on the machine.
- The server was registered inside Claude's **Settings → Developer** panel.
- Status was verified as **connected and running**.

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

## 📁 Project Structure

```
my-local-server/
│
├── src/
│   └── index.js          # MCP server entry point
│
├── tools/
│   └── calculate.js      # Calculate tool logic
│
├── .gitignore            # Ignore node_modules, .env, etc.
├── package.json          # Dependencies and scripts
├── mcp.config.json       # MCP server configuration
└── README.md             # This file
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- npm or yarn
- A Claude.ai account with Developer access

### Install Dependencies

```bash
git clone https://github.com/YOUR_USERNAME/my-local-server.git
cd my-local-server
npm install
```

### Start the Server

```bash
npm start
```

### Register with Claude

1. Go to **claude.ai → Settings → Developer**
2. Click **Add MCP Server**
3. Enter your local server URL (e.g., `http://localhost:3000`)
4. Confirm it shows as **Connected**

---

## 🚀 Pushing to GitHub

### First-Time Setup

```bash
# 1. Initialize git in your project folder
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: MCP calculate server"

# 4. Create repo on GitHub, then link it
git remote add origin https://github.com/YOUR_USERNAME/my-local-server.git

# 5. Push
git push -u origin main
```

### Subsequent Pushes

```bash
git add .
git commit -m "Your commit message"
git push
```

### Recommended `.gitignore`

```
node_modules/
.env
*.log
.DS_Store
dist/
```

---

## 📌 Key Takeaways

- MCP lets Claude call **real, external code** — not guess answers.
- The `calculate` tool is deterministic: same input always yields the same output.
- This pattern scales to databases, APIs, file systems, and hardware.

---

_Built with [Model Context Protocol](https://modelcontextprotocol.io) · Connected via Claude.ai Developer Tools_
