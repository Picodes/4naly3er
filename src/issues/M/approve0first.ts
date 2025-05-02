import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'approve0first',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: "`approve()`/`safeApprove()` may revert if the current approval is not zero",
  description:
    '- Some tokens (like the *very popular* USDT) do not work when changing the allowance from an existing non-zero allowance value (it will revert if the current approval is not zero to protect against front-running changes of approvals). These tokens must first be approved for zero and then the actual allowance can be approved.\n- Furthermore, OZ\'s implementation of safeApprove would throw an error if an approve is attempted from a non-zero value (`"SafeERC20: approve from non-zero to non-zero allowance"`)\n\nSet the allowance to zero immediately before each of the existing allowance calls',
 regex: /\.(safe)?approve\(/gi,
};

export default issue;