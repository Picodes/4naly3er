import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: '2stepowner',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Use a 2-step ownership transfer pattern',
  description:
    'Recommend considering implementing a two step process where the owner or admin nominates an account and the nominated account needs to call an `acceptOwnership()` function for the transfer of ownership to fully succeed. This ensures the nominated EOA account is a valid and active account. Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.',
  regex: /is.*Ownable(?!2)/gi,
};

export default issue;