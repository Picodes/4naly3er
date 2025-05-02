import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'defaultVisibility',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Default Visibility for constants',
  description:
    'Some constants are using the default visibility. For readability, consider explicitly declaring them as `internal`.',
  regex: /(?<!public|private|internal) constant (?!public|private|internal)/gi,
};

export default issue;
