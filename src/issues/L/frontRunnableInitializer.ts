import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Initializers could be front-run',
  regex: /initialize\(|init\(|(initializer)/g,
};

export default issue;
