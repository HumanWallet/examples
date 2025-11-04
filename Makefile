# Color definitions
BLUE := \033[34m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m
BOLD := \033[1m

lint:
	@echo "$(BOLD)$(BLUE)🔍 Running linting across all workspaces...$(RESET)"
	@pnpm turbo run lint
	@echo "$(GREEN)✅ Linting completed$(RESET)"

typecheck:
	@echo "$(BOLD)$(BLUE)🔧 Running TypeScript type checking across all workspaces...$(RESET)"
	@pnpm turbo run typecheck
	@echo "$(GREEN)✅ Type checking completed$(RESET)"

format:
	@echo "$(BOLD)$(BLUE)✨ Formatting code across all workspaces...$(RESET)"
	@pnpm turbo run format
	@echo "$(GREEN)✅ Code formatting completed$(RESET)"

clean:
	@echo "$(BOLD)$(YELLOW)🧹 Cleaning build artifacts across all workspaces...$(RESET)"
	@pnpm turbo run clean
	@echo "$(GREEN)✅ Cleanup completed$(RESET)"

clean-deps:
	@echo "$(BOLD)$(RED)🗑️ Removing node_modules, dist, build and pnpm-lock.yaml...$(RESET)"
	@rm -rf node_modules pnpm-lock.yaml
	@rm -rf apps/*/node_modules
	@rm -rf packages/*/node_modules
	@rm -rf apps/*/dist apps/*/build apps/*/vercel
	@rm -rf packages/*/dist packages/*/build packages/*/vercel
	@rm -rf .turbo
	@echo "$(GREEN)✅ Dependencies cleaned$(RESET)"

fresh-install: clean-deps
	@echo "$(BOLD)$(BLUE)🔄 Fresh dependency installation...$(RESET)"
	@pnpm install
	@echo "$(GREEN)✅ Fresh installation completed$(RESET)"

build:
	@echo "$(BOLD)$(BLUE)🏗️ Building all workspaces...$(RESET)"
	@pnpm turbo run build
	@echo "$(GREEN)✅ Build completed$(RESET)"

install:
	@echo "$(BOLD)$(BLUE)📦 Installing dependencies for all workspaces...$(RESET)"
	@pnpm install
	@echo "$(GREEN)✅ Installation completed$(RESET)"

dev:
	@echo "$(BOLD)$(BLUE)🚀 Starting development servers for all workspaces...$(RESET)"
	@pnpm turbo run dev

# APPS
dev-react-wagmi:
	pnpm --filter react-wagmi run dev

build-react-wagmi:
	pnpm --filter react-wagmi run build

.PHONY: lint typecheck format clean clean-deps fresh-install build install dev dev-react-wagmi build-react-wagmi
