import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'solmateSafeTransferLib',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title:
    ' Solmate\'s SafeTransferLib does not check for token contract\'s existence',
  description:
    'There is a subtle difference between the implementation of solmate’s SafeTransferLib and OZ’s SafeERC20: OZ’s SafeERC20 checks if the token is a contract or not, solmate’s SafeTransferLib does not.\n'
    + 'https://github.com/transmissions11/solmate/blob/main/src/utils/SafeTransferLib.sol#L9 \n'
    + '`@dev Note that none of the functions in this library check that a token has code at all! That responsibility is delegated to the caller` \n',
  regexPreCondition: /solmate\/utils\/SafeTransferLib.sol/g,
  regex: /.safeTransfer\(|\.safeTransferFrom\(|\.safeApprove\(/g,
};

export default issue;
