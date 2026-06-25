SHELL := /bin/sh

.PHONY: help install bootstrap ci test test-all build build-layer1 build-layer2 build-layer3 build-layer4 clean prune list deps pack pack-check publish

.DEFAULT_GOAL := help

help:
	@echo "Available targets:"
	@echo "  install    - install dependencies"
	@echo "  bootstrap  - alias for install"
	@echo "  ci         - install dependencies via npm ci"
	@echo "  test       - run tests for all workspaces"
	@echo "  test-all   - alias for test"
	@echo "  build      - build all workspaces"
	@echo "  clean      - remove all node_modules directories"
	@echo "  prune      - prune dependencies for all workspaces"
	@echo "  list       - list all workspaces"
	@echo "  deps       - list dependencies for all workspaces"
	@echo "  pack       - build, then dry-run npm pack to verify the published tarball"
	@echo "  pack-check - build, then fail if the packed tarball contains unexpected files"
	@echo "  publish    - bump version and push tags from main"

install:
	npm install

bootstrap: install

ci:
	npm ci

test:
	npm run test --workspaces --if-present

test-all: test

# npm run build --workspaces builds in workspace-listing order, not
# dependency order, so root and grid would build before the packages
# they bundle via require(). Build in explicit dependency layers instead.

# Layer 1: packages with no internal workspace dependencies
build-layer1:
	npm run build --workspace=shuffle --workspace=grid-core --workspace=maze-generator-core

# Layer 2: depends only on layer 1
build-layer2: build-layer1
	npm run build --workspace=grid-square --workspace=connection-grid-core

# Layer 3: depends on layers 1-2
build-layer3: build-layer2
	npm run build --workspace=grid --workspace=connection-grid-square

# Layer 4: depends on layers 1-3
build-layer4: build-layer3
	npm run build --workspace=connection-grid --workspace=maze-generator-square --workspace=maze-generator-weave

# Root depends on layers 1-4
build: build-layer4
	npm run build --workspace=.

clean:
	find . -name node_modules -type d -prune -exec rm -rf {} +

prune:
	npm prune --workspaces

list:
	npm query ".workspace" --json

deps:
	npm ls --workspaces --depth=0

# Build the root bundle, then show exactly what `npm publish` would ship.
# The `files` allowlist in package.json should limit this to dist/ only —
# no src/, test/, coverage/, or other build artifacts. Eyeball the output
# (or wire it into CI) whenever packaging behavior might have changed.
pack: build
	npm pack --dry-run

# Same as `pack`, but asserts the file list is correct and exits non-zero
# otherwise — suitable for CI. See scripts/check-pack.js.
pack-check: build
	node scripts/check-pack.js

publish:
	@echo "Switching to main branch..."
	git checkout main
	@echo "Incrementing version..."
	npm version patch
	@echo "Pushing changes and tags..."
	git push && git push --tags
