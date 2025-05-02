import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'addPlusEqual',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: '`a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)',
  description:
    'This saves **16 gas per instance.**',
  regex: /\+=/gi,
};

export default issue;
