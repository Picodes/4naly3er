import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use Underscores for Number Literals (add an underscore every 3 digits)',
  regex: / \d+\d\d\d+/gi,
};

export default issue;
