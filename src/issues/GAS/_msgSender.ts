import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: '_msgSender',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "Don't use `_msgSender()` if not supporting EIP-2771",
  description:
    "Use `msg.sender` if the code does not implement [EIP-2771 trusted forwarder](https://eips.ethereum.org/EIPS/eip-2771) support",
  regex: /_msgSender\(\)/gi,
};

export default issue;
