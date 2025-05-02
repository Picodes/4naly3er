import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'useOfEcrecover',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: "Use of ecrecover is susceptible to signature malleability",
  description: "The built-in EVM precompile ecrecover is susceptible to signature malleability, which could lead to replay attacks.Consider using OpenZeppelin’s ECDSA library instead of the built-in function.",
  regex:/\becrecover\b/g
};

export default issue;

