import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uncheckedCallValueSuccess',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title:
    'Call.value fallback function reversion risk',
  description: "Make sure the return boolean of the call function with value is true, otherwise contract risks assuming value has left when not if the fallback function of the destination reverts or is not payable.",
  regex: /(?<!\(.*,+.*\).*=.*)\.call\{value:/g
};

export default issue;
