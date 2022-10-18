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

To add an issue you can either create a simple regex using the `regex` field either use the more comprehensive `detector` form. The type is the following:

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
```

## Credits

https://github.com/byterocket/c4udit for the inspiration
