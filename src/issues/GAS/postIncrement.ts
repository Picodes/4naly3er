import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Pre-increments and pre-decrements are cheaper than post-increments and post-decrements',
  description: '*Saves 5 gas per iteration*',
  regex: /\w(\+\+|--)/g,
};

export default issue;
