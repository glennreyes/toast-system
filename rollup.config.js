import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    exports: 'named',
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: ['countup.js', 'prop-types', 'react', 'react-dom', 'warning'],
};
