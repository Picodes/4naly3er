import { oneLineBelowRegexDetector } from './utils';

export const issueTypes = ['GAS', 'NC', 'L', 'M', 'H'];

export const issueTypesTitles: { [t: typeof issueTypes[number]]: string } = {
  GAS: 'Gas Optimizations',
  NC: 'Non Critical Issues',
  L: 'Low Issues',
  M: 'Medium Issues',
  H: 'High Issues',
};

// List of solidity files with content and name
export type InputType = { content: string; name: string }[];

// Single Instance of a given issue
export type Instance = {
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
  description?: string;
  regex?: RegExp;
  detector?: (files: InputType) => Instance[];
};

const issues: Issue[] = [
  {
    type: 'GAS',
    title: 'Cache array length outside of loop',
    regex: /for?.(.*\.length)/g,
  },
  {
    type: 'GAS',
    title: 'Use != 0 instead of > 0 for unsigned integer comparison',
    regex: /([a-z,A-Z,0-9]*>.?0|0.?<.?[a-z,A-Z,0-9]*)/g,
  },
  {
    type: 'GAS',
    title: "Don't initialize variables with default value",
    regex: /((uint|int)[0-9]*?.*[a-z,A-Z,0-9]+.?=.?0;)|(bool.[a-z,A-Z,0-9]+.?=.?false;)/g,
  },
  {
    type: 'GAS',
    title: 'Use shift Right/Left instead of division/multiplication if possible',
    detector: oneLineBelowRegexDetector(/\n[^\/\n]*\/[^\/]?[248]+/g),
  },
  {
    type: 'GAS',
    title: 'Long revert strings',
    regex: /revert\(.*,?.(\"|\').{33,}(\"|\')\)/g,
  },
  {
    type: 'GAS',
    title: 'Using bools for storage incurs overhead',
    description:
      'Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).',
    regex: /(bool.?(public|private|internal).?.?[a-zA-Z]*|\=\>.*bool|struct?.{[^}]*bool)/g, // storage variable | part of mapping | struct
  },
  {
    type: 'GAS',
    title: 'Using calldata instead of memory for read-only arguments in external functions saves gas',
    description:
      'When a function with a memory array is called externally, the abi.decode() step has to use a for-loop to copy each index of the calldata to the memory index. Each iteration of this for-loop costs at least 60 gas (i.e. 60 * <mem_array>.length). Using calldata directly, obliviates the need for such a loop in the contract code and runtime execution.\nIf the array is passed to an internal function which passes the array to another internal function where the array is modified and therefore memory is used in the external call, it’s still more gass-efficient to use calldata when the external function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one',
    regex: /function.?\([^)]*[] memory [^)]*\)[^{]*(external|view)[^{]*(external|view)/g, // function with a memory array argument and external + view modifiers
  },
  {
    type: 'GAS',
    title: 'Use Custom Errors',
    description:
      '[Source](https://blog.soliditylang.org/2021/04/21/custom-errors/)\nInstead of using error strings, to reduce deployment and runtime cost, you should use Custom Errors. This would save both deployment and runtime cost.',
    regex: /(require|revert)\(.*,?".*"\)/g,
  },
  {
    type: 'GAS',
    title:
      "`++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too)/nSaves **5 gas per loop**",
    regex: /[^[:space:]]+\+\+/g,
  },
  {
    type: 'GAS',
    title: 'Using `private` rather than `public` for constants, saves gas',
    description:
      "If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table",
    regex: /public[^=\n\(]*(=|;)/g,
  },
  // {
  //   type: 'GAS',
  //   title:
  //     'Multiple address/ID mappings can be combined into a single mapping of an address/ID to a struct, where appropriate',
  //   description:
  //     "Saves a storage slot for the mapping. Depending on the circumstances and sizes of types, can avoid a `Gsset` (20000 gas) per mapping combined. Reads and subsequent writes can also be cheaper when a function requires both values and they both fit in the same storage slot. Finally, if both fields are accessed in the same function, can save ~42 gas per access due to not having to recalculate the key's keccak256 hash (Gkeccak256 - 30 gas) and that calculation's associated stack operations.",
  //   regex: /function.?\([^)]*[] memory [^)]*\)[^{]*(external|view)[^{]*(external|view)/g, // function with a memory array argument and external + view modifiers
  // },
  {
    type: 'NC',
    title: 'Return values of `approve()` not checked',
    description:
      "Not all IERC20 implementations `revert()` when there's a failure in `approve()`. The function signature has a boolean return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually approving anything",
    detector: oneLineBelowRegexDetector(/\n((?![^=\n]*function)[^=\n]*)approve.?\(/g),
  },
  {
    type: 'NC',
    title: 'The `nonReentrant` `modifier` should occur before all other modifiers',
    description: 'This is a best-practice to protect against reentrancy in other modifiers',
    regex:
      /function.?\([a-zA-Z]*\)[^\}]*[[:space:]]((?!(external[[:space:]]|override[[:space:]]|view[[:space:]]|pure[[:space:]]|internal[[:space:]]|private[[:space:]]))[a-zA-Z]+[[:space:]])+[^\}]*nonReentrant/g,
  },
  {
    type: 'NC',
    title: '`constant`s should be defined rather than using magic numbers',
    regex: /((?![^\n]*(uint|int|public))[^\n]*)([[:blank:]]|\()((?!(10|1e|32|256))[0-9e]{2,})/g,
  },
  {
    type: 'L',
    title: 'Unsafe ERC20 operation(s)',
    regex: /\.transfer\(|\.transferFrom\(|\.approve\(/g,
  },
  {
    type: 'L',
    title: 'Unspecific compiler version pragma',
    regex: /pragma solidity (\\^|>)[0-9\.]*/g,
  },
  {
    type: 'L',
    title: 'Do not use deprecated library functions',
    regex: /_setupRole\(|safeApprove\(/g,
  },
  {
    type: 'L',
    title:
      ' `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()`',
    description:
      'Use `abi.encode()` instead which will pad items to 32 bytes, which will [prevent hash collisions](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#non-standard-packed-mode) (e.g. `abi.encodePacked(0x123,0x456)` => `0x123456` => `abi.encodePacked(0x1,0x23456)`, but `abi.encode(0x123,0x456)` => `0x0...1230...456`). "Unless there is a compelling reason, `abi.encode` should be preferred". If there is only one argument to `abi.encodePacked()` it can often be cast to `bytes()` or `bytes32()` [instead](https://ethereum.stackexchange.com/questions/30912/how-to-compare-strings-in-solidity#answer-82739).\nIf all arguments are strings and or bytes, `bytes.concat()` should be used instead',
    regex: /keccak(256)?.?\(abi.encodePacked/g,
  },
  {
    type: 'H',
    title: 'Using `delegatecall` inside a loop',
    impact: 'When calling `delegatecall` the same `msg.value` amount will be accredited multiple times.',
    regex: /for[^\(]?\([^\)]*\)?.\{((.*[^\}])\n)*.*delegatecall/g,
  },
];

export default issues;
