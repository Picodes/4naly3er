import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Comparing booleans to `true` or `false`',
  description:
    '`true` and `false` are constants and it is more expensive comparing a boolean against them than directly checking the returned boolean value',
  regex: /(== true)|(== false)/g,
};

export default issue;
