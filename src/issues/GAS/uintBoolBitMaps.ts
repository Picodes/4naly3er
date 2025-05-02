import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uintBoolBitMaps',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: '`uint256` to `bool` `mapping`: Utilizing Bitmaps to dramatically save on Gas',
  description:
    'https://soliditydeveloper.com/bitmaps\n\nhttps://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/BitMaps.sol\n\n- [BitMaps.sol#L5-L16](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/BitMaps.sol#L5-L16):\n\n```solidity\n/**\n * @dev Library for managing uint256 to bool mapping in a compact and efficient way, provided the keys are sequential.\n * Largely inspired by Uniswap\'s https://github.com/Uniswap/merkle-distributor/blob/master/contracts/MerkleDistributor.sol[merkle-distributor].\n *\n * BitMaps pack 256 booleans across each bit of a single 256-bit slot of `uint256` type.\n * Hence booleans corresponding to 256 _sequential_ indices would only consume a single slot,\n * unlike the regular `bool` which would consume an entire slot for a single value.\n *\n * This results in gas savings in two ways:\n *\n * - Setting a zero value to non-zero only once every 256 times\n * - Accessing the same warm slot for every 256 _sequential_ indices\n */\n```',
  regex: /(?!.*mapping\(.*mapping).*mapping.+uint256.*(?!mapping).*bool/gi,
};

export default issue;
