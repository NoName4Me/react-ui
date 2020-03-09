import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import pkg from './package.json';
const reactRelatedPkgs = Object.keys(pkg.peerDependencies);

export default {
  external: [...reactRelatedPkgs],
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'ReactRollupStorybook', // the global which can be used in a browser
    },
  ],
  plugins: [sass(), typescript(), resolve(), commonjs(), terser()],
};
