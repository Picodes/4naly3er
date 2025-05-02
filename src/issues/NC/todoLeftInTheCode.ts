import { IssueTypes, RegexIssue } from '../../types';

// TODO: This finding won't work until we add a flag to specify findings 
// that either also search in commentsOr only search in comments
const issue: RegexIssue = {
  id: 'todoLeftInTheCode',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'TODO Left in the code',
  description: "TODOs may signal that a feature is missing or not ready for audit, consider resolving the issue and removing the TODO comment",
  regex: /(TODO)/g,
};

export default issue;
