import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Splitting if() statements that use && saves gas',
  regex: /if\s*\(.*&&.*\)/g,
};

export default issue;
