import aliases from './aliases';

/**
 * Config: babel.js
 * - configuration of babel for webpack compiler
 * - it has to be given from this file as .babelrc
 *   can't be used due to webpack instance running as es6 code,
 *   which interfere with webpack compiler babel rc config.
 */
export default {
  // disable babelrc file
  babelrc: false,
  // cache directory
  cacheDirectory: true,
  // presets
  presets: [
    'env',
    'stage-2',
  ],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    'transform-export-extensions',
    ['module-resolver', {
      root: ['./src/'],
      alias: aliases,
      extensions: ['.js', '.jsx', '.scss', '.json'],
    }]
  ],
};
