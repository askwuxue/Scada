import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
let pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/Scada.js',
    format: 'iife',
    name: 'Scada',
  },
  plugins: [
    replace({
      VERSION: pkg.version,
      delimiters: ['{{', '}}'],
    }),
    commonjs({ extensions: ['.js', '.ts'] }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.BUILD === 'production' ? uglify() : null,
  ],
};
