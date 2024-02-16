import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`type(uint<n>).max` should be used instead of `uint<n>(-1)`',
  regex: /uint\d?\d?\d?\(-1\)/gi,
};

export default issue;
