import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'decimalsNotUint8',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`decimals()` should be of type `uint8`',
  regex: /uint(?!8)(?!.*(\/\/|;)).*decimals/gi,
};

export default issue;
