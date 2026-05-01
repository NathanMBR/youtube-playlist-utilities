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

## CI/CD Workflows

Two release workflows live in `.github/workflows/`:

### `release.yml` — Stable releases
Triggered when the **Code Quality Workflow** completes successfully on `master`.

Jobs (run in this order):
1. **`create-release`** — reads the app version from `src/main/tauri/tauri.conf.json` (`package.version`), creates a draft GitHub Release tagged `v<VERSION>`, and outputs `release_id` and `tag_name` for the downstream jobs.
2. **`build-linux`** — runs on `ubuntu-latest`; builds inside a `ubuntu:20.04` Docker container to ensure glibc 2.31 compatibility. Installs Node.js via nvm, pnpm via the official standalone script, and Rust via rustup — all inside the container. Uploads `.deb` and `.AppImage` artifacts from `src/main/tauri/target/release/bundle/` to the release using the GitHub CLI.
3. **`build-windows`** — runs on `windows-latest`; uses `tauri-apps/tauri-action@v0` with `releaseId` (not `tagName`) to upload artifacts to the already-created release.
4. **`build-macos`** — runs on `macos-latest`; same approach as `build-windows`.

Jobs 2–4 run in parallel after job 1 completes.

### `release-unstable.yml` — Unstable releases
Triggered on every push or pull request to `development`.

Same job structure as above, without `build-macos`. The release tag is `v<VERSION>-unstable-<run_id>-<run_attempt>` to guarantee uniqueness per CI run. The release is created as a prerelease (not a draft).

### Design notes
- The `create-release`-first pattern eliminates the race condition that occurs when multiple jobs try to create the same GitHub Release simultaneously.
- Passing `releaseId` to `tauri-action` (instead of `tagName`) bypasses its release-creation logic, so it only uploads artifacts.
- The Docker build script is written to `/tmp/build.sh` on the runner and bind-mounted into the container to avoid shell escaping issues with multi-command `docker run bash -c "..."` calls.
- A `chown` step after the Docker run restores file ownership so the runner user can read the build artifacts.