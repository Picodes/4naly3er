import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'extCallRecipientGas',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'External call recipient may consume all transaction gas',
  description:
    "There is no limit specified on the amount of gas used, so the recipient can use up all of the transaction's gas, causing it to revert. Use `addr.call{gas: <amount>}(\"\")` or [this](https://github.com/nomad-xyz/ExcessivelySafeCall) library instead.",
  regex: /(?<!\(this\))\.call(?!.*gas)/g,
};

export default issue;
