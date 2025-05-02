import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'boolIncursOverhead',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Using bools for storage incurs overhead',
  description:
    'Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).',
  regex: /(bool.?(public|private|internal).?.?[a-zA-Z]*|\=\>.*bool|struct?.{[^}]*bool)/g, // storage variable | part of mapping | struct
};

export default issue;
