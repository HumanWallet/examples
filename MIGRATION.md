# Migration to pnpm Workspaces + Turborepo

This document outlines the migration from npm to pnpm workspaces with Turborepo for build orchestration.

## Changes Made

### 1. Package Manager Configuration

- **Created** `pnpm-workspace.yaml` - Defines workspace structure for pnpm
- **Updated** `package.json` - Removed npm-specific `workspaces` field, added Turborepo scripts
- **Updated** `.npmrc` - Added pnpm configuration with recommended settings
- **Updated** `apps/react-wagmi/package.json` - Changed `@examples/ui` dependency to use `workspace:*` protocol
- **Added** `turbo` as dev dependency

### 2. Build System

- **Created** `turbo.json` - Turborepo configuration with task pipelines and caching
- **Updated** `Makefile` - Replaced pnpm commands with Turborepo commands
- **Updated** `.gitignore` - Added `.turbo` cache directory

### 3. Documentation

- **Updated** `README.md` - Added pnpm and Turborepo documentation
- **Updated** `.gitignore` - Added pnpm and Turborepo specific entries

### 4. Lock Files

- **Removed** `package-lock.json` - npm lock file
- **Created** `pnpm-lock.yaml` - pnpm lock file

## Key Differences

### Command Comparison

| npm | pnpm |
|-----|------|
| `npm install` | `pnpm install` |
| `npm run dev --workspace=react-wagmi` | `pnpm --filter react-wagmi run dev` |
| `npm run build --workspaces --if-present` | `pnpm -r --if-present run build` |
| `npm run lint --workspaces` | `pnpm -r run lint` |

### Workspace Configuration

**npm** (package.json):
```json
{
  "workspaces": [
    "apps/react-wagmi",
    "packages/ui"
  ]
}
```

**pnpm** (pnpm-workspace.yaml):
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Workspace Dependencies

**npm**:
```json
{
  "dependencies": {
    "@examples/ui": "^1.0.0"
  }
}
```

**pnpm**:
```json
{
  "dependencies": {
    "@examples/ui": "workspace:*"
  }
}
```

### Benefits of pnpm + Turborepo

#### pnpm Benefits:
1. **Faster installations** - Uses hard links and content-addressable storage
2. **Disk space efficiency** - Avoids duplicate packages across projects
3. **Strict dependency management** - Better handles peer dependencies
4. **Monorepo optimization** - Purpose-built for workspace management

#### Turborepo Benefits:
1. **Intelligent caching** - Never rebuild the same code twice
2. **Parallel execution** - Runs tasks in parallel when possible
3. **Incremental builds** - Only rebuilds what changed
4. **Remote caching** - Share cache across team (optional)
5. **Task pipelines** - Automatic dependency-aware task execution

## Migration Steps for Team Members

If you're pulling these changes, follow these steps:

1. **Install pnpm globally** (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. **Clean old dependencies**:
   ```bash
   make clean-deps
   ```

3. **Install with pnpm**:
   ```bash
   pnpm install
   ```

4. **Verify the build**:
   ```bash
   make build
   ```

5. **Run development server**:
   ```bash
   make dev-react-wagmi
   ```

## Turborepo Configuration

The `turbo.json` file defines how Turborepo runs tasks:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**"],    // Cache these directories
      "cache": true              // Enable caching
    },
    "dev": {
      "cache": false,            // Don't cache dev server
      "persistent": true         // Keep running
    }
  }
}
```

### Cache Behavior

- **First build**: Normal build time
- **Subsequent builds** (no changes): Instant (restored from cache)
- **Incremental builds**: Only changed workspaces rebuild

### Turborepo Commands

```bash
# Run build with caching
pnpm turbo run build

# Force rebuild (skip cache)
pnpm turbo run build --force

# View build graph
pnpm turbo run build --graph

# Clear cache
rm -rf .turbo
```

### .npmrc Settings

- `auto-install-peers=true` - Automatically installs peer dependencies
- `shamefully-hoist=true` - Hoists dependencies to the root node_modules (required for this project's structure)
- `strict-peer-dependencies=false` - Allows some flexibility with peer dependency versions
- `enable-pre-post-scripts=true` - Enables pre and post install scripts

## Troubleshooting

### Issue: "The 'workspaces' field in package.json is not supported by pnpm"

**Solution**: This warning should no longer appear after the migration. If you see it, ensure `pnpm-workspace.yaml` exists in the project root.

### Issue: "Moving X that was installed by a different package manager to node_modules/.ignored"

**Solution**: Run `make clean-deps` followed by `pnpm install` to clean up npm artifacts.

### Issue: Workspace not found

**Solution**: Ensure the workspace name in `pnpm --filter <name>` matches the `name` field in the workspace's `package.json`.

### Issue: Cannot find module errors during build

**Solution**: The project requires `shamefully-hoist=true` in `.npmrc` to work properly. This is already configured.

## Rollback (if needed)

If you need to rollback to npm:

1. Delete `pnpm-workspace.yaml`
2. Restore the `workspaces` field in root `package.json`
3. Change `@examples/ui` dependency back to `^1.0.0` in `apps/react-wagmi/package.json`
4. Run `git checkout HEAD~1 -- Makefile README.md .gitignore .npmrc`
5. Run `npm install`

## Additional Resources

- [pnpm Documentation](https://pnpm.io/)
- [pnpm Workspaces Guide](https://pnpm.io/workspaces)
- [pnpm CLI Reference](https://pnpm.io/cli/add)
- [Workspace Protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)

