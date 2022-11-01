import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use Custom Errors',
  description:
    '[Source](https://blog.soliditylang.org/2021/04/21/custom-errors/)\nInstead of using error strings, to reduce deployment and runtime cost, you should use Custom Errors. This would save both deployment and runtime cost.',
  regex: /(require|revert)\(.*,?".*"\)/g,
};

export default issue;
