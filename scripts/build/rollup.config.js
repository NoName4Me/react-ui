import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import pkg from '../../package.json';
const reactRelatedPkgs = Object.keys(pkg.peerDependencies);
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const defaultPlugins = [
  resolve({
    extensions,
  }),
  commonjs(),
  sass({output: 'dist/umd/index.css'}),
  babel({
    runtimeHelpers: true,
    exclude: /node_modules/,
    configFile: './babel.config.js',
    extensions,
  }),
];

export default {
  external: [...reactRelatedPkgs],
  input: 'src/index.ts',
  plugins: defaultPlugins,
  output: [
    {
      file: 'dist/umd/cybereact.js',
      format: 'umd',
      name: 'PaperReactUI',
      globals,
    },
    {
      file: 'dist/umd/cybereact.min.js',
      format: 'umd',
      plugins: [terser()],
      name: 'PaperReactUI',
      globals,
    },
  ],
};
