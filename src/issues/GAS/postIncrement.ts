import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "`++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too)",
  description: '*Saves 5 gas per loop*',
  regex: /[^ \t]+\+\+/g,
};

export default issue;
