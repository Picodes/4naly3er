import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uncheckedIncrement',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Increments can be `unchecked` in for-loops',
  regex: /for.+\+\+/g,
};

export default issue;
