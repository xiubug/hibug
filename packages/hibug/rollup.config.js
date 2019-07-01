import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
    input: './src/index.js',
    output: {
        file: './dist/hibug.js',
        format: 'umd',
        name: 'Hibug'
    },
    plugins: [
        babel({
          exclude: 'node_modules/**', // 只编译我们的源代码
        }),
        commonjs({}),
        resolve({
          mainFields: ['module', 'main', 'jsnext:main'],
          browser: true, // Default: false
          preferBuiltins: false, // Default: true
        }),
    ],
};

if (process.argv[3] === '--compress') {
    config.output.file = './dist/hibug.min.js';
    config.plugins.push(terser());
}

export default config;