```
     .---. ,--.  ,--   ,----.   ,--.  ,--.   ,-. .----. ,------.,------,
    / .  | |   \ |  | |  ._. \  |  |  `\ . '.' /\_.-,  ||  .---'|   /`. '
   / /|  | |  . '|  | |  |_|  | |  |    \     /   |_  <(|  '--. |  |_.' |
  / '-'  |||  |\    | |  .-.  |(|  '_    /   /) .-. \  ||  .--' |  .   .'
  `---|  |'|  | \   | |  | |  | |     | /   /`  \ `-'  /|  `---.|  |\  \
      `--' `--'  `--' `--' `--' `-----' `--'     `---'' `------'`--' '--'
```

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Example Reports](#example-reports)
  - [Installation](#installation)
  - [Contributing](#contributing)

## Usage

```bash
yarn analyze <BASE_PATH> <SCOPE_FILE> <GITHUB_URL>

# Example
yarn analyze contracts scope.example.txt
```

- `BASE_PATH` is a relative path to the folder containing the smart contracts.
- `SCOPE_FILE` is an optional file containg a specific smart contracts scope (see [scope.example.txt](./scope.example.txt))
- `GITHUB_URL` is an optional url to generate links to github in the report
- The output will be saved in a `report.md` file.

## Example Reports

| Repository                                                                        | Report                                                                     |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Holograph](https://code4rena.com/contests/2022-10-holograph-contest)             | [Report](https://gist.github.com/Picodes/e9f1bb87ae832695694175abd8f9797f) |
| [3xcalibur](https://code4rena.com/contests/2022-10-3xcalibur-contest)             | [Report](https://gist.github.com/Picodes/51789d48e3a3c9246a48bb490d688343) |
| [Inverse Finance](https://code4rena.com/contests/2022-10-inverse-finance-contest) | [Report](https://gist.github.com/Picodes/8d3a45d6d1362fb9953d631d8c84a29f) |
| [Paladin](https://code4rena.com/contests/2022-10-paladin-warden-pledges-contest)  | [Report](https://gist.github.com/Picodes/2d23ed5128036f1b475654d5bcca9eed) |
| [zkSync](https://code4rena.com/contests/2022-10-inverse-finance-contest)          | [Report](https://gist.github.com/Picodes/1f87a82e954cc749dea9d9961d5f4dff) |

## Installation

You'll need [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/). Then clone the repo and run:

```bash
yarn
```

You're all set!

## Contributing

You're more than welcome to contribute! For help you can check [CONTRIBUTING.md](CONTRIBUTING.md)
