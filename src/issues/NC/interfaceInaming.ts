import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'interfaceInaming',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Interfaces should be indicated with an `I` prefix in the contract name',
  regex: /^interface (?!I).+\{/g,
};

export default issue;
