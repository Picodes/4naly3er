import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'abiEncodeCall',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title:
    'Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe',
  description:
    'When using `abi.encodeWithSignature`, it is possible to include a typo for the correct function signature.\nWhen using `abi.encodeWithSignature` or `abi.encodeWithSelector`, it is also possible to provide parameters that are not of the correct type for the function.\n\nTo avoid these pitfalls, it would be best to use [`abi.encodeCall`](https://solidity-by-example.org/abi-encode/) instead.',
  regex: /(encodeWithSignature|encodeWithSelector)/gi,
};

export default issue;
