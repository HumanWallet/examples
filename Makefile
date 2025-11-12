.PHONY: lib
OWNER=Tutellus

SHELL := /bin/sh
.DEFAULT_GOAL := help

export DEBUG ?= tutellus:*
BUILD ?=

dev: ## develop the application
	cd apps/react-wagmi && pnpm run dev 

build: ## build the application
	pnpm build

preview: ## preview the application
	pnpm preview

build_dev: ## build and then start env
		make build
		make dev

build_preview: ## build and then start env
		pnpm build
		pnpm preview --filter=react-wagmi

clean: ## Remove all artefactories
	pnpm clean
	rm -Rf node_modules pnpm-lock.yaml .turbo

lint: ## Run the linter
	pnpm lint

format: ## Run the prettier
	pnpm format

typecheck: ## Run the type checker
	pnpm typecheck

phoenix: ## Run the phoenix command
	rm -Rf node_modules pnpm-lock.yaml .turbo dist
	pnpm clean --filter=@examples/react-wagmi
	pnpm clean --filter=@examples/ui
	pnpm install --no-frozen-lockfile