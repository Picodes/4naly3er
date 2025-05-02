import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'comparisonOutsideCondition',
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: 'Incorrect comparison implementation',
  impact: 'Use `require` or `if` to compare values. Otherwise comparison will be ignored.',
  regex: /(?<!(pragma|require|if|assert|mapping|for |while |bool | + | - | \* | \/ ).*)(==|!=|<|>|<=|>=)/gi,
};

export default issue;
