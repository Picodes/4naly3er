import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'unsignedComparison',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use != 0 instead of > 0 for unsigned integer comparison',
  regex: /([a-z,A-Z,0-9]*>.?0|0.?<.?[a-z,A-Z,0-9]*)/g,
};

export default issue;
