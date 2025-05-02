import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'disableRenounceOwnership',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Consider disabling `renounceOwnership()`',
  description:
    "If the plan for your project does not include eventually giving up all ownership control, consider overwriting OpenZeppelin's `Ownable`'s `renounceOwnership()` function in order to disable it.",
  regex: / is .*Ownable/g,
};

export default issue;
