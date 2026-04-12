# bigmotor

A Brainfuck-derived esoteric programming language based on specific word combinations.
Commands are composed of triplets of "教育" (Education) and "死刑" (Death Penalty).

「教育」と「死刑」の3粒の単語を1つの命令として扱う、Brainfuck派生の難解プログラミング言語です。

## Language Specification / 言語仕様

In Bigmotor, 3 words make 1 Brainfuck command.
Bigmotorでは、3つの単語の組み合わせが1つのBrainfuck命令に対応します。

| Brainfuck | Bigmotor (単語の組み合わせ) | Instruction / 説明             |
| --------- | --------------------------- | ------------------------------ |
| `+`       | 教育教育教育                | Increment / 値を+1             |
| `-`       | 死刑死刑死刑                | Decrement / 値を-1             |
| `>`       | 死刑死刑教育                | Pointer Right / ポインタを右へ |
| `<`       | 教育死刑死刑                | Pointer Left / ポインタを左へ  |
| `[`       | 教育教育死刑                | Jump Forward / ループ開始      |
| `]`       | 死刑教育教育                | Jump Backward / ループ終了     |
| `.`       | 教育死刑教育                | Output / 文字を出力            |
| `,`       | 死刑教育死刑                | Input / 文字を入力             |

## Installation / インストール

```bash
npm install -g bigmotor_lang
# or
pnpm add -g bigmotor_lang
```

## CLI Usage / 使い方

### Interpret (直接実行)

```bash
bigmotor hello.bm
# or
bmr hello.bm
```

### Transpile to Brainfuck (Brainfuckへの変換)

```bash
bmc hello.bm
# or
bigmotor-compile hello.bm
```

## Example (`echo.bm`)

```
死刑教育死刑 教育死刑教育 教育教育死刑 死刑教育死刑 教育死刑教育 死刑教育教育
```

(Reads input and echoes it back / 入力をそのまま出力します)

## License

MIT
