import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'calcTokenAmountSlippage',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`calc_token_amount()` has slippage added on top of Curve\'s calculated slippage',
  description:
    'According to the Curve [docs](https://curve.readthedocs.io/_/downloads/en/latest/pdf/), `StableSwap.calc_token_amount()` already includes slippage but not fees, so adding extra slippage on top of the returned result, as is done by the caller of functions higher up the caller chain, is an incorrect operation.',
  regex: /\.calc_token_amount\(/gi,
};

export default issue;
