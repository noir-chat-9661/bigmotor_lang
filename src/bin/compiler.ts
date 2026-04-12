#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { parse } from '../parser.js';

/**
 * Bigmotor Compiler (to Brainfuck) CLI
 */
async function main() {
	const args = process.argv.slice(2);
	const filePath = args[0];

	if (!filePath) {
		console.log('Usage:\n  bigmotor-compile <file.bm|file.bigmotor>\n  bmc <file.bm|file.bigmotor>');
		process.exit(1);
	}

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

		// Output standard Brainfuck code
		process.stdout.write(commands.join('') + '\n');
	} catch (error) {
		process.stderr.write(`Error: ${error instanceof Error ? error.message : error}\n`);
		process.exit(1);
	}
}

main();
