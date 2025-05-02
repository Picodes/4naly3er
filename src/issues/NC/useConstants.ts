import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'useConstants',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Constants should be defined rather than using magic numbers',
  regex: /((?![^\n]*(uint|int|public))[^\n]*)([[:blank:]]|\()((?!(10|1e|32|256|128))[0-9e]{2,})/g,
};

export default issue;
