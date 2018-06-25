/* eslint "import/order": "off" */
import 'raf/polyfill';
import chai from 'chai';
import sinonChai from 'sinon-chai';

// extend chai with sinon
chai.use(sinonChai);

// move default jest expect into `jestExpect`
global.jestExpect = global.expect;

// overwrite `expect` with `chai` expect
global.expect = chai.expect;
