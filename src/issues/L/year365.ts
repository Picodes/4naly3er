import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'year365',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'A year is not always 365 days',
  description:
    "On leap years, the number of days is 366, so calculations during those years will return the wrong value",
  regex: /year.+=.+365/gi,
};

export default issue;
