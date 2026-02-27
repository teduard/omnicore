# OmniCore

A privacy-first personal finance and productivity platform 
that runs entirely in your browser — no account required, 
no data leaves your device.

**[Live Demo](https://teduard.github.io/omnicore)**

## What it does
- Expense tracking with category breakdown, monthly trends, 
  and AI-powered spend insights
- Task management (Taskifier)
- Fitness and organisation modules
- Works offline — installable as a PWA

## Why it's different
All data is stored locally using an embedded SQLite database 
(sql.js / WebAssembly). Your financial data never touches a server.
The app functions fully offline and can be installed on any device.

## Technical highlights
- **In-browser SQLite** via sql.js (WebAssembly) with 
  Base64 localStorage persistence
- **Hybrid search** combining BM25 keyword ranking and 
  vector similarity with Reciprocal Rank Fusion
- **PWA** — offline capable, installable, service worker configured
- **Data source abstraction** — architecture supports switching 
  between local and remote backend without component changes
- **React 19 + TypeScript** with Cloudscape Design System

## Stack
React 19, TypeScript, Vite, sql.js, Zustand, React Query,
Cloudscape Design System, Tailwind CSS

## Getting started
npm install
npm run dev

## Architecture
src/
├── app/          # bootstrapping — main, router, providers
├── modules/      # feature modules (expense, fitness, etc.)
├── services/     # data access layer
├── contexts/     # global React context providers
├── db/           # sql.js initialisation and migrations
├── hooks/        # shared custom hooks
├── lib/          # pure utilities (logger, dateUtils, etc.)
└── pages/        # top-level route components