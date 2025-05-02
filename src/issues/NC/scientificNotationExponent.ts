import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'scientificNotationExponent',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use scientific notation (e.g. `1e18`) rather than exponentiation (e.g. `10**18`)',
  description:
    "While this won't save gas in the recent solidity versions, this is shorter and more readable (this is especially true in calculations).",
  regex: /10 ?\*\* ?\d/gi,
};

export default issue;
