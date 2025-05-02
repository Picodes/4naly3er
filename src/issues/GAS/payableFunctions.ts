import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'payableFunctions',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Functions guaranteed to revert when called by normal users can be marked `payable`',
  description:
    'If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.',
  regex: /function((?!payable).)*only/g,
};

export default issue;
