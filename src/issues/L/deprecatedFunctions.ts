import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Do not use deprecated library functions',
  regex: /_setupRole\(|safeApprove\(/g,
};

export default issue;
