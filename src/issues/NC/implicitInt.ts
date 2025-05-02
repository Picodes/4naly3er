import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'implicitInt',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Change int to int256',
  description:
    'Throughout the code base, some variables are declared as `int`. To favor explicitness, consider changing all instances of `int` to `int256`',
  regex: /(?<!u)int /gi,
};

export default issue;