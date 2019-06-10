import path from 'path';
import alias from 'rollup-plugin-alias';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
    alias({
      resolve: ['.js', '.ts', '.svelte'],
      src: path.resolve(__dirname, 'src')
    }),
    typescript(),
		svelte({
			dev: !production,
			css: css => {
				css.write('public/bundle.css');
			}
		}),
		resolve(),
		commonjs(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
