import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Fallback lacking `payable`',
  regex: /fallback(?!.*payable)/gi,
};

export default issue;
