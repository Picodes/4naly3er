<h1 align=center><code>Code4rena Report Generator</code></h1>

## Introduction

Code4rena report generator.

## Installation

```bash
yarn
```

## Usage

You can either paste solidity files or folders in the contracts folder or indicate a path

```bash
yarn analyze <PATH>
```

## Add new issues

Issues can have the following form:

```js
export type Issue = {
  type: 'GAS' | 'NC' | 'L' | 'M' | 'H',
  title: string,
  impact?: string,
  regex?: RegExp,
  detector?: (
    files: {
      content: string,
      name: string,
    }[],
  ) => {
    index: number,
    fileName: string,
    fileContent: string,
  }[],
};

To add one you can either create a simple regex using the `regex` field either use the more comprehensive `detector` form.
```

## Credits

https://github.com/byterocket/c4udit for the inspiration

Issues forked from:
https://github.com/code-423n4/2022-09-nouns-builder-findings/issues/336
