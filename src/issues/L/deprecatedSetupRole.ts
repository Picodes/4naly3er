import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Deprecated _setupRole() function',
  regex: /_setupRole\(/gi,
};

export default issue;
