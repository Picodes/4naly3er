import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Empty Function Body - Consider commenting why',
  regex: /(\{\})|(\{ \})/g,
};

export default issue;
