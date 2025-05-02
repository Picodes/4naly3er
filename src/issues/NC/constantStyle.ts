import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'constantStyle',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Constants should be in CONSTANT_CASE',
  description:
    'For `constant` variable names, each word should use all capital letters, with underscores separating each word (CONSTANT_CASE)',
  regex: / (constant|immutable) (?!override).*[a-z]+.* =/g,
};

export default issue;
