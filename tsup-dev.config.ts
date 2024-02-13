import { defineConfig } from 'tsup';

export default defineConfig({
	entry: { dragToBlank: 'src/index.ts' },
	platform: 'browser',
	target: 'es5',
	format: ['cjs'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	minify: false,
	treeshake: false,
	outDir: './dev/scripts',
	env: {
		NODE_ENV: 'DEV',
	},
	watch: ['src'],
});
