import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'onlyConstantsInUppercase',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Variable names that consist of all capital letters should be reserved for `constant`/`immutable` variables',
  description:
    'If the variable needs to be different based on which class it comes from, a `view`/`pure` *function* should be used instead (e.g. like [this](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/76eee35971c2541585e05cbf258510dda7b2fbc6/contracts/token/ERC20/extensions/draft-IERC20Permit.sol#L59)).',
  regex: /^(?!.*constant).*[A-Z]{2,}/gi,
};

export default issue;
