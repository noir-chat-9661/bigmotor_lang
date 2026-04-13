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

- Any words or characters other than "教育" and "死刑" are ignored and can be used as comments.
- 「教育」「死刑」以外の単語や文字はすべて無視されるため、自由にコメントを記述できます。

## Quick Start / クイックスタート (npx, dlx, bunx)

You can run Bigmotor immediately without installation.
インストールすることなく、以下のコマンドで即座に実行可能です。

```bash
# npm
npx bigmotor_lang hello.bm

# pnpm
pnpm dlx bigmotor_lang hello.bm

# yarn(v2+)
yarn dlx bigmotor_lang hello.bm

# bun
bunx bigmotor_lang hello.bm

# deno
deno run -A npm:bigmotor_lang hello.bm
```

## Installation / インストール (Global)

If you want to use the commands persistently:
コマンドを恒久的にインストールして使用する場合：

```bash
npm install -g bigmotor_lang
# or
pnpm add -g bigmotor_lang
```

## CLI Usage / 使い方

### Unified Command (統合コマンド)

Recommended for modern use / 最新の推奨コマンドです。

```bash
# Interpret (直接実行)
bigmotor_lang hello.bm

# Transpile to Brainfuck (Brainfuckへの変換)
bigmotor_lang hello.bm --transpile
# or
bigmotor_lang hello.bm -T
```

### Legacy Commands (以前のコマンド)

Supported for compatibility / 互換性のために残されています。

#### Interpret (直接実行)

```bash
bigmotor hello.bm
# or
bmr hello.bm
```

#### Transpile to Brainfuck (Brainfuckへの変換)

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

WTFPL
