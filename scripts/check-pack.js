#!/usr/bin/env node
'use strict';

// Guard against the published tarball leaking files it shouldn't.
//
// Runs `npm pack --dry-run --json`, then asserts that every file in the
// tarball is one we expect and that the required entry points are present.
// Exits non-zero (failing CI / `make pack-check`) on any mismatch.
//
// We intentionally validate against a *pattern* allowlist rather than an
// exact file list, so adding/renaming a bundle in dist/ doesn't break this
// check — but anything outside dist/ (src/, test/, coverage/, stray config)
// will. See the "What gets published" section of the README for background.

const { execSync } = require('node:child_process');
const pkg = require('../package.json');

// npm always force-includes these regardless of the `files` allowlist.
const ALWAYS_ALLOWED = /^(package\.json|README(\.[^/]+)?|LICEN[SC]E(\.[^/]+)?)$/i;

// Everything else must live under dist/.
const ALLOWED_DIR = 'dist/';

// Entry points that must always ship.
const REQUIRED = [
  pkg.main,                          // CommonJS bundle (package main)
  'dist/maze-generator-v2.js',       // browser IIFE bundle (CDN usage)
].filter(Boolean);

function getPackedFiles() {
  const out = execSync('npm pack --dry-run --json', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const report = JSON.parse(out);
  // `npm pack --json` returns an array with one entry per packed tarball.
  return report.flatMap((entry) => entry.files.map((f) => f.path));
}

function main() {
  const files = getPackedFiles();

  const unexpected = files.filter(
    (f) => !ALWAYS_ALLOWED.test(f) && !f.startsWith(ALLOWED_DIR),
  );
  const missing = REQUIRED.filter((req) => !files.includes(req));

  console.log(`Packed ${files.length} file(s):`);
  for (const f of files.slice().sort()) console.log(`  ${f}`);

  if (unexpected.length === 0 && missing.length === 0) {
    console.log('\n✓ Tarball contents look correct (only dist/ + npm metadata).');
    return;
  }

  if (unexpected.length > 0) {
    console.error('\n✗ Unexpected file(s) in the tarball (should be dist/ only):');
    for (const f of unexpected.sort()) console.error(`    ${f}`);
    console.error('  Tighten the "files" allowlist in package.json.');
  }
  if (missing.length > 0) {
    console.error('\n✗ Required file(s) missing from the tarball:');
    for (const f of missing.sort()) console.error(`    ${f}`);
    console.error('  Did the build run? Check build.js / the "files" allowlist.');
  }
  process.exit(1);
}

main();
