<h1 align=center><code>4naly3er</code></h1>

## Introduction

Static solidity analyzer.

## Usage

```bash
yarn analyze <BASE_PATH> <SCOPE_FILE>

# Example
yarn analyze contracts scope.example.txt
```

- `BASE_PATH` is a relative path to the folder containing the smart contracts.
- `SCOPE_FILE` is an optional file containg a specific smart contracts scope (see [scope.example.txt](./scope.example.txt))
- The output will be saved in a `report.md` file.

## Installation

```bash
yarn
```

## Add new issues

To add an issue you can either create a simple regex using the `regex` field either use the more comprehensive `detector` form.

### Regex-based detector:

```js
export type Issue = {
  type: 'GAS' | 'NC' | 'L' | 'M' | 'H',
  title: string,
  impact?: string,
  regex?: RegExp,
};
```

### AST-based detector:
