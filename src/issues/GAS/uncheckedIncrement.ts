import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Increments can be `unchecked` in for-loops',
  regex: /for.+\+\+/g,
};

export default issue;
