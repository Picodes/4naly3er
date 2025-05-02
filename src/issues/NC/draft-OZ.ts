import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'draftOZ',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Draft Dependencies',
  description:
    'Draft contracts have not received adequate security auditing or are liable to change with future developments.',
  regex: /import.+draft/gi,
};

export default issue;
