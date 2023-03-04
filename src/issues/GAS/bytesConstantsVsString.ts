import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Bytes constants are more efficient than string constants',
  regex: /string.+constant/g,
};

export default issue;
