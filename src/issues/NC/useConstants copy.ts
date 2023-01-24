import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'TODO Left in the code',
  description: "TODOs may signal that a feature is missing or not ready for audit, consider resolving the issue and removing the TODO comment"
  regex: /TODO/g,
};

export default issue;
