import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'unsafeERC20Operations',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Unsafe ERC20 operation(s)',
  regex: /\.transfer\(|\.transferFrom\(|\.approve\(/g,
};

export default issue;
