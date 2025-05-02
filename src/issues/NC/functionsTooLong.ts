import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'functionsTooLong',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Functions should not be longer than 50 lines',
  description:
    'Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability ',
  regex: /function.{42,}/gi,
};

export default issue;
