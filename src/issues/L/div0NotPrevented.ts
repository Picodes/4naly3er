import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'div0NotPrevented',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Division by zero not prevented',
  description:
    'The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.',
  regex: /(?<!\/\/.*) \/ (?![A-Z]{2,})\D+/g,
};

export default issue;
