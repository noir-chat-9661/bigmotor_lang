import { readSync } from 'node:fs';
import type { Command } from './parser';

/**
 * Interprets a sequence of commands.
 * @param commands Parsed command sequence
 */
export async function interpret(commands: Command[]) {
	// Memory: 30,000 cells of 8-bit unsigned integers
	const memory = new Uint8Array(30000);
	let ptr = 0;
	let pc = 0;

	// Pre-calculate matching [ and ] indices
	const jumpTargets = new Map<number, number>();
	const stack: number[] = [];

	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i];
		if (cmd === '[') {
			stack.push(i);
		} else if (cmd === ']') {
			const start = stack.pop();
			if (start === undefined) {
				throw new Error(`Syntax Error: Unmatched ']' found at index ${i}.`);
			}
			jumpTargets.set(start, i);
			jumpTargets.set(i, start);
		}
	}

	if (stack.length > 0) {
		const lastOpen = stack.pop();
		throw new Error(`Syntax Error: Unclosed '[' found at index ${lastOpen}.`);
	}

	// 実行ループ
	while (pc < commands.length) {
		const cmd = commands[pc];

		switch (cmd) {
			case '+': {
				const val = memory[ptr];
				if (val !== undefined) memory[ptr] = (val + 1) & 0xff;
				break;
			}
			case '-': {
				const val = memory[ptr];
				if (val !== undefined) memory[ptr] = (val - 1) & 0xff;
				break;
			}
			case '<':
				ptr = (ptr - 1 + memory.length) % memory.length;
				break;
			case '>':
				ptr = (ptr + 1) % memory.length;
				break;
			case '[': {
				const val = memory[ptr];
				if (val === 0) {
					const target = jumpTargets.get(pc);
					if (target !== undefined) {
						pc = target;
					}
				}
				break;
			}
			case ']': {
				const val = memory[ptr];
				if (val !== 0 && val !== undefined) {
					const target = jumpTargets.get(pc);
					if (target !== undefined) {
						pc = target;
					}
				}
				break;
			}
			case '.': {
				const val = memory[ptr];
				if (val !== undefined) {
					process.stdout.write(String.fromCharCode(val));
				}
				break;
			}
			case ',': {
				const buffer = Buffer.alloc(1);
				try {
					const bytesRead = readSync(0, buffer, 0, 1, null);
					if (bytesRead > 0) {
						const val = buffer[0];
						if (val !== undefined) memory[ptr] = val;
					} else {
						// EOF
						memory[ptr] = 0;
					}
				} catch (err) {
					// Error (e.g., input stream disconnected) - set to 0
					memory[ptr] = 0;
				}
				break;
			}
		}
		pc++;
	}
}
