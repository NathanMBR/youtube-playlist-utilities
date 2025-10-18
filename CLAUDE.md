# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YouTube Playlist Utilities is a Tauri-based desktop application for managing YouTube playlists. It helps identify and remove unavailable/non-public videos from playlists. The app uses React + TypeScript for the frontend and Tauri for the desktop wrapper.

## Architecture

The codebase follows Clean Architecture principles with clear separation of concerns:

- **Domain Layer** (`src/domain/`): Core business logic, entities, and use case interfaces
- **Data Layer** (`src/data/`): Use case implementations, repositories, validators, and models
- **Infrastructure Layer** (`src/infra/`): External service implementations (Node.js APIs, Zod validators)
- **Presentation Layer** (`src/presentation/`): React components, pages, and UI logic
- **Main Layer** (`src/main/`): Application entry points (Vite for web, Tauri for desktop)

Key architectural patterns:
- Dependency injection through factories in `src/main/vite/factories/`
- Repository pattern for data access
- Use case pattern for business logic
- Validation layer using Zod schemas

## Common Development Commands

### Package Manager
Use `pnpm` (required version >= 8.6.5):
```bash
pnpm install
```

### Development
```bash
pnpm dev                 # Start Vite dev server
pnpm tauri               # Access Tauri CLI commands
```

### Building
```bash
pnpm build              # Build for production
pnpm tauri build        # Build Tauri desktop app
```

### Code Quality
```bash
pnpm lint               # Run TypeScript check + ESLint with auto-fix
pnpm lint:ci            # Run TypeScript check + ESLint (CI mode, no auto-fix)
```

### Testing
```bash
pnpm test               # Run tests with coverage
pnpm test:unit          # Run unit tests (files ending with .spec.ts)
pnpm test:e2e           # Run e2e tests (files ending with .test.ts)
pnpm test:ci            # Run tests in CI mode with verbose output
```

## Environment Setup

1. Create `.env` file based on `.env.example`
2. Set `VITE_GOOGLE_OAUTH_CLIENT_ID` with your Google OAuth Client ID
3. Default port is 1420 (`VITE_PORT=1420`)

## Key Technologies

- **Frontend**: React 18, TypeScript, Mantine UI, React Router
- **Desktop**: Tauri v1
- **Validation**: Zod
- **Testing**: Vitest
- **Bundler**: Vite
- **Linting**: ESLint + TypeScript

## Code Organization

- Use case implementations in `src/data/usecases/` with corresponding tests (.spec.ts)
- Repository interfaces in `src/domain/` with implementations in `src/data/repositories/` and `src/infra/repositories/`
- React components in `src/presentation/components/` with index.ts barrel exports
- Page components in `src/presentation/pages/`
- Factory functions for dependency injection in `src/main/vite/factories/`

## Testing Strategy

- Unit tests: `.spec.ts` files alongside implementation files
- Test coverage enabled by default with `pnpm test`
- Use Vitest for testing framework