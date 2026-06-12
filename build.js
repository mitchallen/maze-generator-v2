const esbuild = require('esbuild');

// IIFE build for browser usage
esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outfile: './dist/maze-generator-v2.js',
  format: 'iife',
  globalName: 'MitchAllen.MazeGeneratorV2',
  minify: true,
  sourcemap: true,
  target: ['es2015'],
}).catch((err) => {
  console.error('IIFE build failed:', err);
  process.exit(1);
});

// CJS build for Node.js/tests
esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outfile: './dist/maze-generator-v2.cjs.js',
  format: 'cjs',
  minify: true,
  sourcemap: true,
  target: ['es2015'],
}).catch((err) => {
  console.error('CJS build failed:', err);
  process.exit(1);
});
