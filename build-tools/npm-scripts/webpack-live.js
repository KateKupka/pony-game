/* eslint-disable global-require */
import webpack from 'webpack';
import chalk from 'chalk';
import child from 'child_process';
import path from 'path';

// set env variables
const environment = 'production';
process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

/**
 * Webpack live build runner
 * - generate output in /build
 */
export default new class WebpackDebug {

  // require webpack config
  webpackConfig = require('../webpack-config/webpack.live');

  constructor() {

    // create webpack compiler
    const compiler = webpack(this.webpackConfig);

    console.log(chalk.bgYellow.black(' webpack live starting ... '));

    compiler.run((err, stats) => {
      console.log('[webpack:build]', stats.toString({
        colors: true,
      }));
      this.startPythonSimpleHttpServer();
    });
  }

  startPythonSimpleHttpServer() {
    console.log(chalk.green('starting python server on port 8080'));
    const python = child.spawn('python', ['-m', 'SimpleHTTPServer', '8080'], {
      cwd: path.resolve(process.cwd(), 'build'),
    });

    python.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
    });

    python.on('exit', (code, signal) => {
      console.log('child process exited with ' +
        `code ${code} and signal ${signal}`);
    });

    python.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

};

