import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'concat',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`',
  description:
    'Solidity version 0.8.4 introduces `bytes.concat()` (vs `abi.encodePacked(<bytes>,<bytes>)`)\n\nSolidity version 0.8.12 introduces `string.concat()` (vs `abi.encodePacked(<str>,<str>), which catches concatenation errors (in the event of a `bytes` data mixed in the concatenation)`)',
  regex: /abi\.encodePacked\(/gi,
};

export default issue;
