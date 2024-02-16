import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Dangerous `while(true)` loop',
  description: 'Consider using for-loops to avoid all risks of an infinite-loop situation',
  regex: /while ?\( ?true ?\)/gi,
};

export default issue;
