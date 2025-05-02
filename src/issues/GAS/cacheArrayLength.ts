import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'cacheArrayLength',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Cache array length outside of loop',
  description:
    'If not cached, the solidity compiler will always read the length of the array during each iteration. That is, if it is a storage array, this is an extra sload operation (100 additional extra gas for each iteration except for the first) and if it is a memory array, this is an extra mload operation (3 additional gas for each iteration except for the first).',
  regex: /for ?\(.*\.length/gi,
};

export default issue;
