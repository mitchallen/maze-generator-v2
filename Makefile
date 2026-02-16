SHELL := /bin/sh

.PHONY: install bootstrap ci test build clean prune list deps publish

install:
	npm install

bootstrap: install

ci:
	npm ci

test:
	npm run test --workspaces --if-present

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
