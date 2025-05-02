import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'soladySafeTransferLib',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title:
    'Solady\'s SafeTransferLib does not check for token contract\'s existence',
  description:
    'There is a subtle difference between the implementation of solady’s SafeTransferLib and OZ’s SafeERC20: OZ’s SafeERC20 checks if the token is a contract or not, solady’s SafeTransferLib does not.\n'
    + 'https://github.com/Vectorized/solady/blob/main/src/utils/SafeTransferLib.sol#L10 \n'
    + '`@dev Note that none of the functions in this library check that a token has code at all! That responsibility is delegated to the caller` \n',
  regexPreCondition: /solady\/utils\/SafeTransferLib.sol/g,
  regex: /.safeTransfer\(|\.safeTransferFrom\(|\.safeApprove\(/g,
};

export default issue;
