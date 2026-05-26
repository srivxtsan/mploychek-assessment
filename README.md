# MPloyChek — Background Verification Portal

A modern, full-stack background-verification portal built with an **Angular client application** and a **Node.js/Express REST API engine**. The system features role-based routing, mock-session tracking, dynamic administrative visibility matrixing, and an asynchronous processing model showcasing realistic pipeline network delays.

---

## 🚀 Key Features

- **Role-Based Portal Access:** Differentiated workspaces and structural column parsing for `General User` and `Admin` roles.
- **Asynchronous Data Pipelines:** Frontend components interface with an artificial 2.5-second background server processing lag, demonstrating advanced handling of loading state management.
- **State Optimization:** Comprehensive state protections mapping continuous UI actions (e.g., button click-state disabling, fallback rendering arrays, error interceptions).
- **Elegant User Interface:** A minimalist corporate tech layout incorporating custom glassmorphism, responsive elements, and clean state components.

---

## 📸 Application Interface

### 1. Secure Authentication Panel
*A polished access portal providing secure entry and runtime role validation.*
![Login View](assets/login-screenshot.png)

### 2. Live Background Verification Panel (Async Fetching)
*Demonstrating state-aware loading animations during the 2.5s network processing period.*
![Loading Spinner View](assets/loading-screenshot.png)

### 3. Verification Records Table (Admin Matrix View)
*Dynamic evaluation displaying full multi-user records for administrative access, utilizing pastel validation indicator badges.*
![Dashboard View](assets/dashboard-screenshot.png)

---

## 🛠️ Architecture Overview

```text
mploychek-assessment/
├── backend/               # Node.js Express Server
│   ├── server.js          # REST API endpoints & logic
│   └── database.json      # Flat-file structured mock dataset
└── frontend/              # Angular Standalone Single Page Application (SPA)
    └── src/
        ├── app/
        │   ├── login/     # Login UI, forms, and validation handler
        │   └── dashboard/ # Data grid, rendering engine, and session guards
        └── main.ts        # SPA bootstrap layout entry point
