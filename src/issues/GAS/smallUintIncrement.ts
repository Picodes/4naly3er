import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'smallUintIncrement',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Incrementing with a smaller type than `uint256` incurs overhead',
  regex: /for.+uint(?!(256| ))/g,
};

export default issue;
