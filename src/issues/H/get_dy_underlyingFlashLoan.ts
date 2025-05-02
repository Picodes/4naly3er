import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'getDyUnderlyingFlashLoan',
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: '`get_dy_underlying()` is not a flash-loan-resistant price',
  impact: "`get_dy_underlying()` calculates the price based on the contract's underlying reserves, which can be manipulated by sandwiching the call with a flash loan. Therefore, using its output as a price oracle is not safe and will lead to loss of funds. Use a Chainlink oracle instead.",
  regex: /get_dy_underlying\(/gi,
};


export default issue;
