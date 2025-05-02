import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'scientificNotationZeros',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use scientific notation for readability reasons for large multiples of ten',
  description:
    "The more a number has zeros, the harder it becomes to see with the eyes if it's the intended value. To ease auditing and bug bounty hunting, consider using the scientific notation",
  regex: /( |\()\d00000/gi,
};

export default issue;
