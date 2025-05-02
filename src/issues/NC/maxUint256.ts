import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'maxUint256',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`type(uint256).max` should be used instead of `2 ** 256 - 1`',
  regex: /2 ?\*\* ?256 ?- ?1/gi,
};

export default issue;
