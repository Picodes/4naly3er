import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'canUseUnchecked',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'For Operations that will not overflow, you could use unchecked',
  regex: /([a-z,A-Z,0-9]*-)|([a-z,A-Z,0-9]*\+)|([a-z,A-Z,0-9]*\*)|([a-z,A-Z,0-9]*\/)/g,
};

export default issue;
