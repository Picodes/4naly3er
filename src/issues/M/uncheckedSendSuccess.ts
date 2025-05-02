import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uncheckedSendSuccess',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title:
    'Send fallback function reversion risk',
  description: "Make sure the return boolean of the send function is true, otherwise contract risks assuming value has left when not, if the fallback function of the destination reverts or is not payable.",
  regex: /(?<!(\.*=.*)|(require.*)|(if.*))\.send\(.*\)/g
};

export default issue;
