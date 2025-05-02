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

### Installing 4naly3er

#### Prerequisites:

You must have `node` and `yarn` installed on your system.

#### Installation:

```
git clone [https://github.com/cb-elileers/analyzer](https://github.cbhq.net/security/solidity-analyzer)
cd analyzer
npm i --force --save-dev
yarn
```

## Using 4naly3er

#### Basic Usage

```
yarn analyze <BASE_PATH> <OPTIONS>
```

For example: `yarn analyze ~/Documents/op-enclave/`

**Where Options Are:**

- BASE_PATH is a **required** parameter which points to the folder containing the smart contract project.
- '-s, --scope scopeFile' .txt file containing the contest scope
- '-g, --github githubURL' github url to generate links to code
- '-o, --out reportPath' Path for Markdown report
- '-l, --listfiles' List analyzed files in Markdown Report
- '--legacyscope scopeFile' Path for legacy scope file
- '--sarif [outputPath]' Generate SARIF report, optionally include path to report. Default is analyzer.sarif
- '--skip-info' Skip info issues
- '--skip-gas' Skip gas issues
- '--skip-low' Skip low issues
- '--skip-medium' Skip medium issues
- '--skip-high' Skip high issues
- '--skip, --skip-detectors detectorID' Skip specific detectors by id

For any remappings, Forge can generate, or you can add, remappings.txt to the BASE_PATH and 4naly3er will use them accordingly.

Output from the tool is stored in **report.md** within the 4naly3er folder. To keep all documents related to a project together, it is advisable to run `mv report.md <BASE_PATH>` to deposit the report into the smart contract project's folder. (Click here to see an example report)[https://gist.github.com/Picodes/e9f1bb87ae832695694175abd8f9797f]

#### Scope File Generation

Sometimes, we only want to run our tooling on certain contracts within a repository. To do so, we define those contracts we want to be in scope in a **scope.txt** file.

To autogenerate a scope.txt file that excludes dependencies, we can use the below script:

```
cd <BASE_PATH>
find . | grep "\.sol" | grep -v "\./lib/" | grep -v typechain | grep -v node_modules | grep -v artifacts | grep -v "\.t\.sol">scope.txt
```

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
