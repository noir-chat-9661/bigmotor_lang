import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		'bin/bigmotor': 'src/bin/interpreter.ts',
		'bin/bmc': 'src/bin/compiler.ts',
	},
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: true,
	shims: true
});
