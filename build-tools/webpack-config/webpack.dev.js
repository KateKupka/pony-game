import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import vars from './webpack.dev-vars';

import paths from '../config/paths';
import babelrc from '../config/babel';
import getClientEnvironment from '../config/env';

const env = getClientEnvironment(vars.publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    // Include an alternative client for WebpackDevServer
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // Include babel-polyfills
    'babel-polyfill',
    // Errors should be considered fatal in development
    require.resolve('react-error-overlay'),
    // Finally, this is your app's code:
    paths.appIndexJs,
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // virtual path to file that is served by WebpackDevServer in development.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: vars.publicPath,
  },
  resolve: {
    alias: {
      core: path.join(process.cwd(), 'src/styles'),
    },
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: [
      '.web.js', '.js', '.json', '.web.jsx', '.jsx', '.eot',
      '.svg', '.woff2', '.woff', '.tff', '.css', '.scss', '.png',
    ],
    plugins: [
      // Prevent importing files out of src/
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will match
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // Process JS with Babel.
          {
            test: /\.js$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: babelrc,
          },
          // "scss/css" loader for src/ ONLY!
          // node_modules loader won't be handled here due to localModules
          {
            test: /\.(scss|css)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            })),
          },
          // {
          //   test: /\.(gif|png|jpe?g|svg)$/i,
          //   use: [
          //     'file-loader',
          //     {
          //       loader: 'image-webpack-loader',
          //       options: {
          //         bypassOnDebug: true,
          //       },
          //     },
          //   ],
          // },
          {
            // Fallback file loader
            // it will match all not matched files!
            // ANY loader below this point WILL BE IGNORED!
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "Fallback file loader" loader.
    ],
  },
  plugins: [
    // define plugin
    new webpack.DefinePlugin(vars.globals),
    // clean build folder
    // we can't clean due to src/content/api running simultaneously
    new CleanWebpackPlugin(paths.appBuild, { allowExternal: true }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Copy over public folder
    // new CopyWebpackPlugin([{
    //   context: path.resolve('./', 'src/public'),
    //   from: '**/*.{ico,json,png,jpg,jpeg,svg,js}',
    //   to: 'public',
    // }]),
    new ExtractTextPlugin({
      filename: 'style.css?v=[contenthash]',
      allChunks: true,
      ignoreOrder: true,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: `${paths.appHtmlDir}/index.html`,
      filename: 'index.html',
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed.
  performance: {
    hints: false,
  },
};
