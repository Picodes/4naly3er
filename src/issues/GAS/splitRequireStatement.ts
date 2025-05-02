import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'splitRequireStatement',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Splitting require() statements that use && saves gas',
  regex: /require\(.*&&.*\);/g,
};

export default issue;