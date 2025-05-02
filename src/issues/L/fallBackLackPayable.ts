import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'fallBackLackPayable',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Fallback lacking `payable`',
  regex: /fallback(?!.*payable)/gi,
};

export default issue;
