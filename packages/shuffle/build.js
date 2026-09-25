const esbuild = require('esbuild');

const shared = {
  entryPoints: ['./modules/index.js'],
  bundle: true,
  sourcemap: true,
  target: ['es2015'],
};

// Browser builds expose window.MitchAllen.Shuffle.
const iife = {
  ...shared,
  format: 'iife',
  globalName: 'MitchAllen.Shuffle',
};

const builds = [
  // Readable browser bundle.
  { ...iife, outfile: './dist/shuffle.js', minify: false },
  // Minified browser bundle. This is the file the README's jsDelivr link
  // serves; the esbuild migration stopped emitting it, so tags after the
  // migration had no shuffle.min.js and the documented URL 404'd.
  { ...iife, outfile: './dist/shuffle.min.js', minify: true },
  // CommonJS entry point; package.json "main" resolves here.
  { ...shared, format: 'cjs', outfile: './dist/shuffle.cjs.js', minify: false },
];

Promise.all(builds.map((options) => esbuild.build(options))).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
