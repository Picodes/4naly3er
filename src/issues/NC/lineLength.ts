import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'lineLength',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Lines are too long',
  description: 'The solidity style guide recommends a maximumum line length of [120 characters](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#maximum-line-length)',
  regex:/\S.{119,}\S/g,
};

export default issue;