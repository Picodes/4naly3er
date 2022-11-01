import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Return values of `approve()` not checked',
  description:
    "Not all IERC20 implementations `revert()` when there's a failure in `approve()`. The function signature has a boolean return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually approving anything",
  regex: /\n((?![^=\n]*function)[^=\n]*)approve.?\(/g,
  startLineModifier: 1,
};

export default issue;
