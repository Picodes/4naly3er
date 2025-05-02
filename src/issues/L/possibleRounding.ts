import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'possibleRounding',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Possible rounding issue',
  description:
    'Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator. Also, there is indication of multiplication and division without the use of parenthesis which could result in issues.',
  regex: / \/ .*(reserve|balance|supply|total)/gi,
};

export default issue;
