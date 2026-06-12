SHELL := /bin/sh

.PHONY: help install bootstrap ci test test-all build clean prune list deps publish

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
	@echo "  publish    - bump version and push tags from main"

install:
	npm install

bootstrap: install

ci:
	npm ci

test:
	npm run test --workspaces --if-present

test-all: test

build:
	npm run build --workspaces --if-present

clean:
	find . -name node_modules -type d -prune -exec rm -rf {} +

prune:
	npm prune --workspaces

list:
	npm query ".workspace" --json

deps:
	npm ls --workspaces --depth=0

publish:
	@echo "Switching to main branch..."
	git checkout main
	@echo "Incrementing version..."
	npm version patch
	@echo "Pushing changes and tags..."
	git push && git push --tags
