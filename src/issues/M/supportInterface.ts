import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'supportInterface',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Direct `supportsInterface()` calls may cause caller to revert',
  description:
    "Calling `supportsInterface()` on a contract that doesn't implement the ERC-165 standard will result in the call reverting. Even if the caller does support the function, the contract may be malicious and consume all of the transaction's available gas. Call it via a low-level [staticcall()](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L119), with a fixed amount of gas, and check the return code, or use OpenZeppelin's [`ERC165Checker.supportsInterface()`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L36-L39).",
  regex: /\.supportsInterface\(/gi,
};

export default issue;
