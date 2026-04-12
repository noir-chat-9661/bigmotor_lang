import * as z from 'zod';

/**
 * Zod schema for Brainfuck command set
 */
export const CommandSchema = z.enum(['+', '-', '<', '>', '[', ']', ',', '.']);
export type Command = z.infer<typeof CommandSchema>;

/**
 * Mapping from Bigmotor words to Brainfuck commands
 */
const BIGMOTOR_MAPPING: Record<string, Command> = {
	'教育教育教育': '+',
	'死刑死刑死刑': '-',
	'教育死刑死刑': '<',
	'死刑死刑教育': '>',
	'教育教育死刑': '[',
	'死刑教育教育': ']',
	'死刑教育死刑': ',',
	'教育死刑教育': '.',
} as const satisfies Record<string, Command>;

/**
 * Parses source code into a Command array.
 * Extracts "教育" (Education) or "死刑" (Death Penalty) as a single word,
 * and processes every 3 words as 1 command.
 * All other characters are ignored as comments.
 */
export function parse(source: string): Command[] {
	// Extract words "教育" or "死刑"
	const tokens = source.match(/教育|死刑/g) || [];

	// Error if total word count is not a multiple of 3
	if (tokens.length % 3 !== 0) {
		throw new Error(
			`Syntax Error: Word count (${tokens.length}) is not a multiple of 3. Each command must consist of 3 words.`
		);
	}

	const commands: Command[] = [];
	// Group 3 words into 1 command
	for (let i = 0; i < tokens.length; i += 3) {
		const t1 = tokens[i];
		const t2 = tokens[i + 1];
		const t3 = tokens[i + 2];

		if (t1 !== undefined && t2 !== undefined && t3 !== undefined) {
			const chunk = t1 + t2 + t3;
			const cmd = BIGMOTOR_MAPPING[chunk];
			if (cmd) {
				commands.push(cmd);
			} else {
				// Error if word combination is invalid
				throw new Error(`Semantic Error: Unknown word combination: ${chunk}`);
			}
		}
	}
	return commands;
}
