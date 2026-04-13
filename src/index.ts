#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { parse } from './parser';
import { interpret } from './interpreter';

export { parse } from './parser';
export { interpret } from './interpreter';

/**
 * Bigmotor language unified CLI
 */
async function main() {
	const args = process.argv.slice(2);
	const filePath = args.filter((arg) => !arg.startsWith('--'))[0];

	if (!filePath) {
		console.log('Usage: bigmotor_lang <file.bm|file.bigmotor> [options]');
		console.log('\nOptions:');
		console.log('  --transpile, --compile, -T, -C   Output Brainfuck code instead of executing');
		return;
	}

	const isCompileMode =
		args.includes('--compile') || args.includes('--transpile') || args.includes('-T') || args.includes('-C');

	// Check file extension
	const ext = extname(filePath);
	if (ext !== '.bm' && ext !== '.bigmotor') {
		console.error(`Error: Invalid extension '${ext}'. Please use .bm or .bigmotor.`);
		process.exit(1);
	}

	try {
		const source = await readFile(filePath, 'utf-8');
		const commands = parse(source);

		if (commands.length === 0) {
			console.warn('Warning: No valid commands found.');
			return;
		}

		if (isCompileMode) {
			// Output Brainfuck code
			process.stdout.write(commands.join('') + '\n');
		} else {
			// Directly execute
			await interpret(commands);
			// Add a newline at the end (to avoid output mixing)
			process.stdout.write('\n');
		}
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : error);
		process.exit(1);
	}
}

main();
