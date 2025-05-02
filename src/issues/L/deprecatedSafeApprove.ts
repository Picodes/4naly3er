import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'deprecatedSafeApprove',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`safeApprove()` is deprecated',
  description:
    "[Deprecated](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/bfff03c0d2a59bcd8e2ead1da9aed9edf0080d05/contracts/token/ERC20/utils/SafeERC20.sol#L38-L45) in favor of `safeIncreaseAllowance()` and `safeDecreaseAllowance()`. If only setting the initial allowance to the value that means infinite, `safeIncreaseAllowance()` can be used instead. The function may currently work, but if a bug is found in this version of OpenZeppelin, and the version that you're forced to upgrade to no longer has this function, you'll encounter unnecessary delays in porting and testing replacement contracts.",
  regex: /\.safeApprove\(/gi,
};

export default issue;
