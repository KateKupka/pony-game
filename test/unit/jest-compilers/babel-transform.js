module.exports = require('babel-jest').createTransformer({
  // disable babelrc file
  babelrc: false,
  // cache directory
  cacheDirectory: true,
  // presets
  presets: [
    'react-app',
    'stage-2',
  ],
  plugins: [
    'transform-runtime',
    'transform-react-jsx',
    // jsx control statements
    // @library: https://www.npmjs.com/package/jsx-control-statements
    // @example: <If condition={condition()}>Hello World!</If>
    'jsx-control-statements',
    'transform-decorators-legacy',
    'transform-export-extensions',
    // support aliases
    // @library: https://github.com/tleunen/babel-plugin-module-resolver
    //
    // allow for importing by absolute path instead relative paths
    // fix messy code import issue,
    // @example:
    //  import config from 'config'; instead of import config from '../../../../config';
    // 'transform-react-remove-prop-types',
    ['module-resolver', {
      root: ['./src/'],
      alias: {
        app: './src/app',
        components: './src/app/components',
        config: './src/config',
        core: './src/app/core',
        utils: './src/app/utils',
        pages: './src/components/pages',
        public: './src/public',
        store: './src/app/store',
        styles: './src/app/styles',
        data: './src/data',
      },
      extensions: ['.js', '.jsx', '.scss', '.json'],
    }],
  ],
});

