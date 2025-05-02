import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'includeTimestampAtDeadline',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Signature use at deadlines should be allowed',
  description:
    "According to [EIP-2612](https://github.com/ethereum/EIPs/blob/71dc97318013bf2ac572ab63fab530ac9ef419ca/EIPS/eip-2612.md?plain=1#L58), signatures used on exactly the deadline timestamp are supposed to be allowed. While the signature may or may not be used for the exact EIP-2612 use case (transfer approvals), for consistency's sake, all deadlines should follow this semantic. If the timestamp is an expiration rather than a deadline, consider whether it makes more sense to include the expiration timestamp as a valid timestamp, as is done for deadlines.",
  regex: /(<|>)=? block.timestamp/gi,
};

export default issue;
