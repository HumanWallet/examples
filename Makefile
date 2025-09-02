# Color definitions
BLUE := \033[34m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m
BOLD := \033[1m

lint:
	@echo "$(BOLD)$(BLUE)🔍 Running linting across all workspaces...$(RESET)"
	@npm run lint --workspaces --if-present
	@echo "$(GREEN)✅ Linting completed$(RESET)"

typecheck:
	@echo "$(BOLD)$(BLUE)🔧 Running TypeScript type checking across all workspaces...$(RESET)"
	@npm run typecheck --workspaces --if-present
	@echo "$(GREEN)✅ Type checking completed$(RESET)"

format:
	@echo "$(BOLD)$(BLUE)✨ Formatting code across all workspaces...$(RESET)"
	@npm run format --workspaces --if-present
	@echo "$(GREEN)✅ Code formatting completed$(RESET)"

clean:
	@echo "$(BOLD)$(YELLOW)🧹 Cleaning build artifacts across all workspaces...$(RESET)"
	@npm run clean --workspaces --if-present
	@echo "$(GREEN)✅ Cleanup completed$(RESET)"

clean-deps:
	@echo "$(BOLD)$(RED)🗑️ Removing node_modules and package-lock.json...$(RESET)"
	@rm -rf node_modules package-lock.json
	@rm -rf apps/*/node_modules apps/*/package-lock.json
	@rm -rf packages/*/node_modules packages/*/package-lock.json
	@echo "$(GREEN)✅ Dependencies cleaned$(RESET)"

fresh-install: clean-deps
	@echo "$(BOLD)$(BLUE)🔄 Fresh dependency installation...$(RESET)"
	@npm install
	@echo "$(GREEN)✅ Fresh installation completed$(RESET)"

build:
	@echo "$(BOLD)$(BLUE)🏗️ Building all workspaces...$(RESET)"
	@npm run build --workspaces --if-present
	@echo "$(GREEN)✅ Build completed$(RESET)"

install:
	@echo "$(BOLD)$(BLUE)📦 Installing dependencies for all workspaces...$(RESET)"
	@npm install --workspaces
	@echo "$(GREEN)✅ Installation completed$(RESET)"

dev:
	@echo "$(BOLD)$(BLUE)🚀 Starting development servers for all workspaces...$(RESET)"
	@npm run dev --workspaces --if-present

# APPS
dev-react-wagmi:
	npm run dev --workspace=apps/react-wagmi

build-react-wagmi:
	npm run build --workspace=apps/react-wagmi

.PHONY: lint typecheck format clean clean-deps fresh-install build install dev dev-react-wagmi build-react-wagmi
