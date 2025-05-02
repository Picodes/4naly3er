import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'bytesConstantsVsString',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Bytes constants are more efficient than string constants',
  regex: /string.+constant/g,
};

export default issue;
