export const issueTypes = ['GAS', 'NC', 'L', 'M', 'H'];

// List of solidity files with content and name
export type InputType = { content: string; name: string }[];

// Single occurence of a given issue
export type Occurence = {
  fileName: string; // Name of the file in which the issue has been found
  fileContent: string; // Content of the file in which the issue has been found
  index?: number; // Index of a char corresponding to the issue in the file content
  line?: number;
};

// Type to follow to add an issues
export type Issue = {
  type: typeof issueTypes[number];
  title: string;
  impact?: string;
  regex?: RegExp;
  detector?: (files: InputType) => Occurence[];
};

const issues: Issue[] = [
  {
    type: 'GAS',
    title: 'Cache Array Length Outside of Loop',
    regex: /for?.(.*\.length)/g,
  },
  {
    type: 'GAS',
    title: 'Use != 0 instead of > 0 for Unsigned Integer Comparison',
    regex: /([a-z,A-Z,0-9]*>.?0|0.?<.?[a-z,A-Z,0-9]*)/g,
  },
  {
    type: 'GAS',
    title: "Don't Initialize Variables with Default Value",
    regex: /((uint|int)[0-9]*?.*[a-z,A-Z,0-9]+.?=.?0;)|(bool.[a-z,A-Z,0-9]+.?=.?false;)/g,
  },
  {
    type: 'GAS',
    title: 'Use Shift Right/Left instead of Division/Multiplication if possible',
    detector: (files: InputType) => {
      const occurences: Occurence[] = [];
      for (const file of files) {
        for (const res of file.content.matchAll(/\n[^\/\n]*\/[^\/]?[2,4,8]+/g)) {
          // `res.index` is one line above the issue
          const line = 2 + [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
          occurences.push({ fileName: file.name, line, fileContent: res.input! });
        }
      }

      return occurences;
    },
  },
  {
    type: 'GAS',
    title: 'Long Revert Strings',
    regex: /revert\(.*,?.(\"|\').{33,}(\"|\')\)/g,
  },
  {
    type: 'GAS',
    title: 'Using bools for storage incurs overhead',
    impact:
      'Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).',
    regex: /(bool.?(public|private|internal).?.?[a-zA-Z]*|\=\>.*bool|struct?.{[^}]*bool)/g, // storage variable | part of mapping | struct
  },
  {
    type: 'GAS',
    title: 'Using calldata instead of memory for read-only arguments in external functions saves gas',
    impact:
      'When a function with a memory array is called externally, the abi.decode() step has to use a for-loop to copy each index of the calldata to the memory index. Each iteration of this for-loop costs at least 60 gas (i.e. 60 * <mem_array>.length). Using calldata directly, obliviates the need for such a loop in the contract code and runtime execution.\nIf the array is passed to an internal function which passes the array to another internal function where the array is modified and therefore memory is used in the external call, it’s still more gass-efficient to use calldata when the external function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one',
    regex: /function.?\([^)]*[] memory [^)]*\)[^{]*(external|view)[^{]*(external|view)/g, // function with a memory array argument and external + view modifiers
  },
  {
    type: 'L',
    title: 'Unsafe ERC20 Operation(s)',
    regex: /\.transfer\(|\.transferFrom\(|\.approve\(/g,
  },
  {
    type: 'L',
    title: 'Unspecific Compiler Version Pragma',
    regex: /pragma solidity (\\^|>)[0-9\.]*/g,
  },
  {
    type: 'L',
    title: 'Do not use Deprecated Library Functions',
    regex: /_setupRole\(|safeApprove\(/g,
  },
  {
    type: 'H',
    title: 'Using `delegatecall` inside a loop',
    impact: 'When calling `delegatecall` the same `msg.value` amount will be accredited multiple times.',
    regex: /for[^\(]?\([^\)]*\)?.\{((.*[^\}])\n)*.*delegatecall/g,
  },
];

export default issues;
